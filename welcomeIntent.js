config = require ('./config');

var functions={
    requestHandler : function(req,res) {
        var responseJson = {
            "response": {
                "outputSpeech": {
                  "type": "PlainText",
                  "text": 'Welcome to local buddy. I can help you to get information about chennai.',
                  "ssml": "<speak>Welcome to local buddy. I can help you to get information about chennai.</speak>"
                }
            }
        }
        res.json (responseJson).end();   
        return 'success' ;
    }
}

module.exports = functions;