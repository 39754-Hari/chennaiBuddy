const request = require('request'),
    config = require ('./config');

var functions={
    requestHandler : function(req,res) {
        console.log('Inside intent:', req.body.request.intent.name);
        var responseText = getFuelPrices(req.body.request.intent.slots);
        console.log('Response from method : ',responseText);
        return {
            "response": {
                "outputSpeech": {
                  "type": "PlainText",
                  "text": "Inside fuel price intent!",
                  "ssml": "<speak>Inside fuel price intent!</speak>"
                }
            }
        }
    }
    
}

module.exports = functions;

var getFuelPrices = function(slots){
    var cities=[];
    try{
        let options ={
            url : config.fuelApiUrl,
            headers : { "X-Mashape-Key": "6sCZzgdqDDmshmixiqXD4oqFCgNwp1cuj7mjsnMn5HLNfmmkiP", "Accept": "application/json"},
            method : 'GET',            
          json: true
        }

        request(options, (error, response) => {
            if (!error && response.statusCode == 200) {
                console.log('Inside success',slots);
                console.log(response.body);
                cities = response.body.cities;
                for (var index = 0; index < cities.length; ++index) {
                    console.log ('inside for loop '+index);
                    if(cities[index].city.toLowerCase() === slots.city.value.toLowerCase()){
                        console.log('inside if success'+slots.fuel.value.toLowerCase())
                        switch(slots.fuel.value.toLowerCase()){
                            case "petrol":
                                return  ('Petrol price in '+slots.city.value+ ' is '+ cities[index].petrol + 'Rupees!');
                            break;
                            case "diesel":
                                return  ('Diesel price in '+slots.city.value+ ' is '+ cities[index].diesel + 'Rupees!');
                            break;
                            case "fuel":
                                return  ('Fuel price in '+slots.city.value+ ' Petrol  is '+ cities[index].petrol + 'Rupees and  diesel is '+ cities[index].diesel + 'Rupees!');
                            break;
                        }
                    }
                        
                }
            } else if (response.statusCode == 404) {
                console.log('Inside 404');
                console.log('');
            } else {
                console.log('Inside error');
                console.log(error);
            }
        });
    }
    catch (e){
        console.log("Exception in getfuelprice " + e);
    }
}