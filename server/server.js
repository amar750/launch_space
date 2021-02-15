import express from 'express';
import fs from 'fs';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
const app = express();
const port = process.env.PORT || 5000;
app.use('^/$',(req,res,next)=>{
    fs.readFile(path.resolve('./build/index.html'),'utf-8',(err,data)=>{
        if(err){
            console.log("err", err);
            return res.status(500).send("Error got");
        }
        return res.send(data.replace('<div id="root"></div>',`<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`))
    })
})
app.use(express.static(path.resolve(__dirname, '..', 'build')))
app.listen(port,()=>{
    console.log(`Application run on port ${port}`)
})