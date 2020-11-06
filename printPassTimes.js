const humanizeDuration = require("humanize-duration");

const printPassTimes = function(passTimes) {
  for (const flyover of passTimes) {
    const timeString = new Date(flyover.risetime * 1000).toString();
    console.log(`Next pass at ${timeString} for ${humanizeDuration(flyover.duration * 1000)}!`);
  }
};

module.exports = { printPassTimes };
