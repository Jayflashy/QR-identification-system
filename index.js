const express = require('express')
const morgan = require('morgan')
const cors = require("cors") 
const rateLimit = require('express-rate-limit');
const { default: helmet } = require('helmet');
require('dotenv').config()
const profileRoute = require('./src/routes/profile.routes')

const app = express()

app.use(morgan("dev")) // log the request for debugging
app.use(express.json()) // parse json bodies
app.use(express.urlencoded({extended:true}))
app.use(cors())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use(helmet());

app.get("/", (req, res) => {
    res.json({ data: "hello there" });
});
// routes
app.use(profileRoute)

// 404 error
app.use((req, res, next) => {
    console.log("Error 404")
    res.status(404).send('404 Error Page')
})

module.exports = app