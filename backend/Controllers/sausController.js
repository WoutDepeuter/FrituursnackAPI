const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mysql = require('mysql');
const app = express();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database.');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS saus (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )
    `;

    connection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table created or already exists.');

        const insertQuery = `INSERT INTO saus (name) VALUES ('Mexicano')`;

        connection.query(insertQuery, (err, result) => {
            if (err) throw err;
            console.log('Mexicano inserted into the table.');
            connection.end();
        });
    });
});

app.get('/saus', (req, res) => {
    connection.query('SELECT * FROM saus', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
}


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});