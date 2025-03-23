const pool = require("../middlewares/db");

async function deleteUser(req,res)
{
    try{
        const {id} = req.body;
        const response = await pool.query('DELETE FROM users WHERE id=$1' , [ id ] );
        if(response.rowCount > 0){
            res.send({ data:{
                success:true,
                data:"user deleted"
            }})
        }else{
            res.send({ data:{
                success:true,
                data:"user id not found"
            }})
        }
        

    }catch(err){
        res.send({ data:{
            success:false,
            error:err
        } })
    }
}

async function getAllUsers(req,res)
{
    try{
        let users = await pool.query('SELECT * FROM users');
        res.send({
            data:{
                success:true,
                data:users.rows
            }
        })
    }catch(err){
        res.send({
            data:{
                success:false,
                error:err
            }
        })
    }
}


module.exports = {deleteUser,getAllUsers};