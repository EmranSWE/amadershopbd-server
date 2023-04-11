/**
 * 1.Check if token exists
 * 2. if not token send res
 * 3. decoded the token
 * 4. if valid next

 */
const jwt = require("jsonwebtoken");
const {promisify}=require("util");

module.exports = async(req,res,next)=>{
console.log(req)
    try {
        const token = req.headers?.authorization?.split(' ')?.[1]
        if(!token){
            return res.status(401).json({
                status:"fail",
                error: "You are not logged in"
            })
        }
        
        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        console.log(req.user)
        next()
    } catch (error) {
        res.status(403).json({
            status:"Fail",
            error:"Invalid token"
        })
    }
}