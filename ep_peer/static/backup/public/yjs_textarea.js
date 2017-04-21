Y({
  db: {
	name: 'memory' // use memory database adapter.
	// name: 'indexeddb' // use indexeddb database adapter instead for offline apps
  },
  connector: {
	name: 'webrtc', // use webrtc connector
	// name: 'websockets-client'
	// name: 'xmpp'
	room: 'my-room-etherpad-p2p' // clients connecting to the same room share data 
  },
  sourceDir: '/bower_components', // location of the y-* modules (browser only)
  share: {
	textarea: 'Text' // y.share.textarea is of type y-text
  }
}).then(function (y) {
  // The Yjs instance `y` is available
  // y.share.* contains the shared types

  // Bind `y.share.textarea` to `<textarea/>`
  y.share.textarea.bind(document.getElementById('textfield'))
})