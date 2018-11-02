//Inclusion du model
const Question = require('../models/question');


exports.findDeleted =(req, res)=> {
    let allQuestionsIdClient = [];
    allQuestionsIdClient = req.params.array.split(",").map(function(item) {
        return parseInt(item, 10);
    });;
 console.log("allQuestionsIdClient "+allQuestionsIdClient)
    let allQuestionsId = [];
    Question.find({}, (err, results) => {
        results.forEach(r => allQuestionsId.push(r._id));
        let filtered = allQuestionsIdClient.filter((f) => !allQuestionsId.includes(f));
        console.log("allQuestionsId "+allQuestionsId)
        console.log("filtered "+filtered)
        return res.send(filtered);
    });  
}

//Récupérer toutes les questions ayant un id supérieure à celui en entrée
exports.findFromId = (req,res) =>{
    let id = req.params.id;
    Question.find({ _id: { $gt: id } }, (err, results) => {
        return res.send(results);
    });
}

//Récupérer toutes les données d'une table
exports.findAll = (req, res) => {
    Question.find({}, (err, results) => {
    allQuestionsId = results.map(function(item){ return item._id;});
    console.log("aa"+allQuestionsId[0])
       return res.send(results);
    });
};

//Ajouter une entrée dans une table
exports.add = (req, res) => {
    Question.create(req.body, (err, team)=> {
        if(err) return console.log(err);
        return res.send(team);
    });
};

//Mettre à jour une entrée dans un table
exports.update = (req, res) => {
    var id = req.params.id;
    var data = req.body;
    Question.update({"_id":id}, data, (err, result) => {
       if(err) return res.status(409);
       console.log('Todo update', result);
       return res.send(202);
    });
};

//Supprimer une entré dans un table avec l'id
exports.delete = (req, res) => {
    var id = req.params.id;
    Question.deleteOne({'_id':id}, (result) => {
        return res.send(result);
    });
};