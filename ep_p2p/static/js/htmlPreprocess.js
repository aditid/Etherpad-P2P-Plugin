//EXAMPLE REQUIRE
//var eejs = require('ep_etherpad-lite/node/eejs');

exports.injectClientCode = function (hook_name, args, cb) {
  args.content += "<script src='/static/plugins/ep_p2p/static/js/clientCode.js'></script>";
  //Probably need another script tag for the Raft Golang-to-Javascript code
  return cb();
}
