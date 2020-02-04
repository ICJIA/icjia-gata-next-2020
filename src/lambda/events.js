/* eslint-disable no-unused-vars */
require("dotenv").config();
let axios = require("axios");
const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

exports.handler = async (event, context) => {
  // let start, end;
  // let now = new Date();
  // if (!event.queryStringParameters.start) {
  //   start = formatDate(new Date(now.getFullYear(), now.getMonth(), 1));
  // } else {
  //   start = event.queryStringParameters.start;
  // }

  // if (!event.queryStringParameters.end) {
  //   end = formatDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
  // } else {
  //   end = event.queryStringParameters.end;
  // }

  // let events = await axios.get(
  //   `https://www.eventbriteapi.com/v3/users/me/events/?token=${EVENTBRITE_TOKEN}&page_size=100&expand=venue&expand=category&expand=ticket_classes&start_date.range_start=${start}&start_date.range_end=${end}`
  // );

  let events = await axios.get(
    `https://www.eventbriteapi.com/v3/users/me/events/?token=${EVENTBRITE_TOKEN}&status=live&time_filter=current_future&page_size=100&expand=venue,format,ticket_classes&order_by=start_asc`
  );

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(events.data)
  };
};
