 app.post('/api/file', function(req, res) {
    let upload = multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            let ext = path.extname(file.originalname)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req, res, function(err) {
        res.end('File is uploaded')
    })
  })
   let port = process.env.PORT || 3000
   app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
   })
 