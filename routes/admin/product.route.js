const express = require('express')
const multer = require('multer')
const router = express.Router();

const storageMulter = require("../../helpers/storageMulter")
const upload = multer({ storage: storageMulter() }) // truyền bộ luật ở file helper vào multer
//multer tự động truyền file đã nhận được vào hàm storage trong helper nên không cần truyền khi gọi nữa

const controller = require("../../controllers/admin/product.controller");

const validate = require("../../validates/admin/product.validate")

router.get('/', controller.index);   // khi truy cập vào /admin/products, gọi hàm index trong controller

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post('/create', upload.single("thumbnail"), validate.creatPost, controller.createPost);
//upload.single("thumbnail") : hãy tìm file được gửi từ ô input có name là thumbnail, Sau đó dùng đúng quy tắc storageMulter để lưu file đó xuống ổ đĩa.

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', upload.single("thumbnail"), validate.creatPost, controller.editPatch);


module.exports = router;