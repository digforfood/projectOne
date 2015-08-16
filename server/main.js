'use strict'
var WebSocketServer = new require('ws'),
	webSocketServer = new WebSocketServer.Server({port:443});

function gameWorldLoop(){
	setTimeout(gameWorldLoop, 0);
}

function main(){
	gameWorldLoop();
}

main();
