const { createProductService, getProductService, getProductServiceById, updateProductServiceById } = require("../service/product.service");

exports.createProduct = async(req,res,next)=>{
    try {
        console.log(req.body)
        const result = await createProductService(req.body);
        
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


exports.getProduct = async(req,res,next)=>{
    try {
        const result = await getProductService();
        
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


exports.getProductById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const result = await getProductServiceById(id);
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



exports.updateProductById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const result = await updateProductServiceById(id,req.body);
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


exports.fileUpload = async (req,res)=>{
    try {
        console.log(req.body)
        res.status(200).json(req.files)
    } catch (error) {
        
    }
}