const pool = require("../middlewares/db.js");
const encrypt = require("../middlewares/encrypt.js")

function loginController(req,res)
{
    console.log(req.body);
    if(req.type == 'google-auth')
    {
        const {email} = req.body;
        let data = pool.query("SELECT * FROM users WHERE email=$1" , [ email ] )
        data = data.rows;
        if(data > 0 )
        {
            res.send( { data : "login success" } )
        }else{
            pool.query("INSERT INTO users values();" , [] )
            // sendEmail()
            res.send( { data : "new registration success" } )
        }
        
    }
    res.send({ data: encrypt(req.body) })
}

module.exports = { loginController }