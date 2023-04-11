const Supplier = require("../model/Supplier")
exports.createSupplierService = async(data)=>{
    console.log(data)
    const result = await Supplier.create(data)
   return result
}

exports.getSupplierService = async()=>{
    const brands = await Supplier.find({})
    return brands;
}

exports.getSupplierServiceById = async(id)=>{
    const brands = await Supplier.findOne({_id:id})
    return brands;
}



exports.updateSupplierServiceById = async(id,data)=>{
    console.log(id,data)
    const result = await Supplier.updateOne({_id:id},data,{
        runValidators:true
    });
   return result;
}
