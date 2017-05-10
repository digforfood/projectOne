'use strict'
var WebSocketServer = require('ws').Server,
	webSocketServer,
	currFrameTime,
	prevFrameTime,
	deltaFrameTime,

	playerId,
	players;

//= sv_c_player.js
//= sv_db.js
//= sv_message.js
//= sv_wss.js


/*
===========================================
frame
===========================================
*/
function frame(){
	prevFrameTime = currFrameTime;
	currFrameTime = new Date();
	deltaFrameTime = currFrameTime - prevFrameTime;

	//
}


/*
===========================================
gameWorldLoop
===========================================
*/
function gameWorldLoop(){
	frame();

	setTimeout(gameWorldLoop, 0);
}


/*
===========================================
main
===========================================
*/
function main(){
	currFrameTime = new Date();
	playerId = 0;
	players = {};

	SV_wssInit();

	//gameWorldLoop();
}

main();
