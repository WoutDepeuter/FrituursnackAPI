const express = require('express')
const sausController = require('/C:/Users/depeu/IdeaProjects/FrituursnackAPI/backend/Controllers/sausController.js');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
app.get('/test', (req, res) => {
  res.send('Test')
})

app.get('/status', (req, res) => {
  res.json({ status: 'Server is running' })
})
app.get('/saus', sausController.getAllSaus);
