const User = require("../model/User")

exports.signupService= async(userInfo) =>{
    const user = await User.create(userInfo);
    return user;
}


exports.findUserByToken = async(token)=>{
    return await User.findOne({confirmationToken:token})
}

exports.findUserByEmail = async(email)=>{
    return await User.findOne({email:email})
}