const Product = require("../../models/product.model");

const systemConfig = require("../../config/system")

const filterStatusHelper = require("../../helpers/filterStatus");

const searchHelper = require("../../helpers/search")

const paginationHelper = require("../../helpers/pagination");


//[GET]  /admin/products
module.exports.index = async (req, res) => {
  // filerStatus, search, pagination
  const filterStatus = filterStatusHelper(req.query);// gọi hàm filterStatusHelper để lấy ra mảng filterStatus, truyền vào query của request để lọc theo status

  // console.log(filterStatus)
  //
  let find = {
    deleted: false,

  };

  if (req.query.status) {
    find.status = req.query.status;// gán thêm trường status vào find để lọc theo status
  }


  const objectSearch = searchHelper(req.query);
  //console.log(objectSearch)

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // end filterStatus, search
  //pagination
  const countProducts = await Product.countDocuments(find)

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4
    },
    req.query,
    countProducts
  );

  //end patination

  const products = await Product.find(find).sort( {position: "desc"}).limit(objectPagination.limitItems).skip(objectPagination.skip);


  //console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
}
//[PATCH]  /admin/products/change-status/:status/:id

// module.exports.changeStatus = async (req, res) => {
//   // console.log("changeStatus");
//   // console.log(req.params);
//   const status = req.params.status;
//   const id = req.params.id;

//   await Product.updateOne(
//       { _id: id },
//       { status: status }
//     );

//   res.redirect("back"); // sau khi thay đổi trạng thái xong, chuyển hướng về trang trước đó
// }
////[PATCH]  /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;

    // Cập nhật trạng thái sản phẩm
    await Product.updateOne(
      { _id: id },
      { status: status }
    );

    req.flash("success", "Cập nhật trạng thái thành công!");

    // Lấy URL trang trước đó (bảo toàn các params ?page=...&keyword=...)
    const redirectUrl = req.get("Referrer") || "/admin/products";
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error.message);
    res.redirect("/admin/products");
  }
};
// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const type = req.body.type;
    const ids = req.body.ids ? req.body.ids.split(",").map(id => id.trim()) : [];

    switch (type) {
      case "active":
        await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
        req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);
        break;
      case "inactive":
        await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
        req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);
        break;
      case "delete-all":
        await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date()});
        req.flash("success", `Đã xoá thành công ${ids.length} sản phẩm`);
        break;
      case "change-position":
        for(const item of ids){
          let [id, position] = item.split("-");
          position = parseInt(position);
          // console.log(id);
          // console.log(position);
          await Product.updateOne({ _id: id }, {
            position: position
          });
          req.flash("success", `Đã xoá sắp xếp lại vị trí ${ids.length} sản phẩm`);
        break;
        };
        break;
      default:
        break;
    }

    res.redirect(req.get("Referrer") || "/admin/products");
  } catch (error) {
    console.error("Lỗi changeMulti:", error.message); 
    res.redirect("/admin/products");
  }
};
// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;

    // await Product.deleteOne({ _id: id }); //xoá cứng
    await Product.updateOne({ _id: id }, { 
      deleted: true,
      deletedAt: new Date()
     });
     req.flash("success", "Đã xoá thành công sản phẩm");

    res.redirect(req.get("Referrer") || "/admin/products");
  } catch (error) {
    console.error("Lỗi deleteItem:", error.message);
    res.redirect("/admin/products");
  }
};
//[GET] /admin/products/create
module.exports.create = async (req, res) =>{
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};
//[POST] /admin/products/create
// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price) || 0;
    req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;
    req.body.stock = parseInt(req.body.stock) || 0;

    if (!req.body.position || req.body.position === "") {
      const countProducts = await Product.countDocuments();
      req.body.position = countProducts + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }

    if (req.file) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const product = new Product(req.body);
    await product.save();

    req.flash("success", "Thêm mới sản phẩm thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  } catch (error) {
    console.error("Lỗi createPost:", error.message);
    req.flash("error", "Thêm mới sản phẩm thất bại!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) =>{
  try {
     const find = {
    deleted: false,
    _id: req.params.id
  };
  const product = await Product.findOne(find);
  
  res.render("admin/pages/products/edit", {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product
  });
  } catch (error){
    req.flash("error", `Không tồn tại sản phẩm này`);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
 
};
//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) =>{
  try {
    const id = req.params.id
    req.body.price = parseInt(req.body.price) || 0;
    req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;
    req.body.stock = parseInt(req.body.stock) || 0;

    req.body.position = parseInt(req.body.position);

    if (req.file) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    await Product.updateOne({_id: id}, req.body);

    req.flash("success", "Sửa sản phẩm thành công!");
    const backUrl = req.get("Referrer") || `${systemConfig.prefixAdmin}/products`;
    res.redirect(backUrl);
  } catch (error) {
    console.error("Lỗi cập nhât sản phẩm:", error.message);
    req.flash("error", "Thêm mới sản phẩm thất bại!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};