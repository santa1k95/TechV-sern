module.exports = function(app, passport) {
    const express = require('express');
    const router = express.Router();
    const db = require('../../config/db')
    const Document = require('../../models/Document')
    const logger = require('../../config/logger').documentRouteLogger;
    const methodOverride = require('method-override');
    // const userController = require('../../controllers/document');
    const multer = require('multer');
    const upload=multer({
        // dest:'files',
        limits:{
            fileSize: 2000000
        },
        fileFilter(req,file,cb){
            // console.log(file)
            if(!file.originalname.match(/\.(doc|docx|pdf)$/)){
                return cb(new Error('Unsupported file provided'))
            }
            cb(undefined,true)
        }
    })
    router.use(methodOverride('_method'))

    
    router.get('/', (req,res)=>{
        res.redirect('/');
    })

    router.post('/upload', upload.array('files'), async (req,res)=>{
        try {
            logger.info("Inside /document/upload")
            const files=req.files
            const results=[]
            for (let file of files){
                let {originalname} = file;
                logger.info("Processing: "+file.originalname)
                const doc = Document.build({
                    fileName: originalname,
                    fileData: file.buffer
                })
                const result=await doc.save()
                if(result){
                    results.push(true)
                }
            };
            if(results.length != files.length){
                logger.error("Error in uploading the files")
                res.status(400).send({error: "Error in uploading the files"})
            }
            logger.info("Completed /document/upload")
            res.status(200).send({message: "Upload Succesful"})
        } catch (error) {
            logger.error("Error in /document/upload "+ console.error())
            
        }
    },(error,req,res,next)=>{
        logger.error("Error in /document/upload "+ error.message)
        res.status(400).send({error: error.message})
    })


    
    // router.get('/edit/:email', userController.fetchByEmail)
    
    // router.get('/login', userController.login)

    // router.delete('/logout', userController.logout)
    return router
}