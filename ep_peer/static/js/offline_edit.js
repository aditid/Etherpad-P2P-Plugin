//YOUCUN'S CODE MODIFIED BY DAVID
window.blob1 = new Blob([document.querySelector('#heartbeatWorker').textContent],{type:"text/javascript"});
window.hbw = new Worker(window.URL.createObjectURL(blob1));
window.hbw.postMessage({url: document.location.href, cmd: "importScripts"});
window.P2P_DELAY = 3000;//Arbitrarily set attempt to re-connect in 3 seconds
console.log("Just sent message to heartbeatWorker.");


function pingServer() {
	window.hbw.postMessage({url: document.location.href, cmd: "start"});
	
	window.hbw.onmessage = function(e) {
		console.log("Message received from heartbeatWorker:");
		console.log(e);
		if (e.data == "Server Back Up") {
			window.centralServerUp = true;
			quillEditorDoc = document.getElementsByClassName(".ql-editor");
			if (quillEditorDoc.length > 0) {
				quillEditorDoc[0].setAttribute("contentEditable", false);
				persist(window.ETHERPAD_P2P_PADID);
			}
			location.reload();
		} else if (e.data == "Timeout" || e.data == "Reconnect failed" || e.data == "Disconnect") {//Take it as a network failure and retry I guess?
			setTimeout(function() {
				window.hbw.postMessage({url: document.location.href, cmd: "start"});
			}, window.P2P_DELAY);
		}
	}
}



/*
Workflow:
- When the client-side page detects that it has disconnected from the server, it fires the eejsBlock_disconnected event
- This event then adds the editOfflineButton.ejs to Etherpad's original UI
- At which point, if the user clicks on that button, the method work_offline() of the below variable offlineEdit is called
- workOffline() sets up 2 global variables ETHERPAD_P2P_PADID, and centralServerUp, as well as starting the pingServer() function that will then
	tell the existing WebWorker to begin pinging the server with socket.io to see if it's up
- workOffline() then copies the contents of the current pad, then calls the etherpadToQuill() method on those contents
- The etherpadToQuill() method essentially translates Etherpad's HTML to Quill's HTML structure, then passes the data back to workOffline()
- workOffline() then begins the startP2PEditor() function in yjs_rtf.js that essentially initializes the Quill Editor
- workOffline() then copies the saved contents of the Etherpad document and pastes it into the Quill Editor
- workOffline() then begins the WebWorker that starts persisting the contents of the Quill Editor into localStorage
- Upon the heartbeatWorker (added as inline javascript within index.js) getting a connect or reconnect event from the socket which was trying to 
	connect to the original Etherpad server's URL, it tells the onmessage() function (previously implemented as a handler in pingServer()) that the
	server is back on, and in the handler in pingServer(), if it gets that specific message "Server Back Up", it turns the centralServerUp global
	variable to true so that the persisting WebWorker will stop, then it locks out the user from typing into the Quill Editor anymore, then it persists
	the current changes to memory, then it just reloads the page
- Once the page has been reloaded, our pre-implemented client-side hook documentReady is called (see checkPersist.js), which calls the function loadPersists()
	(STILL TODO!!!) in yjs_rtf.js, which checks if the given padId has an associated value in localStorage, and if so, it translates the HTML persisted string
	into the appropriate HTML structure of Etherpad's UI, and then pastes it into the Etherpad UI, such that the original Etherpad server will get those updates
	made in the temporary P2P network while it was down

Questions:
- There's a function called writeToQuill() in changeFormat.js, but changeFormat.js isn't added anywhere to the page?
	Aditi's Response: don't need changeFormat.js, was just an experimental file
- The appcache manifest file is used to call a file in the case of a disconnect: in our case, it calls the blank.js file to execute in place of
	Etherpad's client-side pad.js, require-kernel.js, and ace2_common.js files, and in blank.js, it essentially just changes the window's URL to point to the 
	offline.ejs rendered HTML file, which was a separate file that was ordered to be cached by the browser via the appcache manifest file (I can see how 
	actually just caching the offline.html file for John McLear's sake would have been easier and then getting his own sandboxed UI that looks like Etherpad's UI 
	but has almost none of the same functionality) -- at which point offline.html just calls offlineEdit.js's load() function to load the stale pad's contents
	into this new html file seamlessly, without the user noticing the change in UI -- BUT, if our plug-in has its own transition process to fire once the
	eejsBlock_disconnect event is fired, why do we need to use John McLear's appcache manifest and offline.html/offline.ejs files in the first place? After all,
	the only reason why the appcache manifest file transitioned to those files in the first place was because the original editOfflineButton.ejs had the following:
	<button id="workoffline" onClick="window.location.href='/'">View local copy</button> --> where by changing onClick the window URL location, it triggered the
	browser itself to detect that the server could not be reached, hence going to the FALLBACK files specified in the appcache manifest file, triggering the entire
	cascade of events just mentioned.
*/

var offlineEdit = {

    // get HTML
    getPadHTML: function(){
      return $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").html();
    },
/*//Don't think we need to use any of these functions at all
//Should be using my persist() function instead?
    // Save pad content to localstorage and to list of pads
    save: function (){
      var pathname = window.location.pathname;
      var padId = pathname.split('/');
      padId = padId[padId.length - 1];

      // when a document is edited it is stored as HTML in an object called padOffline.html
      localStorage.setItem(padId, offlineEdit.getPadHTML());
    },

//Don't think we technically need this
    // Load Pad content from local storage
    load: function(padId){
      // Retrieve the object from storage
      var padContents  = localStorage.getItem(padId);
      return padContents;
    },
//*/
    work_offline: function() {
     var pathname = window.location.pathname;
     var padId = pathname.split('/');
     padId = padId[padId.length - 1];
	 
     window.ETHERPAD_P2P_PADID = padId;//David added this line
	 window.centralServerUp = false;//(will need to be initially set to false once disconnected from server, then set back to true once the server has been detected as back up again)
	 //Youcun's code needs to run before setting up y-js
	 pingServer();
	 //Also, need to modify client-side code on documentReady hook such that loadPersists(somehow get padId from URL like we do here) is called
	 //TODO: finish implementing loadPersists() function
	 
     //offlineEdit.save();//Calls the above function save()//Don't think we technically need this -- just directly pass into etherpadToQuill() the getPadHTML function
        
     q_data = offlineEdit.etherpadToQuill();//modified by David

	 //go through the div tags 
     offlineEdit.stopEtherpad();
	 startP2PEditor(q_data);//David's named function within yjs_rtf.js -- because stopEtherpad() marks Etherpad's original UI as display:none, and our <div> tags are added into the page upon the eejsBlock_body event, 
	 //y-js should then be able to find all these div tags and insert the Quill Editor into them
    },
    
    
    etherpadToQuill: function () {//modified by David
     parser = new DOMParser();
     ep_data = parser.parseFromString(offlineEdit.getPadHTML(), "text/html");//modified by David
     
     var q_data = "";
     if(!ep_data.body.childNodes.length) {
         ep_length = 0;
     } else {
        var ep_length = ep_data.body.childNodes.length;
        var ep_divs = ep_data.body.childNodes;
        for(var i = 0; i < ep_length; i++){
           var text = ep_divs[i].innerText;
           q_data += "<p>" + text + "</p>";
        }
     }
     return q_data;
	},
	
	stopEtherpad: function () {      
       var ql = ["quill-container-p2p-placeholder", "quill-p2p-toolbar", "quill-p2p-editor"];
       var divs = document.body.getElementsByTagName("div");
       for (var i = 0; i < divs.length; i++) {
           if (divs[i].id == ql[0]) {
               continue;
           } else if (divs[i].id == ql[1]) {
               continue;
           } else if (divs[i].id == ql[2]) {
               continue;
           } else {
			   //divs[i].style.display = 'none';
			   divs[i].parentNode.removeChild(divs[i]);
           }
       }
   } 
};

function doWorkOffline() {
	offlineEdit.work_offline();
}
