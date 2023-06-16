const express = require('express');
const formidable = require('express-formidable');
const { createProduct, list, readOne, seephoto, deleteProduct, updateProduct, filterProducts, productCount, pagination, searchProduct, relatedProducts, getToken, processPayment, categoryPage, orderStatus } = require('../controllers/productsController');
const { checkLogin, isAdmin } = require('../middlewares/userMiddlewares');
const router = express.Router();

router.post("/product", checkLogin, isAdmin,formidable(), createProduct)
router.get("/allproducts", list)
router.get("/product/:slug", readOne)
router.get("/product/photo/:id", seephoto)
router.delete("/deleteproduct/:id", checkLogin, isAdmin, deleteProduct)
router.put("/updateproduct/:productId", checkLogin, isAdmin, formidable(), updateProduct)
router.post("/filtered-products", filterProducts)
router.get("/product-count", productCount)
router.get("/product-pagination/:page", pagination)
router.get("/products/search/:keyword", searchProduct)
router.get("/related-products/:productId/:categoryId", relatedProducts )
router.get("/my-category/:categoryId", categoryPage)


//payment routes
router.get("/braintree/token", getToken);
router.post("/braintree/payment", checkLogin, processPayment)

router.put("/order-status/:orderId", checkLogin, isAdmin, orderStatus);



module.exports = router;