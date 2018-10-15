const client = require('@ibl/client').createClient();

(async () => {
  let results = await client.getPopularEpisodes();

  console.log(JSON.stringify(results));
  })();


  //IBL();