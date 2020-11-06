// iss.js
const request = require("request");

// API URL
const URL = "https://api.ipify.org/?format=json";

/**
 * Makes a single API request to retrieve the user's IP address.
 * @param {function(String, String):void} callback - A callback to pass back an error or the IP string
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request(URL, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

module.exports = { fetchMyIP };
