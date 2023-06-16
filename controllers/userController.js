const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const orderModel = require('../models/orderModel');
const saltRounds = 10;

exports.register = async (req,res) => {
     //destructure name, email and password from req.body
     const {name, email, password, address} = req.body;
    try {

    //required validation
    if (!name.trim()) {
        return res.json({error: "name is required"})
    }
    if (!email) {
        return res.json({error: "email is required"})
    }
    if (!address) {
        return res.json({error: "address is required"})
    }
    if (!password || password.length < 6) {
        return res.json({error: "password should be at least 6 characters"})
    }

    //check if email is taken
    const existingEmail = await userModel.findOne({email});
    if (email === existingEmail) {
        return res.json({error: "email is already taken"})
    }
    //hashed password
    const hashedPass = await bcrypt.hash(password, saltRounds);

    //insert user
    const insertUser = new userModel({
        name: name,
        email: email,
        address: address,
        password: hashedPass
    })
    //save user
    const userInserted = await insertUser.save();


    const token = jwt.sign({
        id: insertUser._id,
        name: insertUser.name,
        email: insertUser.email,
        address: insertUser.address,
      }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({userInserted, token})

    } catch (error) {
        res.status(500).send({error: error.message})
    }

}

//Login
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!email) {
            return res.json({ error: "Email is required" });
          }
        const user = await userModel.findOne({email: email});

        if (!user) {
            res.status(404).json({error: "User not found"});
        }
        if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (result === true) {
                   const token = jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        address: user.address,
                      }, process.env.JWT_SECRET, { expiresIn: '1d' });

                      res.status(200).json({
                        token: token,
                        user: user
                      })
                }
                else{
                    res.status(401).json({
                        message: "invalid email or password"
                    })
                }
            });
        }
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

//update profile
exports.updateProfile = async(req, res) => {
    try {
        const {name, email, password,address} = req.body;
        const user = userModel.findById(req.id);

        //password check
        if ( !password || password.length < 6) {
            return res.json({error: "password must be at least 6 characters"})
        }

        //hashed password
        const hashedPass = password ? await bcrypt.hash(password, saltRounds) : undefined;

        const updatedUser = await userModel.findByIdAndUpdate(req.id, {
            name: name || user.name,
            email: email || user.email,
            email: address || user.address,
            password: hashedPass || user.password
        }, {new: true})
        updatedUser.password = undefined;
        res.send(updatedUser);
    } catch (error) {
        res.json({error: error.message});
    }
}


//get Product
exports.getOrders = async (req, res) => {
  // console.log(req.user.id);
  try {
    const orders = await orderModel.find({ buyer: req.user.id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
}

  exports.allOrders = async (req, res) => {
    try {
      const orders = await orderModel.find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (err) {
      console.log(err);
    }
  };
  
