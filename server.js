const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to the file');
        }
    });
    next();
});

app.use((req,res,next)=>{
    // res.render('maintenance.hbs');
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h>');
    // res.send({
    //     name: 'Subrat',
    //     likes: [
    //         'Biking',
    //         'Eating'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to home page'
    })
});

app.get('/about', (req, res) => {
    // res.send('<h1>Hello Express!</h>');
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    // res.send('<h1>Hello Express!</h>');
    res.send({
        errorMessage: 'Unable to get the page'
    });
});

app.get('/projects', (req, res) => {
    // res.send('<h1>Hello Express!</h>');
    // res.send('About page');
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});