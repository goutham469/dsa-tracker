const pool = require("../middlewares/db");

async function createCronJob(req,res){
    try{
        const {  } = req.body;

    }catch(err){
        res.send({
            data:{
                success:false,
                error:err.message
            }
        })
    }
}

async function allCronJobs(req,res){
    try{
        
        const limit = req.query.limit ? req.query.limit : 10;
        const page = req.query.page ? req.query.page * limit : 0;

        let jobs = null;
        if(req.query.sent == 'YES'){
            jobs = await pool.query("SELECT * FROM cron_jobs WHERE sent = $1 ORDER BY time_scheduled OFFSET=$2 LIMIT=$3 ;" , [ 'YES' , page , limit ] )
        }else if(req.query.sent == 'NO'){
            jobs = await pool.query("SELECT * FROM cron_jobs WHERE sent = $1 ORDER BY time_scheduled OFFSET=$2 LIMIT=$3 ;" , [ 'NO' , page , limit ] )
        }else{
            jobs = await pool.query("SELECT * FROM cron_jobs ORDER BY time_scheduled OFFSET=$1 LIMIT=$2 ;" , [  page , limit ] )
        }

        res.send({
            data:{
                success:true,
                data:{
                    query:req.query,
                    jobs:jobs.rows,
                    cnt:jobs.rowCount
                }
            }
        })

    }catch(err){
        res.send({
            data:{
                success:false,
                error:err.message
            }
        })
    }
}

async function updateCronJobAsDone(req,res){
    try{
        const { id } = req.body;

        const status = await pool.query("UPDATE cron_jobs SET sent=$1 WHERE id=$2" , [ 'YES' , id ] )

        res.send({
            data:{
                success:true,
                data:{
                    id:id,
                    updateCount:status.rowCount
                }
            }
        })

    }catch(err){
        res.send({
            data:{
                success:false,
                error:err.message
            }
        })
    }
}

async function deleteCronJob(req,res){
    try{
        const { id } = req.body;

        const status = await pool.query("DELETE FROM cron_jobs WHERE id=$1" , [ id ] )

        res.send({
            data:{
                success:true,
                data:{
                    id:id,
                    updateCount:status.rowCount
                }
            }
        })

    }catch(err){
        res.send({
            data:{
                success:false,
                error:err.message
            }
        })
    }
}

module.exports = { allCronJobs , updateCronJobAsDone , deleteCronJob     };