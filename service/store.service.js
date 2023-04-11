const Store = require("../model/Store");

exports.createStoreService = async(data)=>{
    console.log(data)
    const result = await Store.create(data)
   return result
}

exports.getStoreService = async()=>{
    const result = await Store.find({})
   return result
}



exports.getStoreServiceById = async(id)=>{
    const result = await Store.findOne({_id:id})
   return result;
}

exports.updateStoreServiceById = async(id,data)=>{
    const result = await Store.updateOne({_id:id},data)
   return result;
}