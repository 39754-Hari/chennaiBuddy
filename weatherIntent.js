const request = require('request'),
config = require ('./config');

var functions={
    requestHandler : function(req,res) {
        var response = ';'
        console.log();
        var city = req.body.request.intent.slots.city.value;
        var userDate = req.body.request.intent.slots.date.value;
        var type = req.body.request.intent.slots.type.value;
        var currentDate = new Date().toISOString().slice(0,10);
        var enteredDate = new Date(userDate).toISOString().slice(0,10);
        if(city != null && typeof city != "undefiend"){
            if(userDate != null && typeof userDate != "undefined"){
                if (currentDate < enteredDate){
                    weatherForecast(city,userDate, function(err,resp){
                        if (err) 
                            console.log(err);
                        console.log('After call'+resp);
                    });
                    
                }
                else if(currentDate > enteredDate){
                    weatherHistory(city,userDate)
                }
                else{
                    getWeather(city);
                }
            }
            else{
                getWeather(city);
            }
        }
        else{
            cityMissed();
        }
    }
};

function weatherForecast(city,date,callback){
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
                        var responseText = 'The weather in '+ city + ' on '+ date + ' forecasted as '+forecastday[index].day.condition.text +
                        ', maximum temperature can be upto'+ forecastday[index].day.maxtemp_c +' degree Celsius , minimum temperature will be '+ forecastday[index].day.mintemp_c + 
                        ' degree Celsius.';
                        callback(err,responseText);
                        //return responseText;
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

module.exports = functions;
