const pool = require("../middlewares/db.js");
const encrypt = require("../middlewares/encrypt.js");
const newDeviceLoginEmail = require("../templates/newDeviceLogin.js");
const newRegistrationEmail = require("../templates/newRegistration.js");
const generateRandomString = require("../utils/randomString.js");
const sendEmail = require("../utils/sendEmail.js")

async function loginController(req, res) 
{
    console.log(req.body);

    if (req.body?.type == 'google-auth') 
    {
        try 
        {
            const { email, image, name, device, time } = req.body;
            let data = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
            
            data = data.rows;
            // console.log(data);

            if (data.length > 0) // Fix the condition
            {
                res.send({ data: "login success" });
            } 
            else 
            {
                await pool.query(
                    `INSERT INTO users(email, password, user_name, name, image, last_login, logged_devices, last_email_sent_to_request_login) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    [
                        email, 
                        generateRandomString(8), // Random password
                        generateRandomString(8), // Random username
                        name, 
                        image, 
                        new Date(), 
                        JSON.stringify([device]), // Fix JSON.stringify syntax
                        0
                    ]
                );

                const template = newRegistrationEmail(device, time, name, email); // Ensure function name is correct
                // console.log(template);
                
                await sendEmail(email, "WELCOME to DSA GYM", template);
                res.send({ data: "new registration success" });
            }
        } 
        catch (err) 
        {
            console.error(err);
            res.send({ data: err });
        }
    }
    else if(req.body?.type == "username-password")
    {
        try 
        {
            const { username, password, device, time } = req.body;

            let loginStatus = await pool.query(
                'SELECT * FROM users WHERE user_name=$1 AND password=$2',
                [username, password]
            );

            if (loginStatus.rows.length > 0) // Fix login check
            {   
                const userDetails = loginStatus.rows[0];

                // Ensure devices is an array
                const devices = userDetails.logged_devices ? JSON.parse(userDetails.logged_devices) : [];

                if (!devices.includes(device)) // Fix device check
                {
                    const template = newDeviceLoginEmail(device, time, userDetails.email);
                    sendEmail(userDetails.email, "New login on " + device, template);

                    // Optionally, update the devices list in the database
                    devices.push(device);
                    await pool.query(
                        "UPDATE users SET logged_devices=$1 WHERE user_name=$2",
                        [JSON.stringify(devices), username]
                    );
                }

                res.send({ success: true, message: "Login successful" });
            } 
            else 
            {
                res.send({ success: false, message: "Invalid username or password" });
            }
        } 
        catch (err) 
        {
            console.error("Login error:", err);
            res.send({ 
                success: false, 
                error: err.message 
            });
        }

    }
    else{
        res.send({
            data:{
                success:false,
                error:"invalid login method"
            }
        })
    }
}

async function updateUserDetails(req,res)
{
    try{
        const {id,changes} = req.body;
        const cols = [ 'email' , 'user_name' , 'password' , 'name' , 'image' , 'leetcode_profile' , 'codechef_profile' , 'codeforces_profile' , 'linkedin_profile' , 'github_profile' , 'portfolio_profile' , 'last_email_sent_to_request_login' , 'more_details' ];

        for( const change of changes)
        {
            if(! cols.includes(change.key)){
                req.send({
                    data:{
                        success:false,
                        error:`invalid col name : ${change.key} .`
                    }
                })
            }

            await pool.query( `UPDATE users SET ${change.key} = $1 WHERE id=$2` , [ change.value , id ] )
        }
        res.send({
            data:{
                success:true,
                data:"all changes made"
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


module.exports = { loginController , updateUserDetails  }