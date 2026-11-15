const express = require('express')
const multer = require('multer')

const router = express.Router();

const upload = multer()

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validates/admin/product-category.validate")


router.get('/', controller.index);   // khi truy cập vào /admin/products-category, gọi hàm index trong controller

router.get('/create', controller.create);   // khi truy cập vào /admin/products-category/create, gọi hàm create trong controller

router.post('/create', upload.single("thumbnail"), uploadCloud.upload, validate.createPost, controller.createPost);
//upload.single("thumbnail") : hãy tìm file được gửi từ ô input có name là thumbnail, Sau đó dùng đúng quy tắc storageMulter để lưu file đó xuống ổ đĩa.

router.get('/edit/:id', controller.edit);   // khi truy cập vào /admin/products-category/edit/:id, gọi hàm edit trong controller

router.patch('/edit/:id', upload.single("thumbnail"), uploadCloud.upload, validate.createPost, controller.editPatch);

router.get('/detail/:id', controller.detail);

router.delete('/delete/:id', controller.deleteItem);

module.exports = router;