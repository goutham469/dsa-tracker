const pool = require("../middlewares/db");

async function addAnswer(req,res)
{
    try{
        const { question_id , user_id , code , images , link , reference , postedOn , timestamp } = req.body;
        
        const status = await pool.query("INSERT into answers( question_id , user_id , code , images , answer_link , reference , posted_on , time_stamp  ) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;" , [
            question_id,
            user_id,
            code ,
            images,
            link,
            reference,
            postedOn,
            timestamp
        ])

        res.send({
            data:{
                success:true,
                data:{
                    insertedRow:status.rows[0],
                    insertedCount : status.rowCount
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

async function getAnswers(req, res) 
{
    try {
        const params = req.query;
        console.log(params);
        let answers = null;

        const limit = parseInt(params.limit) || 5;
        const offset = params.page ? parseInt(params.page) * limit : 0;

        if (params.id) {
            // Search by ID
            answers = await pool.query("SELECT * FROM answers WHERE id=$1", [params.id]);
        } else if (params.search) {
            // Search in questions
            answers = await pool.query(
                "SELECT * FROM answers WHERE code ILIKE $1 LIMIT $2 OFFSET $3",
                [`%${params.search}%`, limit, offset]
            );
        } else {
            // Get all questions
            answers = await pool.query(
                "SELECT * FROM answers LIMIT $1 OFFSET $2",
                [limit, offset]
            );
        }

        res.send({
            success: true,
            data: {
                params: params,
                answers: answers.rows, // Return all matched questions
                count: answers.rowCount, // Number of rows returned
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

async function updateAnswer(req, res) {
    try {
        const { id, changes } = req.body;

        const allowedChanges = ["code", "images", "answer_link", "reference"];
        const updates = [];

        for (const change of changes) {
            if (!allowedChanges.includes(change.key)) {
                return res.send({
                    success: false,
                    error: `Invalid key specified: ${change.key}`,
                });
            }
            updates.push(`${change.key} = $${updates.length + 1}`);
        }

        if (updates.length === 0) {
            return res.send({
                success: false,
                error: "No valid fields provided for update",
            });
        }

        // Constructing dynamic query
        const query = `UPDATE answers SET ${updates.join(", ")}, last_modified = $${updates.length + 1} WHERE id = $${updates.length + 2}`;
        const values = changes.map((change) => change.value);
        values.push(new Date(), id); // Adding last_modified and id at the end

        await pool.query(query, values);

        res.send({
            success: true,
            message: "All changes made",
            updatedFields: changes,
            id: id,
        });

    } catch (err) {
        console.error("Error updating answer:", err);
        res.status(500).send({
            success: false,
            error: err.message,
        });
    }
}

async function deleteAnswer(req,res)
{
    try{
        const {id} = req.body;
        const status = await pool.query("DELETE FROM answers WHERE id=$1;" , [ id ] );

        res.send({
            data:{
                status:true,
                data:{
                    id,
                    deletedCount:status.rowCount
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

async function changeRank(req,res){
    try{
        const {id,operation} = req.body;
        
        await pool.query("UPDATE answers SET rank = rank+ $1 WHERE id = $2" , [ operation == "+"?1:-1 , id ] )
        res.send({
            data:{
                success:true
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

async function getAnswersForQuestion( req , res ){
    try{
        const { id } = req.query;
        console.log(req.query)
        const answers = await pool.query("SELECT * FROM answers WHERE question_id = $1 ORDER BY rank DESC" , [ id ] )
        res.send({
            data:{
                success:true,
                data:{
                    answers:answers.rows,
                    cnt:answers.rowCount,
                    question_id:id
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


module.exports = { addAnswer , getAnswers , updateAnswer , deleteAnswer , changeRank , getAnswersForQuestion  }