const express = require("express");
const router = express.Router();
const brandControllers= require("../controller/brand.controller");

router.route("/")
.post(brandControllers.createBrand)
.get(brandControllers.getBrand);
router.route("/:id")
.get(brandControllers.getBrandById)
.patch(brandControllers.updateBrandById)

module.exports = router;