const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaGl0ZXNoZGhhbWVsaXlhIiwiYSI6ImNrc3JvdXRwZDBvbmoydm82dXRyc2hyZm4ifQ.Q7x8Qczpo1Pc0lXMzwnKXg'

    request({url: url, json: true}, (error, response) => {

        if(error){
            callback('Unable to connect to locatin service!', undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined , {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode