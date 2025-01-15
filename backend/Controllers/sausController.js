const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

router.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM saus');
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the saus.' });
    }
});

module.exports = router;
