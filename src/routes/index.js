module.exports = function(app) {
    const mainroute = require('express').Router()
    const logger = require('../logger').mainLogger;
  
    const r_document = require('./document'); /*document route*/
  
    mainroute.use('/document', r_document(app)); /*document route*/
  
    mainroute.get('/', (req, res) => {
      try {
        const loggedUser={firstname:"Santanu",lastname:"Phukan"}
        res.render('index.ejs',{user: loggedUser,title: "Home Page"});
      } catch (error) {
        logger.info(error.toString())
      }
    });
  
    return mainroute;
  };