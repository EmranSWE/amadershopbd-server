const express=require('express')
const router= express.Router()
const productController = require('../controller/product.controller')
//Image upload using multer
const uploader = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');
const authorization = require("../middleware/authorization")
router.post("/file-upload",uploader.array("image"), productController.fileUpload)

// 
{/* <input type="file" name:"image" /> */}
{/* const formData = new FormData()
formData.append("image",formData)
*/}


//router.use(verifyToken) ==> if all is need to authentication
router.route('/')
.get(productController.getProduct)
.post(verifyToken,authorization("admin","store-manage") ,productController.createProduct)


router.route('/:id')
.get(productController.getProductById)
.patch(productController.updateProductById);

module.exports = router