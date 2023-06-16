const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel')

exports.checkLogin = (req, res, next) => {

    try {
      const decoded = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );

    //   console.log(decoded);
    
      req.user = decoded;
        next();
    } catch (error) {
        // next("authentication failed");

        res.status(401).json({
            error: "authentication failed",
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await usersModel.findOne({_id: req.user.id});
        if (user.role !== 1) {
            return res.status(401).send("Unauthorized");
        } else {
            next()
        }
        } catch (error) {
        console.log(error.message);
    }
}

