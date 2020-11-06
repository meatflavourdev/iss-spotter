// index.js
const humanizeDuration = require("humanize-duration");
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("IP fetch didn't work!" , error);
    return;
  }
  console.log('Returned IP:' , ip);
  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("Coords fetch didn't work!" , error);
      return;
    }
    console.log('Returned Coords:' , coords);
    fetchISSFlyOverTimes(coords, (error, data) => {
      if (error) {
        console.log("Flyover time data fetch didn't work!" , error);
        return;
      }
      // console.log('Returned Flyover Data:' , data);
      for (const flyover of data) {
        const timeString = new Date(flyover.risetime * 1000).toString();
        console.log(`Next pass at ${timeString} for ${humanizeDuration(flyover.duration * 1000)}!`);
      }
    });
  });
});

