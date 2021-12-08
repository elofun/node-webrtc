'use strict';

const { inherits } = require('util');

const {
  RTCDataChannel,
  RTCDtlsTransport,
  RTCIceTransport,
  RTCRtpReceiver,
  RTCRtpSender,
  RTCRtpTransceiver,
  RTCSctpTransport
} = require('./binding');

const EventTarget = require('./eventtarget');

inherits(RTCDataChannel, EventTarget);
inherits(RTCDtlsTransport, EventTarget);
inherits(RTCIceTransport, EventTarget);
inherits(RTCSctpTransport, EventTarget);

// NOTE(mroberts): Here's a hack to support jsdom's Blob implementation.
RTCDataChannel.prototype.send = function send(data) {
  const implSymbol = Object.getOwnPropertySymbols(data).find(symbol => symbol.toString() === 'Symbol(impl)');
  if (data[implSymbol] && data[implSymbol]._buffer) {
    data = data[implSymbol]._buffer;
  }
  this._send(data);
};


const nonstandard = {};

module.exports = {
  RTCDataChannel,
  RTCDataChannelEvent: require('./datachannelevent'),
  RTCDtlsTransport,
  RTCIceCandidate: require('./icecandidate'),
  RTCIceTransport,
  RTCPeerConnection: require('./peerconnection'),
  RTCPeerConnectionIceEvent: require('./rtcpeerconnectioniceevent'),
  RTCRtpReceiver,
  RTCRtpSender,
  RTCRtpTransceiver,
  RTCSctpTransport,
  RTCSessionDescription: require('./sessiondescription'),
  nonstandard,
};
