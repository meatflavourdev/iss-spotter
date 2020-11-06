// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("IP fetch didn't work!" , error);
    return;
  }
  console.log('Returned IP:' , ip);
  fetchCoordsByIP('sd', (error, coords) => {
    if (error) {
      console.log("Coords fetch didn't work!" , error);
      return;
    }
    console.log('Returned Coords:' , coords);
  });
});

