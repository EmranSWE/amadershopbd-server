const { signupService, findUserByEmail, findUserByToken } = require("../service/user.service");
const { sendMailWithMailGun, sendEmailJet } = require("../utils/email");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body);
        const token = user.generateConfirmationToken();
        await user.save({ validateBeforeSave: false});

        const mailData = {
            to:[user.email],
            subject:"Verify your account",
            text:`${req.protocol}://${req.get("host")}${req.originalUrl}/confirmation/${token}`
        }

        sendEmailJet(mailData)
        res.status(200).json({
            status: "success",
            message: "Successfully Signed up",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: "Fails to sign up",
            error:error
        })
    }
}


exports.confirmEmail = async (req, res) => {
    try {
        const {token} = req.params;
        const user = await findUserByToken(token);
        if(!user){
            return res.status(403).json({
                status:'fail',
                error:"Invalid token"
            })
        }
        const expired = new Date() > new Date(user.confirmationTokenExpires);
        if(expired){
            return res.status(401).json({
                status:"Fail",
                error: "Token Expired"
            });
        }
        user.status = "active";
        user.confirmationToken= undefined;
        user.confirmationTokenExpires= undefined;

        user.save({validateBeforeSave: false });
        res.status(200).json({
            status: "successfully activated your account",
        })
    } catch (error) {
        res.status(500).json({
            status: "Fails to activate",
            error
        })
    }
}

/**
 * 1. Check if email and password are given
 * 2. Load user with email
 * 3.if not user send res
 * 4. compare password
 * 5.if password not correct send res
 * 6.if user active
 * 7.if not active send res
 * 8. Generate token
 * 9. send user token
 */
exports.login = async (req, res) => {
    
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(401).json({
                status: "Fail",
                error: "Please provide your credential"
            })
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "No user found"
            })
        }
        const isPasswordValid =await user.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: "fail",
                error: "password is not valid"
            })
        }
        if (user.status != "active") {
            return res.status(401).json({
                status: "fail",
                message: "Your account is not active"
            })
        }


        const token = generateToken(user);
        const { password: pwd, ...others } = user.toObject();
        res.status(200).json({
            status: "Success",
            message: "Successfully logged in user",
            data: {
                token
            }
        });


    } catch (error) {
        res.status(500).json({
            status: "Fails to logged in",
            error:error.message
        })
    }
}

//Verify token

exports.getMe = async (req, res,next) => {
    console.log(req.user)
    try {
        const user = await findUserByEmail(req?.user?.email);
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: "Fails to verify token",
            error: error.message
        })
    }
}


