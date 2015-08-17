'use strict'
var WebSocketServer = new require('ws'),
	webSocketServer = new WebSocketServer.Server({port:443}),
	currFrameTick = new Date(),
	prevFrameTick,
	deltaFrameTick;


/*
==============
gameWorldLoop
==============
*/
function gameWorldLoop(){
	prevFrameTick = currFrameTick;
	currFrameTick = new Date();
	deltaFrameTick = currFrameTick - prevFrameTick;

	setTimeout(gameWorldLoop, 0);
}


/*
==============
main
==============
*/
function main(){
	gameWorldLoop();
}

main();
