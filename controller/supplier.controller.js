const { getStoreService, createStoreService, getStoreServiceById, updateStoreServiceById } = require("../service/store.service");
const { createSupplierService, getSupplierService, getSupplierServiceById, updateSupplierServiceById } = require("../service/supplier.service");

exports.createSupplier= async(req,res,next)=>{
    try {
        const result = await createSupplierService(req.body);
        
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


exports.getSupplier= async(req,res,next)=>{
    try {
        const result = await getSupplierService();
        
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


exports.getSupplierById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const result = await getSupplierServiceById(id);
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



exports.updateSupplierById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const result = await updateSupplierServiceById(id,req.body);
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