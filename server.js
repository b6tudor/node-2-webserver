const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs');

app.use(express.static(__dirname + "/public"));

app.use((req,res,next)=>{
    //log request
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log(err);
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintaince.hbs',{
//         pageTitle: 'Not in service'
//     });
//     next();
// })

hbs.registerHelper('getCurrentYear',()=>{
 return new Date().getFullYear();   
});

hbs.registerHelper('screamIt',(text)=>{return text.toUpperCase()});


app.get('/',function(req,res){
    res.render('home.hbs',{
        pageTitle: 'Header',
        welcomeMessage: 'Welcome to the home page'
    });
});

app.get('/about',function(req,res){
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/projects',function(req,res){
    res.render('projects.hbs',{
        pageTitle: 'Projects Page'
    });
});

app.get('/bad',function(req,res){
    res.send({errorMessage: 'bad route'});
});

app.listen(port,function(){
    console.log(`app started on ${port}`);
})