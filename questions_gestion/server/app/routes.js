const express = require('express');

module.exports = (app,auth) => {
    //appel du controller
    const question = require('./controllers/questionController');
    const user = require('./controllers/userController');

    app.get('/deleted/question/:array',question.findDeleted)
    app.get('/question/from/:id', question.findFromId);
    app.get('/question', auth.isAuth,  question.findAll);
    app.post('/question/create', auth.isAuth,  question.add);
    app.get('/question/delete/:id', auth.isAuth,  question.delete);
    app.post('/question/update/:id', auth.isAuth,  question.update);
    

    //USERS
    app.get('/api/users', auth.isAuth,  user.findAll);
    app.get('/api/users/:id', auth.isAuth,  user.findOne);
    app.post('/api/users/create', auth.isAuth,  user.add);
    app.get('/api/users/delete/:id', auth.isAuth,  user.delete);
    app.post('/api/users/update/:id', auth.isAuth,  user.update);

    //AUTH

    app.post('/api/login', auth.login);
    app.get('/api/logout', auth.logout);



    // Si on appel une autre route qui n'est pas défini au dessus on charge le fichier suivant : index.html
    app.get('*', (req, res) => {
       res.sendFile('public/index.html')
    });
}