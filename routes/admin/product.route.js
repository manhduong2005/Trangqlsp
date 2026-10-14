const express = require('express')
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get('/', controller.index);   // khi truy cập vào /admin/products, gọi hàm index trong controller

module.exports = router;