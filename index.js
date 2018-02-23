const express = require('express')
const port=process.env.PORT || 3000;
const app = express()
const fs = require('fs')
const upload1 = require('./start')
const multer = require('multer')
const words = require('./words')
cloudconvert = new (require('cloudconvert'))('qbSKGdtOeHuhfn2aS8UmQ4BqI9j3uhlQNNzDwhjs0SE2lz1fkFETAZrZIzuidA7E9fxK9GS3mQUFzChK7s7b1A');


var sampleFile=""
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,__dirname+'/uploads')
    },
    filename : (req,file,cb)=>{
        sampleFile = file.originalname

        //cb(null,file.originalname)
        if(file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
                cb(null,"abc.docx")
        }
        else{

             cb(null,"abc.doc")
            fs.createReadStream('./uploads/abc.doc') // input file
            .pipe(cloudconvert.convert({
            "inputformat": "doc",
            "outputformat": "docx",
            "input": "upload"
        })).pipe(fs.createWriteStream('./uploads/abc.docx')); //output file
       // cb(null,"abc.docx")
        }
        //cb(null,file.filename)
    }
})
const upload = multer({storage})
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('upload')
})

app.post('/',upload.single('sample'),(req,res)=>{
    console.log(req.body,req.file)
    upload1.check(res);

   // res.send(words)


})

app.get('/js',(req,res)=>{
    res.send(words)
})

app.listen(port,()=>{
    console.log('started..! on port')
})
