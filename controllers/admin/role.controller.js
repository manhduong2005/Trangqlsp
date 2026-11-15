const Role = require("../../models/role_model");
const systemConfig = require("../../config/system");
//[GET]  /admin/roles
module.exports.index = async (req, res) => {
  let find = { 
    deleted: false 
  };
  const records = await Role.find(find)

  res.render("admin/pages/roles/index", {
    pageTitle: "Trang nhóm quyền",
    records: records
  });
}
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo nhóm quyền",
  });
}
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const record = new Role(req.body);
  await record.save();
  res.redirect(systemConfig.prefixAdmin + "/roles");
}