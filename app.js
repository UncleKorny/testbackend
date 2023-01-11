import express from 'express';
const app = express();
const fs = require('fs');
const jsonParser = express.json();

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/cabinet',(req,res)=>{
    res.send('типа личный кабинет');
});
app.get('/about',(req,res)=>{
    res.send('типа about');
});
app.get('/faq',(req,res)=>{
    res.send('типа faq');
});
app.get('*',(req,res)=>{
    res.send('404');
})


app.listen(3000,()=>{
    console.log('Server has been started...');
});