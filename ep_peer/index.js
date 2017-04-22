var eejs = require('ep_etherpad-lite/node/eejs'),
 express = require('ep_etherpad-lite/node_modules/express');
var path = require('path');

exports.eejsBlock_disconnected = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_peer/templates/editOfflineButton.ejs", {}, module);
  return cb();
}

exports.eejsBlock_styles = function (hook_name, args, cb) {
  args.content = args.content + "<link href='/static/plugins/ep_peer/static/css/edit_offline.css' rel='stylesheet'>";
  args.content = args.content + "<link href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css' rel='stylesheet'>";
  args.content = args.content + "<link href='//cdn.quilljs.com/1.2.4/quill.snow.css' rel='stylesheet'>";
  return cb();
}

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  //Also... assuming Etherpad comes with jQuery... it's gotta come with jQuery...
  
  var inlineWorkerScripts = "\
  <script id='workerPeriodicPersist' type='javascript/worker'>\
	var timeoutMsec = 2000;\
	self.onmessage = function(e) {\
		setTimeout(function() {\
			self.postMessage('persist data now');\
		}, timeoutMsec);\
	}\
  </script>\
  \
  \
  \
  \
  \
  <!--YOUCUN'S CODE, MODIFIED BY DAVID -->\
  <script id='heartbeatWorker' type='javascript/worker'>\
	var socket;\
	self.onmessage = function(event) {\
		var msg = event.data.cmd;\
		var wholeURL = event.data.url;\
		var padIndex = wholeURL.indexOf('p/');\
		console.log(msg);\
		console.log(wholeURL);\
		if (msg == 'importScripts') {\
			if (padIndex != -1) {\
				var originalServerURL = wholeURL.substring(0, padIndex);\
				importScripts(originalServerURL + 'p2pWebWorkerSocketIO');\
				console.log('Imported socket.io script!');\
			} else {\
				console.log('Could not import script!');\
			}\
		} else if (msg == 'start') {\
			\
			socket = io.connect(wholeURL.substring(0, wholeURL.indexOf('p/')));\
			socket.on('connect', function(data) {\
				self.postMessage('Server Back Up');\
				socket.disconnect();\
			});\
			socket.on('reconnect', function(data) {\
				self.postMessage('Server Back Up');\
				socket.disconnect();\
			});\
			\
			\
			\
			socket.on('connect_error', function(data) {\
				self.postMessage('Connect error');\
			});\
			\
			socket.on('error', function(data) {\
				self.postMessage('Error');\
			});\
			\
			socket.on('connect_timeout', function(data) {\
				self.postMessage('Timeout');\
				socket.disconnect();\
			});\
			\
			socket.on('reconnect_failed', function(data) {\
				self.postMessage('Reconnect failed');\
				socket.disconnect();\
			});\
			\
			socket.on('disconnect', function(data) {\
				self.postMessage('Disconnect');\
				socket.disconnect();\
			});\
		} else {\
			self.postMessage('Faulty message sent');\
		}\
	}\
  </script>\
  ";
  args.content += inlineWorkerScripts;
  
  args.content += "<script src='/static/plugins/ep_peer/static/js/offline_edit.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/bower_components/yjs/y.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/bower_components/y-array/y-array.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/bower_components/y-memory/y-memory.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/bower_components/y-webrtc/y-webrtc.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/bower_components/y-richtext/y-richtext.js'></script>";
  args.content += "<script src='/static/plugins/ep_peer/static/backup/yjs_rtf.js'></script>";
  args.content += "<script src='//cdn.quilljs.com/1.2.4/quill.js'></script>";
  return cb();
}

exports.eejsBlock_body = function (hook_name, args, cb) {
  args.content += '<div id="quill-container-p2p-placeholder"><div id="quill-p2p-toolbar"></div><div id="quill-p2p-editor"></div></div>';//missed a closing div tag
  return cb();
}


//Need this for importing socket.io.js
//Unsure about this code, truthfully -- how does it find the path exactly?
exports.expressServer = function (hook_name, args, cb) {
	var curDir = __dirname;
	args.app.get('/p2pWebWorkerSocketIO', function(req, res) {
		console.log("Request for socket.io.js file received!");
		res.sendFile(path.join(curDir + "/socket.io.js"));
	});
}
