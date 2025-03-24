import { ADMIN_PASSWORD, ADMIN_USERNAME, SERVER_URL } from "./secrets"

export const api = {
    'login':async function(data){
        try{
            const response = await fetch(`${SERVER_URL}/users/login` , {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            })
            console.log( response )
            const ans =  await response.json();
            return ans.data;
        }catch(err){
            return { data : {
                success:false,
                error:"Problem with your device."
            } }
        }
    },
    'admin':{
        'login':async function(data)
                {
                    return data.username == ADMIN_USERNAME && data.password == ADMIN_PASSWORD;
                }
    }
}