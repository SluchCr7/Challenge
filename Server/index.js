const express = require('express')
const cors = require('cors')
const app = express()
const ConnectDb = require('./Config/db')
const { errorhandler } = require('./Middelwares/errorHandler')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
require('dotenv').config()
// DB Connection

ConnectDb()

// middleware

app.use(cors({
    origin: process.env.DOMAIN_NAME,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json()) 

// XSS Attack Middelware

app.use(xss())

app.use(rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200, // Limit each IP to 10 requests per `window` (here, per 10 minutes)
    message: "Too many requests, please try again later.",
}))

app.use(helmet())


// Routes

app.get('/', (req, res) => {
    res.send('Hello Server')
})

app.use("/api/questions", require('./routes/QuestionRoute'))
app.use("/api/resk", require('./routes/ReskRoute'))
app.use('/api/password' , require("./routes/PasswordRoute"))
app.use('/api/teams' , require("./routes/TeamRoute"))
app.use('/api/auth', require("./routes/UserRoute"))
app.use('/api/guss', require('./routes/GussRoute'))
app.use("/api/bank" , require("./routes/BankRoute"))
app.use("/api/offside", require("./routes/OffsideRoute"))
app.use("/api/round", require("./routes/RoundRoute"))
app.use("/api/auction", require("./routes/AuctionRoute"))
app.use("/api/top10", require("./routes/TopTenRoute"))
app.use("/api/squad", require("./routes/SquadRoute"))
app.use(errorhandler)

// Listen

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))