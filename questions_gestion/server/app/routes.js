const express = require('express');

module.exports = (app) => {
    //appel du controller
    var question = require('./controllers/questionController');

    app.get('/deleted/question/:array',question.findDeleted)
    app.get('/question/from/:id',question.findFromId);
    app.get('/question', question.findAll);
    app.post('/question/create', question.add);
    app.get('/question/delete/:id', question.delete);
    app.post('/question/update/:id', question.update);
    
    // Si on appel une autre route qui n'est pas défini au dessus on charge le fichier suivant : index.html
    app.get('*', (req, res) => {
       res.sendFile('public/index.html')
    });
}