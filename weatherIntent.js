const request = require('request'),
config = require ('./config');

var functions={
    requestHandler : function(req,res) {
        var response = ';'
        console.log();
        var city = req.body.request.intent.slots.city.value;
        var userDate = req.body.request.intent.slots.date.value;
        var currentDate = new Date().toISOString().slice(0,10);
        var enteredDate = new Date(userDate).toISOString().slice(0,10);
        if(city != null && typeof city != "undefiend"){
            if(userDate != null && typeof userDate != "undefined"){
                if (currentDate < enteredDate){
                    weatherForecast(city,userDate,res);
                    
                }
                else if(currentDate > enteredDate){
                    weatherHistory(city,userDate,res)
                }
                else{
                    getWeather(city,res);
                }
            }
            else{
                getWeather(city,res);
            }
        }
        else{
            cityMissed(res);
        }
    }
};

function weatherForecast(city,date,res){
    var forecastDate = new Date(date);
    var difference = new Date( forecastDate -new Date());
    var days = difference.getDate()+1;    
    console.log('Difference :',days);
    let options ={
        url : config.weatherForecastUrl+city+'&days='+days,
        headers : {  "Accept": "application/json"},
        method : 'GET',            
      json: true
    }
    request(options, (error, response) => {
        if (!error && response.statusCode == 200) {
            console.log(response.body.forecast);
            var forecastday = response.body.forecast.forecastday;
            for (var index = 0; index < forecastday.length; ++index) {
                if(forecastday[index].date === date)
                    {
                        console.log(forecastday[index].day);
                        var responseText = 'The weather in '+ city + ' on '+ date + ' forecasted as, '+forecastday[index].day.condition.text +
                        '. maximum temperature can be upto,'+ forecastday[index].day.maxtemp_c +' degree Celsius , minimum temperature will be '+ forecastday[index].day.mintemp_c + 
                        ' degree Celsius.';
                    var responseJson = {
                        "response": {
                            "outputSpeech": {
                              "type": "PlainText",
                              "text": responseText,
                              "ssml": "<speak>"+responseText+"</speak>"
                            },
                            "card": {
                              "type": "Standard",
                              "title": "Weather in "+city,
                              "content": "Content of a simple card",
                              "text": responseText,
                              "image": {
                                "smallImageUrl": 'https://'+forecastday[index].day.condition.icon,
                                "largeImageUrl": 'https://'+forecastday[index].day.condition.icon
                              }
                            }
                        }
                    }
                    res.json(responseJson).end();   
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
function getWeather(city,res){
    let options ={
        url : config.currentWeatherUrl+city,
        headers : {  "Accept": "application/json"},
        method : 'GET',            
      json: true
    }
    request(options, (error, response) => {
        if (!error && response.statusCode == 200) {
            var current = response.body.current;
            var responseText = 'The current weather in '+ city + ' ,is'+current.condition +
                        '. current temperature is '+ current.temp_c +' degree Celsius .';
                    var responseJson = {
                        "response": {
                            "outputSpeech": {
                              "type": "PlainText",
                              "text": responseText,
                              "ssml": "<speak>"+responseText+"</speak>"
                            }
                        }
                    }
                    res.json(responseJson).end();   
                    return 'success' ;
                    
        } else if (response.statusCode == 404) {
            console.log('Inside 404');
            console.log('');
        } else {
            console.log('Inside error');
            console.log(error);
        }
    });
}

function weatherHistory(city,date,res){
    let options ={
        url : config.weatherHistoryUrl+city+'&dt='+date,
        headers : {  "Accept": "application/json"},
        method : 'GET',            
      json: true
    }
    request(options, (error, response) => {
        if (!error && response.statusCode == 200) {
            console.log(response.body.forecast);
            var forecastday = response.body.forecast.forecastday;
            for (var index = 0; index < forecastday.length; ++index) {
                if(forecastday[index].date === date)
                    {
                        console.log(forecastday[index].day);
                        var responseText = city + '\'s weather on '+ date + ' was , '+forecastday[index].day.condition.text +
                        '. maximum temperature recorded as '+ forecastday[index].day.maxtemp_c +' degree Celsius , and minimum temperature was '+ forecastday[index].day.mintemp_c + 
                        ' degree Celsius.';
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

function getWeather(city,res){
    let options ={
        url : config.currentWeatherUrl+city,
        headers : {  "Accept": "application/json"},
        method : 'GET',            
      json: true
    }
    request(options, (error, response) => {
        if (!error && response.statusCode == 200) {
            var current = response.body.current;
            var responseText = 'The current weather in '+ city + ' ,is'+current.condition +
                        '. current temperature is '+ current.temp_c +' degree Celsius .';
                    var responseJson = {
                        "response": {
                            "outputSpeech": {
                              "type": "PlainText",
                              "text": responseText,
                              "ssml": "<speak>"+responseText+"</speak>"
                            }
                        }
                    }
                    res.json(responseJson).end();   
                    return 'success' ;
                    
        } else if (response.statusCode == 404) {
            console.log('Inside 404');
            console.log('');
        } else {
            console.log('Inside error');
            console.log(error);
        }
    });
}
module.exports = functions;
