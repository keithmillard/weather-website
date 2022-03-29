const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App - Home',
        name: 'Keith Millard'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App - About',
        name: 'Keith Millard'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App - Help',
        helpMsg: 'This is the help text',
        name: 'Keith Millard'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term.'
        });    
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>  {
        if(error) {
            return res.send({
                error: error
            });
        }

        forecast(latitude, longitude, (error, fdata) => {
            if(error) {
                return res.send({
                    error: error
                });
            
            }

            return res.send({
                location: location,
                forecast: fdata
            });
        });
    }); 

});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMsg: 'Help article not found.',
        name: 'Keith Millard'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMsg: 'Page Not Found',
        name: 'Keith Millard'
    });
});

app.listen(port, () => {
    console.log('Server is up and running ' + port);
});
