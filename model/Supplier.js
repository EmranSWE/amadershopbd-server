const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const { validator } = require("validator");

// schema design
const supplierSchema = mongoose.Schema({
   
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        unique: [true, "Name must be unique"],
        lowercase: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
    brand: {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true,
        }
    },
    description: {
        type: String,
        required: true
    },
    contactNumber: [{
        type: String,
        required: [true, "Please provide a contact number"],
        // validate: {
        //     validator: (value) => {
        //         return validator.isMobilePhone(value)
        //     },
        //     message: "Please provide a number"
        // }
    }],
    emergencyContactNumber: {
        type: String,
        required: [true, "Please provide emegency number"],
        // validate: {
        //     validator: (value) => {
        //         return validator.isMobilePhone(value)
        //     },
        //     message: "Please provide a number"
        // }
    },
    tradeLicenceNumber: {
        type: Number,
        required: [true, "Please provide a trade licence"]
    },
    presentAddress: {
        type: String,
        required: [true, "Please provide your present address"]
    },
    permanentAddress: {
        type: String,
        required: [true, "Please provide your present address"]
    },
    location: {
        type: String,
        trim: true,
        required: [true, "Please Provide a brand name"],
        lowercase: true,
        enum: {
            values: ["dhaka", "chandpur", "rajshahi", "rangpur", "mymonshing"],
            message: "{VALUE} is not valid"
        }
    },
    imageURL: {
        type: String,
        // validate: [validator.isURL, "Please provide a valid url"]
    },
    nationalIdImageURL: {
        type: String,
        required: true,
        // validate: [validator.isURL, "Please provide a valid url"]
    },
    status: {
        type: String,
        default: "active",
        enum:["active","inactive"]
    }
}, {
    timestamps: true,
})




const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier;