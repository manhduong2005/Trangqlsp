const express = require('express')
const router = express.Router();

const controller = require("../../controllers/admin/dashboard.controller");

router.get('/', controller.index);   // ← đổi từ .dashboard thành .index

module.exports = router;