module.exports = function(app) {
    const mainroute = require('express').Router()
    const logger = require('../config/logger').mainLogger;
  
    const r_document = require('./document'); /*document route*/
  
    mainroute.use('/document', r_document(app)); /*documentroute*/
  
    mainroute.get('/', (req, res) => {
      try {
        const loggedUser={firstname:"Santanu",lastname:"Phukan"}
        const documents=["doc1","doc2"]
        res.render('index.ejs',{user: loggedUser,title: "Home Page"});
      } catch (error) {
        logger.info(error.toString())
      }
    });
  
    return mainroute;
  };