const mongoose= require("mongoose");
const validator=require("validator");

const categorySchema = ({
    name:{
        type:String,
        trim:true,
        required:[true, "Please provide a category name"],
        lowercase:true,
        unique:true
    },
    description:String,
    imgUrl:{
        type:String,
        validator:[validator.isURL, "Please provide a valid URL"]
    }
});

const Category = mongoose.model("Category",categorySchema);
module.exports = Category;