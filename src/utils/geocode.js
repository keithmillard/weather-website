const request = require('request');

const mapboxBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapboxToken = 'access_token=pk.eyJ1Ijoia2VpdGhtaWxsYXJkIiwiYSI6ImNsMGxpZDk1cTB3dmQzb2w0ZjBoMGc1azMifQ.cnK2m8mog4b_R0Fu-ev6Bg';



const geocode = (address, callback) => {
    const url = mapboxBaseURL + encodeURIComponent(address) + '.json?county=US&' + mapboxToken + '&limit=1';

    //request({url: url, json: true}, (error, response) => {
    request({url, json: true}, (error, {body} = {}) => {

        const data = {
            location: '',
            latitude: 0,
            longitude: 0
        };

        if(error) {
            callback('Unable to connect to MapBox.');
        } else if(body.features.length === 0) {
            callback('Address [' + address + '] is invalid.');
        } else {
            data.location = body.features[0].place_name;
            data.latitude = body.features[0].center[1];
            data.longitude = body.features[0].center[0];
            callback(undefined, data);
        }
    });
}

module.exports = geocode;