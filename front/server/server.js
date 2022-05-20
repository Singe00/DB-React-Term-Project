const express = require('express')
const app = express()
const port = 5000 // <- 3000에서 다른 숫자로 변경
const db = require('./config/db');

app.get('/', (req, res) => {
	console.log("running")
  res.send('dddddd!')
})

app.get('/api/products', (req, res) => {
    db.query("SELECT * FROM game", (err, data) => {
        if(!err) res.send({ products : data });
        else res.send(err);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})