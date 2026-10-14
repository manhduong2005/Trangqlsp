const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  });

const newProducts = products.map(item => {
  const newItem = item.toObject();

  newItem.priceNew = (newItem.price * (100 - newItem.discountPercentage) / 100).toFixed(0);

  return newItem;
});

  console.log(newProducts);

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts
  });
}
