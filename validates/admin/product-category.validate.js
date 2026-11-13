const systemConfig = require("../../config/system");

module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", `Vui lòng nhập tiêu đề!`);
    res.redirect(`${systemConfig.prefixAdmin}/products-category/create`);
    return;
  }
  next();
};