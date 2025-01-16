const express = require('express');
const sausController = require('../Controllers/sausController'); 
const snackController = require ('../Controllers/snackController')


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/saus', sausController);  
app.use('/snack', snackController);  

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

