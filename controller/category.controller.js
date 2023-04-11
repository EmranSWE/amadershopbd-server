
const { createCategoryService, getCategoryService, getCategoryServiceById, updateCategoryServiceById } = require("../service/category.service");
const { createStockService, getStockService, getStockServiceById, updateStockServiceById } = require("../service/stock.service");

exports.createCategory= async(req,res,next)=>{
    try {
        console.log(req.body)
        const result = await createCategoryService(req.body);
        
        res.status(200).json({
            status:"success",
            message:"Successfully created the store",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            err:error.message,
            status:"Failed",
            error:"Couldn't create the brand"
        })
    }
}


exports.getCategory= async(req,res,next)=>{
    try {
        const result = await getCategoryService();
        
        res.status(200).json({
            status:"success",
            message:"Successfully created the Product",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            err:error.message,
            status:"Failed",
            error:"Couldn't create the brand"
        })
    }
}


exports.getCategoryById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const result = await getCategoryServiceById(id);
        res.status(200).json({
            status:"success",
            message:"Successfully created the Product",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            err:error.message,
            status:"Failed",
            error:"Couldn't create the brand"
        })
    }
}



exports.updateCategoryById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const result = await updateCategoryServiceById(id,req.body);
        res.status(200).json({
            status:"success",
            message:"Successfully created the Product",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            err:error.message,
            status:"Failed",
            error:"Couldn't create the brand"
        })
    }
}