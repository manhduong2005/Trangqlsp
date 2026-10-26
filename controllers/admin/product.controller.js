const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");

const searchHelper = require("../../helpers/search")

const paginationHelper = require("../../helpers/pagination")
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

  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);


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
        break;
      case "inactive":
        await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
        break;
      case "delete-all":
        await Product.updateMany({ _id: { $in: ids } }, { deleted: "true", deletedAt: new Date()});
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

    res.redirect(req.get("Referrer") || "/admin/products");
  } catch (error) {
    console.error("Lỗi deleteItem:", error.message);
    res.redirect("/admin/products");
  }
};
