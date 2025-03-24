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
const remainder_task_cron_scheduler = require("./cron-jobs/cron")
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


// Run cron job every 10 minutes
const CRON_INTERVAL = 1000*60;
setInterval( () => {
    console.log("[INFO] Running scheduled task reminder...");
    remainder_task_cron_scheduler();
}, CRON_INTERVAL);



// others
app.listen( 4000 , ()=> console.log("server running on PORT 4000..."))