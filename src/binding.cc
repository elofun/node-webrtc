/* Copyright (c) 2019 The node-webrtc project authors. All rights reserved.
 *
 * Use of this source code is governed by a BSD-style license that can be found
 * in the LICENSE.md file in the root of the source tree. All contributing
 * project authors may be found in the AUTHORS file in the root of the source
 * tree.
 */
#include <node-addon-api/napi.h>
#include <assert.h>
#include <uv.h>

#include "src/interfaces/rtc_data_channel.h"
#include "src/interfaces/rtc_dtls_transport.h"
#include "src/interfaces/rtc_ice_transport.h"
#include "src/interfaces/rtc_peer_connection.h"
#include "src/interfaces/rtc_peer_connection/peer_connection_factory.h"
#include "src/interfaces/rtc_rtp_receiver.h"
#include "src/interfaces/rtc_rtp_sender.h"
#include "src/interfaces/rtc_rtp_transceiver.h"
#include "src/interfaces/rtc_sctp_transport.h"
#include "src/node/async_context_releaser.h"
#include "src/node/error_factory.h"

#ifdef DEBUG
#include "src/test.h"
#endif

static void dispose(void*) {
  node_webrtc::PeerConnectionFactory::Dispose();
}

static Napi::Object Init(Napi::Env env, Napi::Object exports) {
  node_webrtc::AsyncContextReleaser::Init(env, exports);
  node_webrtc::ErrorFactory::Init(env, exports);
  node_webrtc::PeerConnectionFactory::Init(env, exports);
  node_webrtc::RTCDataChannel::Init(env, exports);
  node_webrtc::RTCIceTransport::Init(env, exports);
  node_webrtc::RTCDtlsTransport::Init(env, exports);
  node_webrtc::RTCPeerConnection::Init(env, exports);
  node_webrtc::RTCRtpReceiver::Init(env, exports);
  node_webrtc::RTCRtpSender::Init(env, exports);
  node_webrtc::RTCRtpTransceiver::Init(env, exports);
  node_webrtc::RTCSctpTransport::Init(env, exports);

#ifdef DEBUG
  node_webrtc::Test::Init(env, exports);
#endif

  auto status = napi_add_env_cleanup_hook(env, [](void*) {
    dispose(nullptr);
  }, nullptr);
  assert(status == napi_ok);
  return exports;
}

NODE_API_MODULE(wrtc_napi, Init)
