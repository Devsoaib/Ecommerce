const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate:{
            validator: (v)=>{
                const emailRegx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return emailRegx.test(v)
            },
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
      },
})

const usersModel = mongoose.model('users', userSchema);

module.exports = usersModel;