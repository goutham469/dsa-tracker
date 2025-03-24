const pool = require("../middlewares/db");

async function getRemaindersOfUser(req,res)
{
    try{
        const { id } = req.query;

        let limit = req.query.limit ? req.query.limit : 10;
        let page = req.query.page ? (req.query.page *limit ) : 0;

        const remainders = await pool.query("SELECT * FROM revise WHERE user_id=$1 OFFSET $2 LIMIT $3 ;" , [ id , page , limit ] )
        res.send({
            data:{
                success:true,
                data:{
                    remainders:remainders.rows,
                    cnt:remainders.rowCount,
                    offset:page,
                    limit:limit
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

async function getRemainders(req,res)
{
    try{

        let limit = req.query.limit ? req.query.limit : 10;
        let page = req.query.page ? (req.query.page *limit ) : 0;

        const remainders = await pool.query("SELECT * FROM revise OFFSET $1 LIMIT $2 ;" , [ page , limit ] )
        res.send({
            data:{
                success:true,
                data:{
                    remainders:remainders.rows,
                    cnt:remainders.rowCount,
                    offset:page,
                    limit:limit
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

async function addRemainder(req,res)
{
    try{
        const { question_id , user_id , completed  , posted_on , posted_on_timestamp , completed_on , completed_on_timestamp , priority , email , window_size } = req.body;

        const status = await pool.query("INSERT INTO revise( question_id , user_id , completed  , posted_on , posted_on_timestamp , completed_on , completed_on_timestamp , priority , email ) values( $1,$2,$3,$4,$5,$6,$7,$8,$9 ) RETURNING *;" , [ 
            question_id,
            user_id,
            completed,
            posted_on,
            posted_on_timestamp,
            completed_on,
            completed_on_timestamp,
            priority,
            email
         ] )

         await pool.query("INSERT INTO cron_jobs( time_scheduled_to_do , revise_id , window_size ) values($1,$2,$3);" , [
            posted_on_timestamp+window_size ,
            status.rows[0].id,
            window_size
         ])

         res.send({
            data:{
                success:true,
                data:{
                    message:"task added successfully",
                    rowsAdded:status.rowCount
                }
            }
         })

    }catch(err){
        res.send({
            data:{
                success:true,
                error:err.message
            }
        })
    }
}

async function getRemainderByQuestion(req,res)
{
    try{
        const { question_id } = req.query;
        const remainders = await pool.query("SELECT * FROM revise WHERE question_id=$1" , [ question_id ] )
        res.send({
            data:{
                success:true,
                data:{
                    remainders:remainders.rows,
                    cnt:remainders.rowCount
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

async function markRemainderAsDone(req,res)
{
    try{
        const { id , completed_on , completed_on_timestamp } = req.body;
        const remainders = await pool.query("UPDATE revise SET completed=$2,completed_on=$3,completed_on_timestamp=$4 WHERE id=$1;" , [ id , 'YES' , completed_on , completed_on_timestamp ] )

        res.send({
            data:{
                success:true,
                data:{
                    message:"marked as done."
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

async function markRemainderAsNotDone(req,res)
{
    try{
        const { id } = req.body;
        const remainders = await pool.query("UPDATE revise SET completed=$2 WHERE id=$1;" , [ id , 'NO' ] )

        res.send({
            data:{
                success:true,
                data:{
                    message:"marked as not done."
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

async function updateRemainder(req,res)
{
    try{
        const { id , changes } = req.body;
        
        for( const change of changes )
        {
            await pool.query(`UPDATE revise SET ${change.key} = $1 WHERE id=$2;` , [ change.value , id ])
        }

        res.send({
            data:{
                success:true,
                data:{
                    message:"update success"
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


module.exports = { addRemainder , getRemaindersOfUser , getRemainderByQuestion , markRemainderAsDone , updateRemainder , getRemainders , markRemainderAsNotDone };