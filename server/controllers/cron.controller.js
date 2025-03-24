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

async function allCronJobs(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = req.query.page ? (parseInt(req.query.page)) * limit : 0;

        let jobs;
        if (req.query.sent === 'YES' || req.query.sent === 'NO') {
            jobs = await pool.query(
                "SELECT * FROM cron_jobs WHERE sent = $1 ORDER BY time_scheduled_to_do DESC OFFSET $2 LIMIT $3;",
                [req.query.sent, page, limit]
            );
        } else {
            jobs = await pool.query(
                "SELECT * FROM cron_jobs ORDER BY time_scheduled_to_do DESC OFFSET $1 LIMIT $2;",
                [page, limit]
            );
        }

        res.json({
            success: true,
            data: {
                query: req.query,
                jobs: jobs.rows,
                cnt: jobs.rowCount
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
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