const mongoose = require('mongoose')
const {isEmail} = required('validator')
const schema = new mongoose.Schema({
    id: String,
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },
    dragons:{
        type: Number,
        required: true
    },
    password: String
})
module.exports = mongoose.model('users', schema)