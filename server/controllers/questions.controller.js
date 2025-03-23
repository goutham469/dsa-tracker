const pool = require("../middlewares/db");

async function addQuestion(req,res)
{
    try{
        const { user_id , question , public , platform , type , images , companies , link , postedOn , timestamp } = req.body;

        const status = await pool.query("INSERT INTO questions ( user_id , question , public , platform , type , images , companies , problem_link , posted_on , time_stamp ) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;" , [
            user_id,
            question,
            public,
            platform,
            type,
            images,
            companies,
            link,
            postedOn,
            timestamp
        ])

        res.send({
            data:{
                success:true,
                data:{
                    inserted_record:status.rows[0]
                }
            }
        })

    }catch(err)
    {
        res.send({
            data:{
                success:false,
                error:err.message
            }
        })
    }
}


async function getQuestions(req, res) 
{
    try {
        const params = req.query;
        console.log(params);
        let questions = null;

        const limit = parseInt(params.limit) || 10;
        const offset = params.page ? parseInt(params.page) * limit : 0;

        if (params.id) {
            // Search by ID
            questions = await pool.query("SELECT * FROM questions WHERE id=$1", [params.id]);
        } else if (params.company) {
            // Search by company
            questions = await pool.query(
                "SELECT * FROM questions WHERE companies ILIKE $1 LIMIT $2 OFFSET $3",
                [`%${params.company}%`, limit, offset]
            );
        } else if (params.platform) {
            // Search by platform
            questions = await pool.query(
                "SELECT * FROM questions WHERE platform = $1 LIMIT $2 OFFSET $3",
                [params.platform, limit, offset]
            );
        } else if (params.search) {
            // Search in questions
            questions = await pool.query(
                "SELECT * FROM questions WHERE question ILIKE $1 LIMIT $2 OFFSET $3",
                [`%${params.search}%`, limit, offset]
            );
        } else {
            // Get all questions
            questions = await pool.query(
                "SELECT * FROM questions LIMIT $1 OFFSET $2",
                [limit, offset]
            );
        }

        res.send({
            success: true,
            data: {
                params: params,
                questions: questions.rows, // Return all matched questions
                count: questions.rowCount, // Number of rows returned
            }
        });

    } catch (err) {
        console.error("Error fetching questions:", err);
        res.status(500).send({
            success: false,
            error: err.message
        });
    }
}

async function changeQuestionVisibility( req,res){
    try{
        const {id} = req.body
        const status = await pool.query("UPDATE questions SET public = $1 WHERE id=$2" , [ 'YES' , id ] )
        res.send({
            data:{
                success:true,
                data:{
                    rowsChanged:status.rowCount
                }
            }
        })
    }catch(err){
        req.send({
            data:{
                success:false,
                error:err.message
            }
        })
    }
}

async function markAsCompleted( req,res){
    try{
        const {id} = req.body
        const status = await pool.query("UPDATE questions SET completed = $1 WHERE id=$2" , [ 'YES' , id ] )
        res.send({
            data:{
                success:true,
                data:{
                    rowsChanged:status.rowCount
                }
            }
        })
    }catch(err){
        req.send({
            data:{
                success:false,
                error:err.message
            }
        })
    }
}

async function markAsInCompleted( req,res){
    try{
        const {id} = req.body
        const status = await pool.query("UPDATE questions SET completed = $1 WHERE id=$2" , [ 'NO' , id ] )
        res.send({
            data:{
                success:true,
                data:{
                    rowsChanged:status.rowCount
                }
            }
        })
    }catch(err){
        req.send({
            data:{
                success:false,
                error:err.message
            }
        })
    }
}




module.exports = { addQuestion , getQuestions , changeQuestionVisibility , markAsCompleted , markAsInCompleted }