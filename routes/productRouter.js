const router = require("express").Router();
const {addProduct , getProduct} = require("../controller/productController");

router.post("/",addProduct),
router.get("/",getProduct)

module.exports = router;