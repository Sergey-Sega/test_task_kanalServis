/* eslint-disable no-template-curly-in-string */
const express = require('express')
const cors = require('cors');
const tableRouter = require('./routes/table.routes')

const PORT = process.env.PORT || 8080 

const app = express()

app.use(cors());
app.use(express.json())
app.use('/api', tableRouter)


app.listen(PORT,() => console.log(`server started on port ${PORT}`))
