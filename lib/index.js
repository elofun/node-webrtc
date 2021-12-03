'use strict';
if (process.env.WEBRTC_DATA_ONLY) {
  module.exports = require("./rtcdataonly");
} else {
  module.exports = require("./rtcfull");
}