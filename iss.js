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
    if (error) {
      callback(error);
      return;
    }
    const data = JSON.parse(body);
    callback(undefined, data.ip);
  });
};

module.exports = { fetchMyIP };
