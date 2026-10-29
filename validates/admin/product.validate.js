const systemConfig = require("../../config/system");
module.exports.creatPost = (req, res, next) => {
  if(!req.body.title){
        req.flash("error", `Vui lòng nhập tiêu đề!`);
        res.redirect(`${systemConfig.prefixAdmin}/products/create`);
        return;
      }
    next()
}