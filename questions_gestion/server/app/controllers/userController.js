const UserModel = require('../models/user');

exports.add = (req, res) => {
	let username = req.body.username;
	let password = new UserModel().generateHash(req.body.password);
	UserModel.findOne({"username": username}, (err, result) => {
		if(err) return res.status(409);
		if(result) return res.send("User already exist");
		else {
			UserModel.create({"username":username, "password":password}, (err, result) => {
				if(err) return res.status(409);
				return res.send(result);
			})
		}
	});
};

exports.findOne = (req,res) => {
        let username = req.params.id;
        UserModel.find({ 'username': username}, (err, results) => {
            if(err) console.log(err);
            return res.send(results);
        });
};

exports.findAll = (req,res) =>{
    UserModel.find({}, (err, results) =>{
        if(err) console.log(err);
        return res.send(results);
    });
};

exports.delete = (req, res) => {
    let id = req.params.id;
    UserModel.deleteOne({'_id': id}, (err,result) =>{
        if(err) console.log(err);
        return res.send(result);
    })
};

exports.update = (req, res) => {
    let id = req.params.id;
    let data = req.body;
    UserModel.update({"_id":id}, data, (err, result) => {
        if(err) return res.status(409);
        console.log('Todo update', result);
        return res.send(202);
     });
 };
