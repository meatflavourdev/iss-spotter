// iss_promised.js
const request = require("request-promise-native");

// API URLs
const fetchIPURL = "https://api.ipify.org/?format=json";
const fetchCoordsURL = "http://ip-api.com/json/";
const fetchISSTimeURL = "http://api.open-notify.org/iss-pass.json";

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function () {
  return request(fetchIPURL);
};

/*
 * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const URL = fetchCoordsURL + ip;
  return request(URL);
};

/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from ipvigilante.com
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body);
  const coords = {
    lat: data.lat,
    lon: data.lon,
  };
  const queryString = new URLSearchParams(coords).toString();
  const URL = fetchISSTimeURL + '?' + queryString;
  return request(URL);
};

/*
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
