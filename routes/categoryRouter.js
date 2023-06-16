const express = require('express');
const { createCategory, updateCategory, removecategory, allcategories, read } = require('../controllers/categoryController');
const { checkLogin, isAdmin } = require('../middlewares/userMiddlewares');
const router = express.Router();

router.post("/category", checkLogin, isAdmin, createCategory );
router.put("/updatecategory/:categoryId", checkLogin, isAdmin, updateCategory)
router.delete("/removecategory/:categoryId", checkLogin, isAdmin, removecategory)
router.get("/categories", allcategories);
router.get("/category/:slug", read)

module.exports = router;