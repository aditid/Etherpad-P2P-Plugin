

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



var offlineEdit = {

    // get HTML
    getPadHTML: function(){
      return $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").html();
    },
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
