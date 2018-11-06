const express = require('express');

module.exports = (app,auth) => {
    //appel du controller
    const question = require('./controllers/questionController');
    const user = require('./controllers/userController');

    app.get('/api/question/deleted/:array',question.findDeleted)
    app.get('/api/question/:id', question.findFromId);
    app.get('/api/question', auth.isAuth,  question.findAll);
    app.post('/api/question/create', auth.isAuth,  question.add);
    app.get('/api/question/delete/:id', auth.isAuth,  question.delete);
    app.post('/api/question/update/:id', auth.isAuth,  question.update);


    //USERS
    app.get('/api/users',  user.findAll);
    app.get('/api/users/:id', auth.isAuth,  user.findOne);
    app.post('/api/users/create',  user.add);
    app.get('/api/users/delete/:id', auth.isAuth,  user.delete);
    app.post('/api/users/update/:id', auth.isAuth,  user.update);

    //AUTH

    app.post('/api/login', auth.login);
    app.get('/api/logout', auth.logout);
}
