const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'frietapi',
});

// Add middleware to parse JSON and URL-encoded bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Serve the form to add a new saus
router.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/addsaus.html'));
});

// Serve the list of all saus
router.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/listsaus.html'));
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM saus');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching saus:', error);
        res.status(500).json({ error: 'An error occurred while fetching the saus.' });
    }
});

router.post('/', async (req, res) => {
    const { name, description } = req.body;

    // Log the request body for debugging
    console.log('Request body:', req.body);

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    try {
        const [result] = await pool.execute('INSERT INTO saus (name, description) VALUES (?, ?)', [name, description]);
        res.json({ id: result.insertId });
    } catch (error) {
        console.error('Error adding saus:', error);
        res.status(500).json({ error: 'An error occurred while adding the saus.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM saus WHERE id = ?', [req.params.id]);
        res.json({ id: req.params.id });
    } catch (error) {
        console.error('Error deleting saus:', error);
        res.status(500).json({ error: 'An error occurred while deleting the saus.' });
    }
});

router.put('/:id', async (req, res) => {
    const { name, description } = req.body;

    // Check if name or description are undefined
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    try {
        const [result] = await pool.execute('UPDATE saus SET name = ?, description = ? WHERE id = ?', [name, description, req.params.id]);
        res.json({ id: req.params.id });
    } catch (error) {
        console.error('Error updating saus:', error);
        res.status(500).json({ error: 'An error occurred while updating the saus.' });
    }
});

module.exports = router;
