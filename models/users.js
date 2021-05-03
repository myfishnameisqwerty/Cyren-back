const mongoose = require('mongoose')
const {isEmail} = require('validator')


const schema = new mongoose.Schema({
    id: String,
    name:{
        type: String,
        required: true,
        validate:{
            validator: (v) => {
                return /^([a-zA-Z\s.'-]+)$/.test(v)
            }
        }
    },
    email:{
        type: String,
        immutable: true,
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
    fetched: {
        type: Boolean,
        default: false
    },
    password: String
})

const model = mongoose.model('users', schema)
module.exports = model