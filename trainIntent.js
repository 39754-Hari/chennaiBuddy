config = require ('./config');

var functions={
    requestHandler : function(req,res) {
        var sourceCity = req.body.request.intent.slots.source.value;
        var destinationCity = req.body.request.intent.slots.destination.value;
        var responseText = 'Trains available from '+sourceCity + ' to '+destinationCity +
        ' are, , Chennai express departing on 06:50 hours, MUMBAI EXPRESS departing on 12:20 hours, MUMBAI MAIL departing on 23:55 hours';
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

module.exports = functions;