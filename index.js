const express = require('express'),
Alexa = require('alexa-app'),
bodyParser = require('body-parser'),
request = require('request'),
config = require('./config')

const app = express();
app.use(bodyParser.json());
buddy = new Alexa.app('chennaibuddy');


app.get('/',(req,res)=>{
    res.send('App running');
});

app.post('/buddy',(req,res)=>{
    console.log('Req:',req.body.request.intent);
    console.log(config.fuel);
    res.json({
        "response": {
            "outputSpeech": {
              "type": "PlainText",
              "text": "Welcome to Chennai buddy!",
              "ssml": "<speak>Welcome to Chennai buddy!</speak>"
            }
        }
    });
})

buddy.launch(function(request, response) {
    console.log('Inside launch');
    var prompt = 'Welcome to ChennaiBuddy!';
    response.say(prompt).shouldEndSession(false);
  });

const server = app.listen(process.env.PORT || 443, () => {
    console.log('Express server listening on port %d', server.address().port);
});

