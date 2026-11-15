const express = require('express')
const router = express.Router();

const controller = require("../../controllers/admin/role.controller");

router.get('/', controller.index);   // ← đổi từ .dashboard thành .index

router.get('/create', controller.create);   // ← thêm route để hiển thị form tạo role

router.post('/create', controller.createPost);   // ← thêm route để xử lý form tạo role

module.exports = router;