//console.log("This is in yjs_rtf.js...");
function loadQuill() {
Y({
  db: {
	name: 'memory' // use memory database adapter.
	// name: 'indexeddb' // use indexeddb database adapter instead for offline apps
  },
  connector: {
	name: 'webrtc', // use webrtc connector
	// name: 'websockets-client'
	// name: 'xmpp'
	room: 'my-room-etherpad-p2p-rtf-quill' // clients connecting to the same room share data 
  },
  sourceDir: '/static/plugins/ep_peer/static/backup/bower_components', // location of the y-* modules (browser only)
  share: {
	richtext: 'Richtext'
  }
}).then(function (y) {
  console.log("Now creating Quill Editor...")
  window.yquill = y
  
  var toolbarOptions = [['bold', 'italic', 'underline']];
  // create quill element
  window.quill = new Quill('#editor', {
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
      'toolbar': toolbarOptions
    },
    theme: 'snow'
  })
  console.log("Now binding Quill Editor...")
  // bind quill to richtext type
  y.share.richtext.bindQuill(window.quill)
})
};