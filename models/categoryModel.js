const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 32
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true
    }
}, {timestamps: true, versionKey: false });

const categoryModel = mongoose.model("categories", categorySchema) ;

module.exports = categoryModel;