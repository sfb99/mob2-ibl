'use strict';

// Import the Dialogflow module and response creation dependencies
// from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

const client = require('@ibl/client').createClient();


// Instantiate the Dialogflow client.
const app = dialogflow();

app.intent("what is on the goggle box", (conv) => {
  conv.close("None of your business");
});

app.intent('Default Welcome Intent', (conv) => {
  console.log("ARE YOU HITTING ME, BABY?");
  
  conv.ask(`G'day cobber. What on B.B.C. T.V. can I help you with?`);

});

app.intent('whats popular', async (conv) => {
  let results = await client.getPopularEpisodes();
  let popular = "The top favourite shows are: ";
  for(var i = 0; i < results.elements.length; i++)
  {
    if (i > 5) break;
    if (i > 0) popular += ", ";
    popular += results.elements[i].title;
  }
  conv.close(popular);
})

app.intent('Default Fallback Intent', (conv) => {
  console.log('Are you getting here? Want a pancake?');
  conv.ask(`I didn't understand. Can you tell me something else?`);
});

exports.fulfillment = app;
