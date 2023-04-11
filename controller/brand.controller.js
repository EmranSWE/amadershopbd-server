const { createBrandService, getBrandService, getBrandByIdService, updateBrandService } = require("../service/brand.service")

exports.createBrand = async(req,res,next)=>{
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status:"success",
            message:"Successfully created the brand",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            error:"Couldn't create the brand"
        })
    }
}


exports.getBrand = async(req,res,next)=>{
    try {
        const brands = await getBrandService();
        res.status(200).json({
            status:"success",
            message:"Successfully created the brand",
            data:brands
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            error:"Couldn't create the brand"
        })
    }
}

exports.getBrandById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const brands = await getBrandByIdService(id);
        if(!brands){
            return res.status(400).json({
                status:"Fail",
                error:"Couldn't find brand"
            })
        }
        res.status(200).json({
            status:"success",
            message:"Successfully created the brand",
            data:brands
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            error:"Couldn't create the brand"
        })
    }
}



exports.updateBrandById = async(req,res,next)=>{
    const {id}=req.params; 
    try {
        const result = await updateBrandService(id,req.body);
        console.log(result)
        if(!result.modifiedCount){
            return res.status(400).json({
                status:"Fail",
                error:"Couldn't update the brand with id"
            })
        }
        res.status(200).json({
            status:"success",
            message:"Successfully updated the brand",
           
        })
    } catch (error) {
        res.status(400).json({
            mess:error.message,
            status:"Failed",
            error:"Couldn't create the brand"
        })
    }
}
