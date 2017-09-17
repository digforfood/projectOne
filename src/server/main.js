'use strict'
var WebSocketServer = require('ws').Server,
	webSocketServer,
	currFrameTime,
	prevFrameTime,
	deltaFrameTime,

	authNewClients,
	newClients,

	playerId,
	players;

//= sv_auth_main.js
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

	// check for new clients
	SV_checkNewClients();

	// read client messages
	SV_runClients();

	SV_physics();

	SV_sendClientMessages();
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
	newClients = [];

	SV_authInit();

	SV_wssInit();

	//gameWorldLoop();
}

main();
