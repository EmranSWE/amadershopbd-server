const express=require('express')
const router= express.Router()
const stockController = require('../controller/stock.controller')

router.route('/')
.get(stockController.getStock)
.post(stockController.createStock)

router.route('/:id')
.get(stockController.getStockById)
.patch(stockController.updateStockById);

module.exports = router