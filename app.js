
const express = require('express');
const logger = require('morgan');
const port = process.env.PORT || 5000;
const app = express();
const fs = require('fs');
// app.use(express.static("public"));

const JsBarcode = require('Jsbarcode');
const {createCanvas, loadImage} = require('canvas');

app.get("/", (req, res)=> {
  const fontsize = req.query.fontsize ? req.query.fontsize : '13';
  const data = req.query.data ? req.query.data : 'Hello';
  const width = req.query.width ? req.query.width : 1;
  const height = req.query.height ? req.query.height : 100;
  const fileName = req.query.filename ? req.query.filename + '.png' : 'barcode.png';
  const displayValue = req.query.displayValue ? req.query.displayValue : true;
  const out = fs.createWriteStream(__dirname + '/' + filename)
  const canvas = createCanvas(width,height);
  JsBarcode(canvas, data, {displayValue: displayValue, fontSize: fontSize, textMargin: 10, width: width, height: height, fontOptions: "bold"});
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', ()=>{res.download(__dirname+ '/' + filename)});
  // res.end(image);
})

app.listen(port, ()=> console.log("Server running at 5000!"));