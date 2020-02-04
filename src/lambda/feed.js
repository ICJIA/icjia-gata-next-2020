/* eslint-disable no-unused-vars */
let axios = require("axios");
let Parser = require("rss-parser");
let parser = new Parser();

let getFeed = async () => {
  let feed = await parser.parseURL("https://learnstartup.net/feed/");

  return feed;
};

export async function handler(event, context) {
  let body = await getFeed();

  return {
    statusCode: 200,
    body: JSON.stringify(await getFeed())
  };
}
