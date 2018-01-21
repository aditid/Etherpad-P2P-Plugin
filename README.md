# Etherpad-P2P-Plugin


Starting up Etherpad-lite:
From https://github.com/ether/etherpad-lite

1. Install dependencies
	brew install ___
	
	gzip, git, curl, python, libssl develop libraries
	nodejs

2. git clone git://github.com/ether/etherpad-lite.git

3. cd etherpad-lite
	and run:	 bin/run.sh

4. To test, open in:	 http://127.0.0.1:9001 

5. Then exit and change settings
	vim settings.json

6. Change defaultPadText to:
 	"defaultPadText" : "Welcome\n",

7. Disable Authorship
	in Default Pad behavior
	“noColors”: false, —> set to true
	
8. Stop minifying all css and js
	in Minify
	"minify" : true, —> set to false

9. Set up admin
	Users for basic authentication
	set admin password to “root”

10. Save file and exit (:wq)

11. Run etherpad again		bin/run.sh

12. go to http://127.0.0.1:9001/admin/ for further settings changes












