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

  if(req.query.status){
    find.status = req.query.status;// gán thêm trường status vào find để lọc theo status
  }


  const objectSearch = searchHelper(req.query);
  //console.log(objectSearch)

  if(objectSearch.regex){
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
