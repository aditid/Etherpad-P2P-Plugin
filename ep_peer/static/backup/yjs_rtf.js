//TODO: Remember to lock-out user when transitioning from Etherpad to P2P and from P2P back to Etherpad!!! 
// (is easy to lock-out user in P2P system -- just change the contenteditable attribute in the div with class ".ql-editor" to false)
// (but how does ep_offline_edit UNlock Etherpad's UI from letting the user type?)




/*
window.localStorage - stores data with no expiration date
window.sessionStorage - stores data for one session (data is lost when the browser tab is closed)
*/
function persist(padId) {
	console.log("Persisting data with padId: " + padId + "!")//TO COMMENT OUT LATER
	localStorage.setItem("etherpad-p2p-plugin_saved-padId-" + padId, $(".ql-editor").html());
}
function checkLocalPersists(padId) {
	return !(localStorage.getItem("etherpad-p2p-plugin_saved-padId-" + padId) === null)
}

function testLoadPersists(padId) {
	if (checkLocalPersists(padId)) {
		console.log("Retrieving persisted data in localStorage...");
		console.log(localStorage.getItem("etherpad-p2p-plugin_saved-padId-" + padId));
		console.log("Now removing associated key of " + padId + " in localStorage.");
		localStorage.removeItem("etherpad-p2p-plugin_saved-padId-" + padId);
	} else {
		console.log("No such persisted data in localStorage by that padId!");
	}
}

//TODO
///*
function loadPersists(padId) {
	if (checkLocalPersists(padId)) {
		var htmlContents = localStorage.getItem("etherpad-p2p-plugin_saved-padId-" + padId);
		console.log("There are locally persisted changes!");
		//console.log(htmlContents);
		
		//TODO: Translate Quill-Editor's HTML to Etherpad UI's HTML and load into pad
		//...
		parser = new DOMParser();
		q_body = parser.parseFromString(htmlContents, "text/html")
		q_data2 = q_body.getElementsByTagName('p')
		ep_data2 = '';
		
		for (var i = 0; i < q_data2.length; i++) {
			ep_data2 += '<div id="magicdomid' + (i+2).toString() + '" class=""><span class="">' + q_data2[i].innerText + '</span></div>';
		}
		
		//console.log(window.frames["ace_outer"].document.getElementsByName("ace_inner")[0]);
		//console.log($(window.frames["ace_outer"].document.getElementsByName("ace_inner")[0]).contents().find("#innerdocbody"));
		$(window.frames["ace_outer"].document.getElementsByName("ace_inner")[0]).contents().find("#innerdocbody").html(ep_data2);
		
		localStorage.removeItem("etherpad-p2p-plugin_saved-padId-" + padId);
	} else {
		console.log("No persisted changes!");
	}
}
//*/


function startP2PEditor(q_data) {
	//console.log("This is in yjs_rtf.js...");
	Y({
	  db: {
		name: 'memory' // use memory database adapter.
		// name: 'indexeddb' // use indexeddb database adapter instead for offline apps
	  },
	  connector: {
		name: 'webrtc', // use webrtc connector
		// name: 'websockets-client'
		// name: 'xmpp'
		room: 'etherpad-p2p-rtf-quill'+window.ETHERPAD_P2P_PADID // clients connecting to the same room share data //extra +window.ETHERPAD_P2P_PADID was modified by David
	  },
	  sourceDir: '/static/plugins/ep_peer/static/backup/bower_components', // location of the y-* modules (browser only)
	  share: {
		richtext: 'Richtext'
	  }
	}).then(function (y) {
	  console.log("Now creating Quill Editor...");
	  window.yquill = y;
	  
	  var toolbarOptions = [['bold', 'italic', 'underline']];
	  
	  /*//Don't really need to use this if we're using a periodic WebWorker to persist -- but should we still use it? Should we add it as an option?
	  //Remember to uncomment/comment the keyboard module in the new Quill(...) configuration!!!
	  var testPadId = window.ETHERPAD_P2P_PADID;
	  // Reason I'm doing these persist functions before in configuration and not using quill.keyboard.addBinding is because 
	  // "Multiple handlers may be bound to the same key and modifier combination. Handlers will be called synchronously, in 
	  // the order they were bound. By default, a handler stops propagating to the next handler, unless it explicitly returns true"
	  // and I think without propagating explicitly, my functions before either overwrote quill's default handlers or didn't execute at all
	  var myBindings = {
		persistEtherpadP2P_Space: {
			key: 32,//apparently keycode for the space button
			handler: function() {
				persist(padId);
				return true;//To propagate to default key behavior? -- https://github.com/quilljs/quill/issues/866
			}
		},
		persistEtherpadP2P_Enter: {
			key: 13,//apparently keycode for the enter button
			handler: function() {
				persist(padId);
				return true;
			}
		},
		//persistEtherpadP2P_Paste: {
		//	key: 'V',
		//	shortKey: true,
		//	handler: function() {
		//		persist(padId);
		//		return true;
		//	}
		//},//Probably shouldn't use this since if our event occurs before the default handler, then it wouldn't even capture the pasted content
	  };
	  //*/
	  
	  // create quill element
	  window.quill = new Quill('#quill-p2p-editor', {
		formats: {//If any of these values are true but can take on multiple values, takes on any value I think
		  script: false,//SUB, SUP, or super, sub?
		  background: false,//uses parchment?
		  bold: true,//STRONG, B
		  color: false,//uses parchment? 'red', 'blue'?
		  font: false,//uses parchment?
		  code: false,//CODE
		  italic: true,//EM, I
		  link: false,//A
		  size: false,//small, large, huge
		  strike: false,//S
		  underline: true,//U
		  blockquote: false,//blockquote
		  header: false,//H1, H2, H3, ... H6
		  indent: false,//uses parchment? 1,2,3,4,5,6,7,8?
		  list: false,//OL, UL
		  align: false,//right, center, justify
		  direction: false,//uses parchment? 'rtl'?
		  formula: false,//SPAN
		  image: false,//IMG
		  video: false,//IFRAME
		  //code-block: false//PRE --> I get error "missing : after property id"?
		},
		modules: {
		  'toolbar': toolbarOptions,
		  /*keyboard: {
			  bindings: myBindings
		  }*/
		},
		theme: 'snow'
	  });
	  console.log("Now binding Quill Editor...");
	  // bind quill to richtext type
	  y.share.richtext.bindQuill(window.quill);
	  console.log("Finished binding y-js to Quill Editor!");
	  
	  //now insert q_data into the Quill Editor
	  if (q_data.length > 0 && window.yquill.connector.swr.webrtc.peers.length == 0) {
		  document.getElementsByClassName("ql-editor")[0].innerHTML = q_data;
	  }
	  
	  startPersisting();
	});
}

function startPersisting() {
	//Need alternate persist method because I suspect that incoming changes from peers won't be picked up and persisted, so best method is just to
	//periodically persist all changes in general
	var blobPersist = new Blob([
		document.querySelector('#workerPeriodicPersist').textContent
	], { type: "text/javascript" });
	
	if (!window.centralServerUp) {
		console.log("Now beginning persistent worker...");
		var persistentWorker = new Worker(window.URL.createObjectURL(blobPersist));
		persistentWorker.postMessage("remind me to persist");
		persistentWorker.onmessage = function(event) {
			persist(window.ETHERPAD_P2P_PADID);
			if (window.centralServerUp) {
				persistentWorker.terminate();
				persistentWorker = undefined;
			} else {
				persistentWorker.postMessage("remind me to persist");
			}
		}
	}
}