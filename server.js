const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
    let app = express();

app.set('view engine', 'hbs'); //шаблонизация html страниц
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`; //ловит какую страницу открываеют
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {// и создает файл server.log куда пишет логи
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

// app.use((req, res, next) => { //типа страничка про тех.обслуживание
//     res.render('maintenance.hbs', {
//     })
// });

hbs.registerPartials(__dirname + '/views/partials'); //шаблонизация элементов html
hbs.registerHelper('getCurrentYear', () => { //шаблонизация функций при вставке в элементы html
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase(); //9 строка в home.hbs
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        WelcomeMessage: 'Welcome!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',//8 строка в about.hbs
    })//render - какой то файл
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});