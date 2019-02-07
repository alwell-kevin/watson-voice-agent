# Nexmo call handling Watson Voice Agent & SOE

This repository is designed to simplify your Nexmo <> Watson Voice Agent integration. We do that by providing explicit documentation for standing up a Nexmo Voice Application, Service Orchestration Engine and Express server that will allow you to update calls on the fly. This sample is a starting point for building much more complex and feature rich applications.

Make sure you have a deployed an instance of an application, or you can run it locally tunneled with ngrok. It's endpoints must be accesible from the outside world. We will name this "Call handling app" from now on. Once you are done with that, follow these steps:

> 1. Create a Nexmo account
> 2. Follow the [Nexmo documentation](https://developer.nexmo.com/voice/voice-api/overview#getting-started) to standup a Voice Application.
> 3. Purchase a phone number in your Nexmo account dashboard. Look under the Number tab for the 'Buy Numbers’ option.
> 4. After purchasing a number, you can create a Nexmo voice application under the ‘Voice’ tab.
> 5. Point the voice application to your client app via web hooks. Your Client app can leverage the Nexmo SDKs for faster integration
> 6. Link the number you purchased to the Voice application under Numbers, within the Voice application page.
> 7. When calling your number, Nexmo will request an NCCO from your /answer URL (provided in your voice application configuration page).
> 8. Return a [“Connect” NCCO](https://developer.nexmo.com/voice/voice-api/guides/call-flow) which dials the WVA sip uri. Enter the Voice Agent SIP URI that is displayed in the SIP URI text box on the Getting Started page of your Voice Agent instances.
Note the number that you configured the SIP URI for. You need this phone number to set up your voice agent, including the country and area codes. See Creating and connecting your voice agent.
> 9. Note* for call control, you will want to leverage a Watson SOE. Pointing the SOE at your client application web hook will allow you to [modify the call on the fly](https://developer.nexmo.com/voice/voice-api/building-blocks/transfer-a-call).

2. Create the following Bluemix services to launch the assistant *(Voice Agent will create them for you)*: 
* [Watson Speech To Text](https://console.bluemix.net/catalog/services/speech-to-text), 
* [Watson Text To Speech](https://console.bluemix.net/catalog/services/text-to-speech), 
* [Watson Assistant](https://console.bluemix.net/catalog/services/watson-assistant), 
* [IBM Voice Agent with Watson](https://console.bluemix.net/catalog/services/voice-agent-with-watson) 

Make sure to configure IBM Voice Agent with Watson to use the services you created before. Voice agent with Watson is an orchestrator between Speech to text, text to speeech and watson assistant.

*In the phone number field you must set the one you bought from Nexmo.* Make sure to include the international country code.
Click on "Getting started" on the left navbar so we can gather the SIP URI that will trigger the assistant. Copy the content of "your voice agent endpoint" and paste 'sip:<chosenPhoneNumber>@<yourVoiceAgentEndpoint>' in this line with  in the call handling app.

**SOE.json** file.
This file contains our sample SOE node-red topology. The Service Orchestration Engine (SOE) provides a simple way to customize the behavior of the IBM Voice Gateway / Voice Agent with Watson. It acts as a Watson Conversation proxy that sits between the IBM Voice Gateway/Voice Agent and the Watson Conversation service, modifying requests sent from the voice gateway to Watson and modifying responses sent back to the voice gateway/Voice Agent from Watson. This SOE will detect when the nexmoCommand variable is setup in the context. This variable is setup by the Assistant skill. If the command is detected, and http request to our voice handling app will be triggered. The app will make the transfer happen. 

### Follow these steps:
> 1. Create a node-red instance [here](https://cloud.ibm.com/catalog/starters/node-red-starter). It takes a while to spin up. When the app is finally up, click on "visit app URL".
> 2. Enter username and pass and just click "next" until the wizard is complete.
3. Go to your node-RED flow editor
> 4. Import the content of this file using the import -> clipboard option
> 5. Double click on the "http request" node and update the URL to point to the "/watson" endpoint in your app
> 6. Double click on the "Assistant" node and update it with your credentials and information. Setting up "API key", "Service endpoint", "Workspace Id" is enough. You can get this info from the Watson assistant skills overview section. You will see a card containing the skill we created. Click on the three dots on the top right corner to see the API details. There you will find all the info you'll need.
> 7. Navigate back to the "Voice Agent with Watson" configuration. We need to tell the agent to start using our SOE instead of going directly into the voice assistant. For doing this, scroll down until you find the "Watson assistant" section and from the service type dropdown select "Service Orchestration Engine". Plug in the username and pass you chose when creating the node-red instance and populate the url with your SOE node-red URL. It should look something like "https://my-nexmo-soe.mybluemix.net/soe". Notice that the "soe" is the path to the first node in the node-red topology we imported


## Give it a shot!
### Dial the Nexmo phone number and after the greeting message say "tell me about Watson". The skill will detect your intent. 


