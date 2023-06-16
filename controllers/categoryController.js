const categoryModel = require('../models/categoryModel');
const slugify = require('slugify');


//create a new category
exports.createCategory = async (req, res) => {
    const {name} = req.body;
    
    try {
        if (!name.trim()) {
            return res.json({error: "Name is required"})
        }
        const existingCategory = await categoryModel.findOne({name});
        if (existingCategory) {
            return res.json({error: "Category already exists"})
        }

        const category = await new categoryModel({name, slug: slugify(name)}).save();
        res.send(category)
    } catch (error) {
        console.log(error);
        res.json({error: error.message})
    }
}

//update category

exports.updateCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const {categoryId} = req.params
        const category = await categoryModel.updateOne({_id: categoryId},{$set:{
            name: name,
            slug: slugify(name)
        }}, {upsert: true});
        
        res.status(201).json(category)
    } catch (error) {
        console.log(error);
        res.json({error: error.message})
    }
}

//delete category
exports.removecategory = async (req, res) =>{
    try {
        const {categoryId} = req.params
        const removed = await categoryModel.remove({_id: categoryId})
        res.status(201).send(removed)
    } catch (error) {
        console.log(error);
        res.json({error: error.message})
    }
}

//find all

exports.allcategories = async (req, res) => {
    try {
        const findall = await categoryModel.find()
        res.status(200).send(findall)
    } catch (error) {
        console.log(error);
        res.json({error: error.message})
    }
}

//findOne

exports.read = async (req, res) => {
    try {
        const {slug} = req.params;
        const category = await categoryModel.findOne({slug: slug});
        if (category) {
            res.status(200).json({
                success: true,
                message: category
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: "category not found"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({error: error.message})
    }
}