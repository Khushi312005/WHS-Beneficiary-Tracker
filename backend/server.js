
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve your existing frontend files from the project folder.
app.use(express.static(path.join(__dirname, "..")));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check that the backend and database are connected.
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");
        res.json({
            success: true,
            message: "Backend connected to MySQL successfully"
        });
    } catch (error) {
        console.error("Database connection error:", error.message);
        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

// Get all WHS records.
app.get("/api/whs", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM whs ORDER BY id DESC"
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch WHS records" });
    }
});

// Add a WHS record.
app.post("/api/whs", async (req, res) => {
    try {
        const {
            whsId,
            district,
            taluk,
            village,
            structureType,
            status,
            year,
            area,
            problem
        } = req.body;

        if (
            !whsId || !district || !taluk || !village ||
            !structureType || !status || year === undefined ||
            year === null || year === ""
        ) {
            return res.status(400).json({
                message: "Please provide all required WHS fields"
            });
        }

        const constructionYear = Number(year);
        const benefitedArea =
            area === "" || area === undefined || area === null
                ? null
                : Number(area);

        if (
            !Number.isInteger(constructionYear) ||
            constructionYear < 2000 ||
            constructionYear > new Date().getFullYear()
        ) {
            return res.status(400).json({
                message: "Please enter a valid construction year"
            });
        }

        if (
            benefitedArea !== null &&
            (!Number.isFinite(benefitedArea) || benefitedArea < 0)
        ) {
            return res.status(400).json({
                message: "Area must be a valid non-negative number"
            });
        }

        const sql = `
            INSERT INTO whs
            (whs_id, district, taluk, village, structure_type,
             status, construction_year, area, problem)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            whsId.trim(),
            district.trim(),
            taluk.trim(),
            village.trim(),
            structureType,
            status,
            constructionYear,
            benefitedArea,
            problem || null
        ];

        const [result] = await pool.execute(sql, values);

        res.status(201).json({
            success: true,
            message: "WHS record saved successfully",
            id: result.insertId
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "This WHS ID already exists"
            });
        }

        console.error(error);
        res.status(500).json({ message: "Failed to save WHS record" });
    }
});

// Delete a WHS record by its WHS ID.
app.delete("/api/whs/:whsId", async (req, res) => {
    try {
        const [result] = await pool.execute(
            "DELETE FROM whs WHERE whs_id = ?",
            [req.params.whsId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "WHS record not found"
            });
        }

        res.json({
            success: true,
            message: "WHS record deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete WHS record" });
    }
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await pool.query("SELECT 1");

        app.listen(PORT, () => {
            console.log(`Backend server running at http://localhost:${PORT}`);
            console.log("MySQL connection successful");
        });
    } catch (error) {
        console.error("Could not connect to MySQL:", error.message);
        console.error("Check that MySQL is running and your .env settings are correct.");
        process.exit(1);
    }
}

startServer();
