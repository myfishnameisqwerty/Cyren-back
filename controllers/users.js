const Users = require('../models/users')

exports.Create = (req, res) => {
    try{
        Users.create(req.body, (err, obj) =>{
            if (err)    return res.send({error: true, data: err})
            else        Users.findByIdAndUpdate(obj._id, {id: obj._id}, {new: true}, sendResponse(res))
            
        })
    }
    catch(e){
        console.log(e);
    }
}
exports.Edit = (req, res) => {
    Users.findByIdAndUpdate(req.params.id, {...req.body}, {new: true}, sendResponse(res))
}
exports.Delete = (req, res) => {
    Users.findByIdAndRemove(req.params.id, sendResponse(res))
    
}
exports.Show = (req, res) => {
    Users.find({}, sendResponse(res))
}

function sendResponse(res) {
    return (err, result) => {
        if (err)
            return res.send({ error: true, data: err })
        else
            return res.send({ error: false, data: result })
    }
}
