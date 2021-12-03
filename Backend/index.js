// this is the main file , act as an entry point for the backend
const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
const app = express()
const port = 5000
//Available routes
// app.get('/', (req, res) => {
//     res.send('Hello Rishabh!')
// })

//middle ware to send data to api in json
app.use(express.json());

app.use("/api/auth", require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})