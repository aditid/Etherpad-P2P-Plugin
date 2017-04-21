


function getDataEtherpad() {
	return document.getElementById("innerdocbody");
}
                                   

function EtherpadToQuill(ep_data) {
    var q_data = "";
    for(var i = 0; i < ep_data.length; i++){
        var text = ep_data.innerText;
        q_data += "<p>" + text + "<\p>";
    }
    return q_data;
}
        
        
function writeToQuill(q_data) {
    var first = '<div class="ql-editor" contenteditable="true" data-placeholder="Compose an epic...">';
    var divTotal = first + q_data + "<\div>"
    document.getElementById("editor-container") = divTotal;
}                                       
                                   

                    


