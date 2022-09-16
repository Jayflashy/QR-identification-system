const express = require('express')
const morgan = require('morgan')
const cors = require("cors") 
const {DB_URL, PORT } = require('./src/config')
const mongoose = require("mongoose");
const rateLimit = require('express-rate-limit');
const { default: helmet } = require('helmet');
const app = express()
const profileRoute = require('./src/routes/profileRoute')

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

// import routes
app.use(profileRoute)
// connect database
mongoose.connect(DB_URL, {

    useNewUrlParser: true,
    
    useUnifiedTopology: true
    
}).then(() => app.listen(PORT,() => console.log(`server running on port : ${PORT}`))).catch((error) => console.log(error.message))
