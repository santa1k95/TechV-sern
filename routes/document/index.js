module.exports = function(app, passport) {
    const express = require('express');
    const router = express.Router();
    const db = require('../../config/db')
    // const User = require('../../models/Document')
    const logger = require('../../config/logger').mainLogger;
    const methodOverride = require('method-override');
    // const userController = require('../../controllers/document');

    router.use(methodOverride('_method'))

    
    router.get('/', (req,res)=>{
        res.render('index.ejs',{user: loggedUser,title: "Home Page"})
    })

    router.post('/new', (req,res)=>{
        console.log(req)
        console.log(req)
        const loggedUser={firstname:"Santanu",lastname:"Phukan"}
        const documents=["doc1","doc2"]
        res.render('index.ejs',{user: loggedUser,title: "Home Page"})
    })

    
    // router.get('/edit/:email', userController.fetchByEmail)
    
    // router.get('/login', userController.login)

    // router.delete('/logout', userController.logout)
    return router
}