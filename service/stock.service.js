const Stock = require("../model/Stock");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createStockService = async(data)=>{
    const result = await Stock.create(data)
   return result
}

exports.getStockService = async(filters,queries)=>{
    // const products = await Stock.find(filters)
    // .skip(queries.skip)
    // .limit(queries.limit)
    // .select(queries.fields)
    // .sort(queries.sortBy)
    const stocks = await Stock.aggregate([
        // {$match: {'store.name':"chandpur"}}
        {$match: {}},
        {$group: {_id: '$store.name',totalProductsPrice: {$sum:{$multiply:['$price','$quantity']}}}}
    ])

    // const total =  await Stock.countDocuments(filters)
    // const page = Math.ceil(total/ query.limit)
    // return {total, page,products }
    return stocks
}



exports.getStockServiceById = async(id)=>{
    // const result = await Stock.findOne({_id:id}).populate("brand.id").populate("store.id").populate("suppliedBy.id")
    const result = await Stock.aggregate([
        {$match: {_id: new ObjectId(id)}},
        // {
        //     $project:{
        //         category:1,
        //         quantity:1,
        //         price:1,
        //         productId:1,
        //         name:1,
        //         "brand.name":1
        //     }
        // },
        // {
        //     $lookup:{
        //         from:'brands',
        //         localField:'brand.name',
        //         foreignField:'name',
        //         as:"brandDetails"
        //     }
        // }
    ]) 
   return result;
}

exports.updateStockServiceById = async(id,data)=>{
    const result = await Stock.updateOne({_id:id},data)
   return result;
}