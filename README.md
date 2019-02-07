# Nexmo call handling Voice Agent SOE sample built with Node-RED

This sample shows how to build a Service Orchestration Engine for Voice Gateway using Node-RED. Node-RED is a programming tool for wiring together 
hardware devices, APIs and online services on top of Node.js. For more details go to: https://nodered.org/

This very simple sample shows how to create a voice agent that takes voice input to detect if the user wants to transfer the call to a pre-defined phone number. This sample is a starting point for building much more complex and rich applications.

Make sure you have a deployed running instance of (INSERT HERE) application, or you can run it locally tunneled with ngrok or similar. It's endpoints must be accesible from the outside world. We will name this "Call handling app" from now on. Once you are done with that, follow these steps:
1. Get a phone number from Nexmo and link it to the app
    1.  Create a Nexmo account [here](https://dashboard.nexmo.com/sign-up)
    2.  Buy a phone number [here](https://dashboard.nexmo.com/buy-numbers). This is the number you will dial to trigger the assistant
    3.  Create a Nexmo voice application [here](https://dashboard.nexmo.com/voice/create-application). Use the call handling app 'eventUrl' and 'answerUrl' for URL inputs.
    4.  Associate the phone number to the application you just created. The app will make requests to the URLs we setup when a call is received in the associated number(s).

2. Create the following Bluemix services to launch the assistant (Voice Agent will create them for you): 
[Watson Speech To Text](https://console.bluemix.net/catalog/services/speech-to-text), 
[Watson Text To Speech](https://console.bluemix.net/catalog/services/text-to-speech), 
[Watson Assistant](https://console.bluemix.net/catalog/services/watson-assistant), 
[IBM Voice Agent with Watson](https://console.bluemix.net/catalog/services/voice-agent-with-watson) 
Make sure to configure IBM Voice Agent with Watson to use the services you created before. Voice agent with Watson is an orchestrator between Speech to text, text to speeech and watson assistant.
In the phone number field you must set the one you bought from Nexmo. Make sure to include the international country code.
Click on "Getting started" on the left navbar so we can gather the SIP URI that will trigger the assistant. Copy the content of "your voice agent endpoint" and paste 'sip:<chosenPhoneNumber>@<yourVoiceAgentEndpoint>' in this line (INSERT LINK HERE) with  in the call handling app.

**vgw-conversation-flow.json** file.
Create a skill on IBM Watson Assistant. On the Add Dialog Skill section upload this JSON file to import our sample. This file defines the flow of the voicebot. Defines the welcome message, you can setup answers to determinate questions, etc. But most importantly it has the logic to decide when to trigger an http call to our call handling application when the "transfer" intent is detected.

**vgw-node-red-flow.txt** file.
This file contains our sample SOE node-red topology. The Service Orchestration Engine (SOE) provides a simple way to customize the behavior of the IBM Voice Gateway / Voice Agent with Watson. It acts as a Watson Conversation proxy that sits between the IBM Voice Gateway/Voice Agent and the Watson Conversation service, modifying requests sent from the voice gateway to Watson and modifying responses sent back to the voice gateway/Voice Agent from Watson. This SOE will detect when the nexmoCommand variable is setup in the context. This variable is setup by the Assistant skill. If the command is detecetd, and http request to our voice handling app will be triggered. The app will make the transfer happen. Follow these steps:
1. Create a node-red instance [here](https://cloud.ibm.com/catalog/starters/node-red-starter). It takes a while to spin up. When the app is finally up, click on "visit app URL".
2. Enter username and pass and just click "next" until the wizard is complete.
3. Go to your node-RED flow editor
4. Import the content of this file using the import -> clipboard option
5. Double click on the "http request" node and update the URL to point to the "/watson" endpoint in your app
6. Double click on the "Assistant" node and update it with your credentials and information. Setting up "API key", "Service endpoint", "Workspace Id" is enough. You can get this info from the Watson assistant skills overview section. You will see a card containing the skill we created. Click on the three dots on the top right corner to see the API details. There you will find all the info you'll need.
7. Navigate back to the "Voice Agent with Watson" configuration. We need to tell the agent to start using our SOE instead of going directly into the voice assistant. For doing this, scroll down until you find the "Watson assistant" section and from the service type dropdown select "Service Orchestration Engine". Plug in the username and pass you chose when creating the node-red instance and populate the url with your SOE node-red URL. It should look something like "https://my-nexmo-soe.mybluemix.net/soe". Notice that the "soe" is the path to the first node in the node-red topology we imported


Give it a shot!
Dial the Nexmo phone number and after the greeting message say "INSERT HERE". The skill should detect your intention of transfering the call. An http call should be triggered to your app's /watson endpoint. This will make the call transfer happen.





