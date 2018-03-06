const request = require('request'),
    config = require ('./config');

var functions={
    requestHandler : function(req,res) {        
    var cities=[];
    let slots = req.body.request.intent.slots;
    var responseText='';    
    try{
        let options ={
            url : config.fuelApiUrl,
            headers : { "X-Mashape-Key": "6sCZzgdqDDmshmixiqXD4oqFCgNwp1cuj7mjsnMn5HLNfmmkiP", "Accept": "application/json"},
            method : 'GET',            
          json: true
        }
        
    request(options, (error, response) => {
            if (!error && response.statusCode == 200) {
                cities = response.body.cities;
                for (var index = 0; index < cities.length; ++index) {
                    if(cities[index].city.toLowerCase() === slots.city.value.toLowerCase()){
                        if(slots.fuel.value.toLowerCase()=== 'petrol'){
                            console.log('Petrol price in '+slots.city.value+ ' is '+ cities[index].petrol + 'Rupees!');
                            responseText = 'Petrol price in '+slots.city.value+ ' is '+ cities[index].petrol + ' Rupees';
                        }
                        else if(slots.fuel.value.toLowerCase()=== 'diesel'){
                            console.log('Diesel price in '+slots.city.value+ ' is '+ cities[index].diesel + 'Rupees!');
                            responseText = 'Diesel price in '+slots.city.value+ ' is '+ cities[index].diesel + ' Rupees';
                        }
                        else if(slots.fuel.value.toLowerCase()=== 'fuel'){
                            console.log('Fuel prices in '+slots.city.value+ ' Petrol  is '+ cities[index].petrol + 'Rupees and  diesel is '+ cities[index].diesel + 'Rupees!');
                            responseText = 'Fuel prices in '+slots.city.value+ ' Petrol  is '+ cities[index].petrol + ' Rupees and  diesel is '+ cities[index].diesel + ' Rupees!';
                        } 
                        var responseJson = {
                            "response": {
                                "outputSpeech": {
                                  "type": "PlainText",
                                  "text": responseText,
                                  "ssml": "<speak>"+responseText+"</speak>"
                                }
                            }
                        }
                        res.json (responseJson).end();   
                        return 'success' ;
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
    
}

module.exports = functions;
