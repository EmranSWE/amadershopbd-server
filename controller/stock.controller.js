
const { createStockService, getStockService, getStockServiceById, updateStockServiceById } = require("../service/stock.service");

exports.createStock= async(req,res,next)=>{
    try {
        const result = await createStockService(req.body);
        
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


exports.getStock= async(req,res,next)=>{
    try {
        let filters = {...req.query};
        //stock?sortBy=price&price=5000&name=chal&location=dhaka
        //sort, page, limit => exclude
        const excludeField = ['sort','page','limit']
        excludeField.forEach(field => delete filters[field])

        //gt,lt,gte,lte
        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lte)\b/g, match => `$${match}`);
        filters = JSON.parse(filterString)
    const queries= {};

    if(req.query.sort){
        const sortBy = req.query.sort.split(",").join(" ")
        queries.sortBy = sortBy
        console.log(sortBy)
    }

        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
            console.log(fields)
        }

        if(req.query.page){
            const {page= 1, limit=10}= req.query;
            const skip = (page- 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit)
        }
        const products = await getStockService(filters,queries)

        
        res.status(200).json({
            status:"success",
            message:"Successfully created the Product",
            data:products
        })
    } catch (error) {
        res.status(400).json({
            err:error.message,
            status:"Failed",
            error:"Couldn't create the brand"
        })
    }
}


exports.getStockById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const result = await getStockServiceById(id);
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



exports.updateStockById = async(req,res,next)=>{
    const {id}=req.params;
    try {
        const result = await updateStockServiceById(id,req.body);
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