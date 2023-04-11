const mongoose = require('mongoose');
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowerCase: 3,
                    minNumber: 1,
                    minUpperCase: 1,
                    minSymbols: 1
                }
                )
            }
        }
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Password don't match"
        }

    },
    role: {
        type: String,
        enum: ['buyer', 'store-manager', 'admin'],
        default: "buyer"
    },
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Please provide at least three"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Please provide at least three"]
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid number"]
    },
    shippingAddress: String,
    imgURL: {
        type: String,
    },
    status: {
        type: String,
        default: "inactive",
        enum: ["active", "inactive", "blocked"]
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    // If the password has not been modified, do not re-hash
    if (!this.isModified("password")) {
      return next();
    }
  
    const password = this.password;
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    this.password = hash;
    this.confirmPassword = undefined;
    next();
  });

userSchema.methods.comparePassword = async function (password,hash) {
    const isMatch = await bcrypt.compareSync(password, hash);
    return isMatch;
}

// Generating JWT token

userSchema.methods.generateConfirmationToken = function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.confirmationToken = token;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    this.confirmationTokenExpires = date;
    return token;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
