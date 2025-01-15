const express = require('express');
require('dotenv').config();
const sausController = require('.controllers/sausController');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/saus', sausController);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
