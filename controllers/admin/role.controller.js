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
//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false
    };

    const data = await Role.findOne(find);

    res.render("admin/pages/roles/edit", {
      pageTitle: "Sửa nhóm quyền",
      data: data
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

//[PATCH] /admin/roles/edit/:id
//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id; // Đưa ra ngoài khối try

  try {
    await Role.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật nhóm quyền thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật nhóm quyền thất bại!");
  }

  res.redirect(`${systemConfig.prefixAdmin}/roles/edit/${id}`);
};
//[GET] /admin/roles/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    };

    const role = await Role.findOne(find);

    res.render("admin/pages/roles/detail", {
      pageTitle: role.title,
      role: role
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};
//[DELETE] /admin/roles/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date()
      }
    );

    req.flash("success", "Đã xóa thành công nhóm quyền!");
  } catch (error) {
    req.flash("error", "Xóa nhóm quyền thất bại!");
  }

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
