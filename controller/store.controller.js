
const { getStoreService, createStoreService, getStoreServiceById, updateStoreServiceById } = require("../service/store.service");

exports.createStore= async(req,res,next)=>{
    try {
        const result = await createStoreService(req.body);
        
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


exports.getStore= async(req,res,next)=>{
    try {
        const result = await getStoreService();
        
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


exports.getStoreById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const result = await getStoreServiceById(id);
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



exports.updateStoreById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const result = await updateStoreServiceById(id,req.body);
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