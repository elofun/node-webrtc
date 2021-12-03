'use strict';

const { inherits } = require('util');

const {
  RTCDataChannel,
  RTCIceTransport,
  setDOMException
} = require('./binding');

const EventTarget = require('./eventtarget');
inherits(RTCDataChannel, EventTarget);
inherits(RTCIceTransport, EventTarget);

try {
  setDOMException(require('domexception'));
} catch (error) {
  // Do nothing
}

module.exports = {
  RTCDataChannel,
  RTCDataChannelEvent: require('./datachannelevent'),
  RTCIceCandidate: require('./icecandidate'),
  RTCIceTransport,
  RTCPeerConnection: require('./peerconnection'),
  RTCPeerConnectionIceEvent: require('./rtcpeerconnectioniceevent'),
  RTCSessionDescription: require('./sessiondescription'),
};
