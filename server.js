import express from 'express';
const app = express()
const port = 3000

import path from 'path';
import multer from 'multer'; 
import mergePdf from './merge.js';

const upload = multer({ dest: 'uploads/' })
const __dirname = import.meta.dirname;

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'templates', 'index.html');
    res.sendFile(filePath);
    // res.sendFile("C:\\Users\\Admin-PC\\Desktop\\Project\\Merge Pdfs\\templates\\index.html")
})


app.post('/merge', upload.array('pdfs'), async function (req, res, next) {    
    // console.log(req.files)

    if (req.files.length < 2 || req.files.length > 2 ) {
        return res.status(400).send('Please select exactly two PDF files');
    }

    let d = await mergePdf(path.join(req.files[0].path),path.join(req.files[1].path))
    await res.redirect(`http://localhost:3000/static/${d}.pdf`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
