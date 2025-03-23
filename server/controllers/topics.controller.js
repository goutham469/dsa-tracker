async function addTopic(req,res)
{
    try{
        const {} = req.body;
        
    }catch(err){
        res.send({
            data:{
                success:false,
                error:err.message
            }
        })
    }
}