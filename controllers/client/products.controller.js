const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort( {position: "desc"});

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
//GET /products/:slug
module.exports.detail = async (req, res) =>{
    console.log(req.params.slug);
  try {
     const find = {
    deleted: false,
    slug: req.params.slug,
    status: "active"
  };
  const product = await Product.findOne(find);

  console.log(product);
  
  res.render("client/pages/products/detail", {
    pageTitle: product.title,
    product: product
  });
  } catch (error){
    req.flash("error", `Không tồn tại sản phẩm này`);
    res.redirect(`/products`);
  }
 
};
