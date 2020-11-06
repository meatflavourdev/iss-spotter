// index.js
const humanizeDuration = require("humanize-duration");
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss_promised");

const printPassTimes = function(passTimes) {
  const data = JSON.parse(passTimes);
  for (const flyover of data.response) {
    const timeString = new Date(flyover.risetime * 1000).toString();
    console.log(`Next pass at ${timeString} for ${humanizeDuration(flyover.duration * 1000)}!`);
  }
};

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
