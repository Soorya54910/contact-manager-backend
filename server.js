const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const dotenv = require("dotenv").config()
const port =  process.env.PORT || 5000
const app = express()
const cors = require('cors')
app.use(cors())

connectDb()
app.use(express.json())
app.use('/api/contacts/',require('./Routers/contactRoute'))
app.use('/api/users/',require('./Routers/userRoute'))
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
    
})
