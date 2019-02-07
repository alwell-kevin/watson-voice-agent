const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '',
  apiSecret: '',
  applicationId: '',
  privateKey: ''
})

let callUUID = null;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('/watson', function(req, res) {
  console.log(req.body);
  nexmo.calls.update(callUUID, { action: 'hangup' }, function(err, resp) {
    console.log(err);
    console.log(resp);
    res.json({
      response: 'This was a huge success'
    });
  });
});

app.post('/eventUrl', function(req, res) {
  console.log(req.body);

  //Simple way of grabbing the latest call uuid to trigger the API commands.
  //You probably want to handle this in a complete different way
  if (req.body.uuid != callUUID) callUUID = req.body.uuid;

  res.status(200).send();
});

app.post('/answerUrl', function(req, res) {
  console.log(req.body);

  const ncco = [{
      "action": "talk",
      "text": "Please wait while we connect you"
    },
    {
      "action": "connect",
      "from": "<watson_number>",
      "endpoint": [{
        "type": "sip",
        "uri": "sip:<watson_number>@us-south.voiceagent.cloud.ibm.com"
      }]
    }
  ];
  res.send(ncco);
});