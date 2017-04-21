var offlineEdit = {

  // get HTML
  getPadHTML: function(){
    return $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").html();
  },

  // Save pad content to localstorage and to list of pads
  save: function (){
    var pathname = window.location.pathname;
    var padId = pathname.split('/');
    padId = padId[padId.length - 1];

    // when a document is edited it is stored as HTML in an object called padOffline.html
    localStorage.setItem(padId, offlineEdit.getPadHTML());

    // Now we extend the pads object with this pad data
    var pads = localStorage.getItem("pads"); // Get it 
    if(!pads){pads = "{}"}; // if pad object doesnt exist then create it
    pads = JSON.parse(pads); // Either way we have a string that needs parsing
    pads[padId] = {
      timestamp: new Date() // Save a timestamp
    }
    pads = JSON.stringify(pads); // Make it a string
    localStorage.setItem('pads', pads); // Save it to localstorage
  },

  // Load Pad content from local storage
  load: function(padId){
    // Retrieve the object from storage
    var padContents  = localStorage.getItem(padId);
    return padContents;
  },

  // Load all available pads from local storage
  loadPads: function(){
    var pads = JSON.parse(localStorage.getItem("pads")); 
    return pads;
  },

  listPads: function(){
    var pads = offlineEdit.loadPads();
    for (var key in pads){
      var pad = "<div><span id='padId'><b><a class='padIdLink'>"+key+"</a></b></span>";
      var obj = pads[key];
      for (var prop in obj){

        if(prop == "timestamp"){
          pad += "<span id='timestamp'> Last edited <time class='timeago' datetime='"+obj[prop]+"'></time></span>";
        }else{
          pad += obj[prop];
        }
      }
      pad += "</div>";
      $('#pads').append(pad);
    }
  },


    work_offline: function() {
     var pathname = window.location.pathname;
     var padId = pathname.split('/');
     padId = padId[padId.length - 1];
    
     offlineEdit.save();
        
     q_data = offlineEdit.etherpadToQuill(padId)
     
     //go through the div tags 
     offlineEdit.stopEtherpad();
    },
    
    
    etherpadToQuill: function (padId) {
     parser = new DOMParser();
     ep_data = parser.parseFromString(offlineEdit.load(padId), "text/html");     
     
     var q_data = "";
     if(!ep_data.body.childNodes.length) {
         ep_length = 0;
     } else {
        var ep_length = ep_data.body.childNodes.length;
        var ep_divs = ep_data.body.childNodes;
        for(var i = 0; i < ep_length; i++){
           var text = ep_divs[i].innerText;
           q_data += "<p>" + text + "<\p>";
        }
     }
     return q_data;
    },
    
    
    stopEtherpad: function () {       
        var divs = document.body.getElementsByTagName("div");
        for (var i = 0; i < divs.length; i++) {
            divs[i].style.display = 'none';        
        }
    }

    
};
