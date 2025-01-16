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

// Serve the form to add a new snack
router.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/addsnack.html'));
});

// Serve the list of all snacks
router.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/listsnack.html'));
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM snack');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching snacks:', error);
        res.status(500).json({ error: 'An error occurred while fetching the snacks.' });
    }
});

router.post('/', async (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !description || price === undefined) {
        return res.status(400).json({ error: 'Name, description, and price are required.' });
    }

    try {
        const [result] = await pool.execute('INSERT INTO snack (name, description, price) VALUES (?, ?, ?)', [name, description, price]);
        res.json({ id: result.insertId });
    } catch (error) {
        console.error('Error adding snack:', error);
        res.status(500).json({ error: 'An error occurred while adding the snack.' });
    }
});

router.put('/:id', async (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !description || price === undefined) {
        return res.status(400).json({ error: 'Name, description, and price are required.' });
    }

    try {
        const [result] = await pool.execute('UPDATE snack SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, req.params.id]);
        res.json({ id: req.params.id });
    } catch (error) {
        console.error('Error updating snack:', error);
        res.status(500).json({ error: 'An error occurred while updating the snack.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM snack WHERE id = ?', [req.params.id]);
        res.json({ id: req.params.id });
    } catch (error) {
        console.error('Error deleting snack:', error);
        res.status(500).json({ error: 'An error occurred while deleting the snack.' });
    }
});

module.exports = router;
