const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const connect = require('./db/db')
connect()
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
const rabbitMq = require('./service/rabbit')

rabbitMq.connect()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/', userRoutes)
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`User service running on port ${PORT}`);
//   });
module.exports = app