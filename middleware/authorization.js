
module.exports= (...role)=>{
    return (req,res,next) =>{
        const userRole = req.user.role;
        if(!role.includes(userRole)){
            return res.status(400).json({
                status:"fail",
                error: "You are not authorized to access it"
            })
        }
        next()
    }
};