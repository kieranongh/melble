/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require("@googlemaps/google-maps-services-js");
const { writeFileSync } = require("fs");
const md5 = require("md5");
const suburbs = require("../src/data/suburbs.json");

const maps = new Client({});

async function run() {
  const data = [];
  for (const suburb of suburbs) {
    const result = await maps.geocode({
      params: {
        address: `${suburb}, VIC, Australia`,
        key: process.env.GEOCODING_API_KEY,
      },
    });

    console.log(`Requesting ${suburb}...`);
    const { lat, lng } = result.data.results[0].geometry.location;
    const placeId = result.data.results[0].place_id;

    data.push({
      code: md5(suburb.toUpperCase()),
      placeId,
      name: suburb,
      longitude: lng,
      latitude: lat,
    });
  }

  writeFileSync("src/data/suburbs-google.json", JSON.stringify(data, null, 2));
}

run().catch(console.error);
