/**
 * TL;DR Just initiates the main background code found in clientCode.js (which is injected via htmlPreprocess.js) upon documentReady event
 */

exports.startMain = function (hook_name, args, cb) {
  p2pMain();
}