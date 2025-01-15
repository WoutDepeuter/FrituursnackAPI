const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
};

// Connection pool for better management
const pool = mysql.createPool(dbConfig);

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM saus');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the saus.' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const [result] = await pool.execute('INSERT INTO saus (name) VALUES (?)', [req.body.name]);
        res.json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the saus.' });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM saus WHERE id = ?', [req.body.id]);
        res.json({ id: req.body.id });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the saus.' });
    }
});

router.put('/update', async (req, res) => {
    try {
        const [result] = await pool.execute('UPDATE saus SET name = ? WHERE id = ?', [req.body.name, req.body.id]);
        res.json({ id: req.body.id });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the saus.' });
    }
});

module.exports = router;
