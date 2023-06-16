const express = require('express');
const { register, login, updateProfile, getOrders, allOrders } = require('../controllers/userController');
const { checkLogin, isAdmin } = require('../middlewares/userMiddlewares');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h2>hello vai</h2>")
})
router.post("/register", register);
router.post("/login", login);
router.get("/authcheck", checkLogin, (req, res) =>{
    res.status(200).json({message: "you are a verified user"})
})
router.get("/admin-check", checkLogin, isAdmin, (req, res) =>{
    res.status(200).json({ok: true})
})
router.put("/update", checkLogin, updateProfile)


// orders
router.get("/orders", checkLogin, getOrders);
router.get("/all-orders", checkLogin, isAdmin, allOrders);


module.exports = router;
