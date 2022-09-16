const app  = require("../index")

const DBConnect = require("../src/config/db.config")

const port = process.env.PORT || 5000


const start = async()=>{
    try {
        
        await DBConnect()
        app.listen(port, ()=>{
            console.log(`You are live and working on this awesome port ${port}...`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()