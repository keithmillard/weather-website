const request = require('request');

const weatherStackKey = 'access_key=36590369675e9dd91421210741ccc5c0';
const units = 'units=f';
const baseURL = 'http://api.weatherstack.com/';


const forecast = (latitude, longitude, callback) => {

    location = 'query=' + latitude + ',' + longitude;

    const url = baseURL + 'current?' + weatherStackKey + '&' + location + '&' + units;
    //const url = baseURL + 'current?' + weatherStackKey + '&' + units;

    //request({url: url, json: true}, (error, response) => {
    request({url, json: true}, (error, {body} = {}) => {
        if(error)
        {
            callback('Unable to connect to WeatherStack.');
        } else if(body.error) {
            callback(body.error.info);
        } else {
            callback(undefined, 'It is currently ' + body.current.weather_descriptions[0] + ' and ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.');
        }
    });
}

module.exports = forecast;