// iss.js
const request = require("request");

// API URLs
const fetchIPURL = "https://api.ipify.org/?format=json";
const fetchCoordsURL = "http://ip-api.com/json/";
const fetchISSTimeURL = 'http://api.open-notify.org/iss-pass.json';

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request(fetchIPURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // Request returned non-200 status-- assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    // Success assumed-- return IP address
    callback(null, data.ip);
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function(ip, callback) {
  request(fetchCoordsURL + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // Request returned non-200 status-- assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP Coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // API returned failed response
    const data = JSON.parse(body);
    if (data.status === "fail") {
      callback(Error(data.message), null);
    }
    // Success-- return coords
    callback(null, {
      lat: data.lat,
      lon: data.lon,
    });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const queryString = new URLSearchParams(coords).toString();
  const URL = fetchISSTimeURL + '?' + queryString;
  console.log(URL);

  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // Request returned non-200 status-- assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP Coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // API returned failed response
    const data = JSON.parse(body);
    // Success-- return coords
    callback(null, data.response);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
