const exp = require("express");
const { allCronJobs, updateCronJobAsDone, deleteCronJob } = require("../controllers/cron.controller");
const cronjobAPI = exp.Router()


cronjobAPI.get('/all-jobs' , allCronJobs );
cronjobAPI.post('/schedule-job' , );
cronjobAPI.put('/update-job-as-done' , updateCronJobAsDone );
cronjobAPI.delete('/delete-job' , deleteCronJob );


module.exports = cronjobAPI;