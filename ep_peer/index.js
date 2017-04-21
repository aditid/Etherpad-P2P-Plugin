var eejs = require('ep_etherpad-lite/node/eejs'),
 express = require('ep_etherpad-lite/node_modules/express');

exports.eejsBlock_disconnected = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_peer/templates/editOfflineButton.ejs", {}, module);
  return cb();
}


//insert styles here
exports.eejsBlock_styles = function (hook_name, args, cb) {
  args.content = args.content + "<link href='/static/plugins/ep_peer/static/css/edit_offline.css' rel='stylesheet'>";
  args.content = args.content + "<link href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css' rel='stylesheet'>";
  args.content = args.content + "<link href='//cdn.quilljs.com/1.2.4/quill.snow.css' rel='stylesheet'>";
  
  return cb();
}


//insert scripts here
exports.eejsBlock_scripts = function (hook_name, args, cb) {
  args.content += "<script src='/static/plugins/ep_peer/static/js/offline_edit.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/bower_components/yjs/y.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/bower_components/y-array/y-array.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/bower_components/y-memory/y-memory.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/bower_components/y-webrtc/y-webrtc.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/bower_components/y-richtext/y-richtext.js'></script>";
  args.content += "<script src='//cdn.quilljs.com/1.2.4/quill.js'></script>";

  return cb();
}


exports.eejsBlock_htmlHead = function (hook_name, args, cb) {
  args.content = "<html manifest='/offlinemanifest.appcache'>";
  return cb();
}

exports.eejsBlock_body = function (hook_name, args, cb) {
  args.content += '<div id="quill-container-p2p-placeholder"><div id="quill-p2p-toolbar"></div><div id="quill-p2p-editor"></div>';
  return cb();
}

exports.expressConfigure = function(hook_name, args, cb) {
}

exports.expressServer = function (hook_name, args, cb) {
  args.app.get('/offline.html', function(req, res) { 
    res.send(eejs.require("ep_peer/templates/offline.ejs"));
  });

  args.app.get('/offlinemanifest.appcache', function(req, res) {
    res.setHeader('Content-Type', 'text/cache-manifest');
    res.send(eejs.require("ep_peer/static/offlinemanifest.appcache"));
  });

}

