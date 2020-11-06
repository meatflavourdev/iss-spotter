// index.js
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
      console.log('Returned Flyover Data:' , data);
    });
  });
});

