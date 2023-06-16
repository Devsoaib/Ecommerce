const slugify = require("slugify");
const braintree = require("braintree");
const productModel = require("../models/productsModel");

const fs = require("fs");
const { request, response } = require("express");
const orderModel = require("../models/orderModel");

//BRAINTREE

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//create product

exports.createProduct = async (req, res) => {
  try {
    console.log(req.fields);
    console.log(req.files);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    console.log("PHOTO========>", photo);

    //validation
    switch (true) {
      case !name?.trim():
        return res.json({ error: "Name is required" });
      case !description?.trim():
        return res.json({ error: "Description is required" });
      case !price?.trim():
        return res.json({ error: "Price is required" });
      case !category?.trim():
        return res.json({ error: "Category is required" });
      case !quantity?.trim():
        return res.json({ error: "Quantity is required" });
      case !shipping?.trim():
        return res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
    }

    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.readOne = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.seephoto = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ _id: req.params.id })
      .select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
      return res.send(product.photo.data);
    } else {
      return res.status(400).send("product not found");
    }
  } catch (error) {
    console.log(error);
  }
};
//delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.remove({ _id: id });
    if (product) {
      return res.json(product);
    } else {
      return res.status(400).send("product not found");
    }
  } catch (error) {
    console.log(error);
  }
};
//update product
exports.updateProduct = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // option1
    // validation
    switch (true) {
      case !name?.trim():
        return res.json({ error: "Name is required" });
      case !description?.trim():
        return res.json({ error: "Description is required" });
      case !price?.trim():
        return res.json({ error: "Price is required" });
      case !category?.trim():
        return res.json({ error: "Category is required" });
      case !quantity?.trim():
        return res.json({ error: "Quantity is required" });
      case !shipping?.trim():
        return res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
    }

    // update product
    const product = await productModel.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

//filter product
exports.filterProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    console.log("args => ", args);

    const products = await productModel.find(args);
    console.log("filtered products query => ", products.length);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productCount = async (req, res) => {
  try {
    const totalProducts = await productModel.find({}).estimatedDocumentCount();
    res.status(200).json(totalProducts);
  } catch (error) {
    console.log(error);
  }
};
//pagination
exports.pagination = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};
//search Product

exports.searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    if (results) {
      res.json(results);
    } else {
      res.json({ message: "products not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

//Related products

exports.relatedProducts = async (req, res) => {
  try {
    const { categoryId, productId } = req.params;
    const products = await productModel
      .find({
        category: categoryId,
        _id: { $ne: productId },
      })
      .select("-photo")
      .limit(3)
      .populate("category");

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

//find by category
exports.categoryPage = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await productModel
      .find({ category: categoryId })
      .select("-photo")
      .populate("category");

    if (products.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found for this category" });
    }

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Payment

exports.getToken = (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.processPayment = (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((item, i) => {
      total = total + item.price;
    });

    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      (err, result) => {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user.id,
          }).save();

          res.json({ ok: true });
        } else {
          res.status(500).send(err);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    // console.log(orderId, status);
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("buyer", "email name");

    // console.log(order)
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

