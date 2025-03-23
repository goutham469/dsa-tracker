const exp = require("express")
const CORS = require("cors")
const encrypt = require("./middlewares/encrypt")
const decrypt = require("./middlewares/decrypt")
const usersAPI = require("./routes/users.route")
const adminAPI = require("./routes/admin.route")
const questionsAPI = require("./routes/questions.route")
const answersAPI = require("./routes/answers.route")
const reviseAPI = require("./routes/revise.route")
const cronjobAPI = require("./routes/cron.route")
require("dotenv").config()
const app = exp()

// middlewares
app.use(exp.json())
app.use(CORS())

// routes
app.get('/' , (req,res) => res.send("root level"))

app.use('/users' , usersAPI)
app.use('/admin' , adminAPI )
app.use('/questions' , questionsAPI)
app.use('/answers' , answersAPI);
app.use('/revise' , reviseAPI);
app.use("/cron-job" , cronjobAPI);

// others
app.listen( 4000 , ()=> console.log("server running on PORT 4000..."))