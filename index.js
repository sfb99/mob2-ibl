'use strict';

// Import the Dialogflow module and response creation dependencies
// from the Actions on Google client library.
const {dialogflow, Image, Carousel, BasicCard} = require('actions-on-google');

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
  let carousel = { items: {} };
  for(var i = 0; i < results.elements.length; i++)
  {
    if (i > 5) break;
    if (i > 0) popular += ", ";
    carousel.items[results.elements[i].id] = {
      synonyms: [
        results.elements[i].title + ' ' + results.elements[i].subtitle
      ],
      title: results.elements[i].title + ' ' + results.elements[i].subtitle,
      description: results.elements[i].synopses.small,
      image: new Image({
        // url: results.elements[i].images.standard,
        url: `https://loremflickr.com/860/640?random=${results.elements[i].id}`,
        alt: results.elements[i].title,
      }),
    };
    popular += results.elements[i].title;
  }

  // conv.close(popular);
  conv.ask(popular);
  conv.ask(new Carousel(carousel));
});

app.intent('actions.intent.OPTION', async (conv, params, option) => {
  let result = await client.getEpisodes(option);

  let simpleResponse = `${result[0].title} ${result[0].subtitle}. ${result[0].synopses.medium}`;
  let card = {
    title: result[0].title,
    subtitle: result[0].subtitle,
    text: result[0].synopses.medium,
    image: new Image({
      // url: result[0].images.standard,
      url: `https://loremflickr.com/860/640?random=${result[0].id}`,
      alt: result[0].title,
    }),
    display: 'CROPPED',
  };

  conv.ask(simpleResponse);
  conv.ask(new BasicCard(card));
});

app.intent('Default Fallback Intent', (conv) => {
  console.log('Are you getting here? Want a pancake?');
  conv.ask(`I didn't understand. Can you tell me something else?`);
});

exports.fulfillment = app;
