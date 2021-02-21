const path = require('path')
const express = require('express')
const multer = require('multer')

const app = express()
const port = 3000

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending .jpg
  }
})

const upload = multer({ dest: 'uploads/' ,storage:storage})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/image',express.static(path.join(__dirname, 'uploads')))

app.get('/', (request, response) => response.send('Hello World!'))

app.get('/upload', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

app.post('/upload', upload.single('file'), function (req, res) {
  res.send(req.file.originalname + 'ファイルのアップロードが完了しました。');
})

app.listen(port,function(){
  console.log(`Example app listening on port ${port}!`)
})