const router = require("express").Router();
const auth = require("../middleware/auth");
const { createInvoice , getInvoice } = require("../controller/invoiceController");

router.post("/" ,createInvoice);
router.get("/",getInvoice)

module.exports = router;