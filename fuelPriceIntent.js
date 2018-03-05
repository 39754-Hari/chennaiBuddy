var functions={
    requestHandler : function(req,res) {
        console.log('Inside intent:', req.body.request.intent.name);
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