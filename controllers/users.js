const Users = require('../models/users')
const axios = require('axios')

exports.initiate = () => {
    axios.get(process.env.REMOTE_SERVER)
    .then(response => {
        let {data} = response
        data.forEach(element => {
            let user = {...element, fetched:true}
            Users.findOneAndUpdate({email:user.email}, user, {new:true}, (err, res) => {
                if (!res){
                    Users.create(user)
                }
            })
        });
    })
}
exports.Create = (req, res) => {
    try{
        Users.create(req.body, (err, obj) =>{
            if (err)    return res.send({error: true, data: err})
            else        Users.findByIdAndUpdate(obj._id, {id: obj._id}, {new: true}, sendSingle(res))
            
        })
    }
    catch(e){
        console.log(e);
    }
}
exports.Edit = (req, res) => {
    const {fetched, ...rest} = req.body
    Users.findById(req.params.id, (err, response) => {
        if (!response.fetched){
            Users.findByIdAndUpdate(req.params.id, rest, {new: true}, sendSingle(res))

        }
    })
}
exports.Delete = (req, res) => {
    Users.findByIdAndRemove(req.params.id, sendSingle(res))
    
}
exports.findAll = async (req, res) => {
    Users.find({}, (err, response) => {
        if (err) {
          console.log(err);
          return res.send(err);
        } else {
          let range = [0, 10];
          let result = [...response]
          
          
          try {
              if (req.query.filter && Object.keys(JSON.parse(req.query.filter)).length) {
                  let filter = JSON.parse(req.query.filter)
                  result = result.filter((item) => 
                    (item[Object.keys(filter)[0]] == filter[Object.keys(filter)[0]])
                    

                  );
            }
            if (req.query.sort) {
              const sort = JSON.parse(req.query.sort);
              sort[1] = sort[1].toLowerCase() === "asc" ? 1 : -1;
              result.sort((a, b) =>
                a[sort[0]] > b[sort[0]] ? 1 * sort[1] : -1 * sort[1]
              );
            }
  
            if (req.query.range) {
              range = JSON.parse(req.query.range);
            }
            res.setHeader("Content-Range", `${result.length}`);
            result = result.slice(range[0], range[1] + 1);
  
            return res.send(result);
          } catch (e) {
            return res.send(e);
          }
        }
      })
     
  };
  
function sendSingle(res) {
    return (err, result) => {
        if (err)
            return res.send({ error: true, data: err })
        else
            return res.send({ error: false, data: result })
        
            
    }
}
