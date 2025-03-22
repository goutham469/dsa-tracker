const exp = require("express")
const CORS = require("cors")
const encrypt = require("./middlewares/encrypt")
const decrypt = require("./middlewares/decrypt")
const usersAPI = require("./routes/users.route")
require("dotenv").config()
const app = exp()

// middlewares
app.use(exp.json())
app.use(CORS())

// routes
app.get('/' , (req,res) => res.send("root level"))

app.use('/users' , usersAPI)


// others
app.listen( 4000 , ()=> console.log("server running on PORT 4000..."))