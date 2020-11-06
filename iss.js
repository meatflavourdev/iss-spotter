// iss.js
const request = require("request");

// API URLs
const fetchIPURL = "https://api.ipify.org/?format=json";
const fetchCoordsURL = "http://ip-api.com/json/";

/**
 * Makes a single API request to retrieve the user's IP address.
 * @param {function(String, String):void} callback - A callback to pass back an error or the IP string
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
      latitude: data.lat,
      longitude: data.lon,
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
