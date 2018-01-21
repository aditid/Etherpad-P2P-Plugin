/*function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function timedSleep(ms) {
	console.log('Taking a break...');
	await sleep(ms);
	console.log('Two second later');
}*/

exports.checkPersist = function (hook_name, args, cb) {
  console.log("Checking if there are persisted changes for this pad...");
  var pathname = window.location.pathname;
  var thisPadId = pathname.split('/');
  thisPadId = thisPadId[thisPadId.length - 1];
  $(document).ready(function() {
	  //console.log("Document ready.");
	  $(window.frames["ace_outer"].document).ready(function() {
		  //console.log("ace_outer ready.");
		  $(window.frames["ace_outer"].document.getElementsByName("ace_inner")[0].document).ready(function() {
			  //console.log("ace_inner ready.");
			  loadPersists(thisPadId);
		  });
	  });
  });
}