const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')   
const connectDB = require('./db/connectDB')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
const cors = require('cors')

//cors
app.use(cors())

//cookie
app.use(cookieParser());

//file upload
app.use(fileupload({useTempFiles:true}))


//data base connection
connectDB()
//data get
app.use(express.json())

//route load
app.use('/api',web)
app.listen(port, () => {
  console.log(`server start localhost:${port}`)
})