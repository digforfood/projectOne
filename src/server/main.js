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

//= auth/sv_auth_main.js
//= sv_c_player.js
//= sv_db.js
//= sv_message.js
//= sv_wss.js


/*
===========================================
SV_checkNewClients
===========================================
*/
function SV_checkNewClients() {
	if (!newClients.length)
		return;

	var player = {},
		len = newClients.length,
		i;

	for (i = 0; i < len; i++) {
		player = new SV_Player(newClients.shift());

		player.msgOut.push({t: 2, b: {k: player.token, s: 3}});

		players[player.id] = player;
	}
}


/*
===========================================
SV_sendClientMessages
===========================================
*/
function SV_sendClientMessages() {
	var messages = [];

	for (var key in players) {
		messages = players[key].msgOut;

		if (messages.length) {
			console.log('S ', messages);
			players[key].socket.send(
				JSON.stringify(messages),
				() => { /* ignore errors */ }
			);

			players[key].msgOut = [];
		}
	}
}


/*
===========================================
frame
===========================================
*/
function frame() {
	prevFrameTime = currFrameTime;
	currFrameTime = Date.now();
	deltaFrameTime = currFrameTime - prevFrameTime;

	// check for new clients
	SV_checkNewClients();

	// read client messages
	//SV_runClients();

	//SV_physics();

	SV_sendClientMessages();
}


/*
===========================================
gameWorldLoop
===========================================
*/
function gameWorldLoop() {
	frame();

	setTimeout(gameWorldLoop, 0);
}


/*
===========================================
main
===========================================
*/
function main() {
	currFrameTime = Date.now();
	playerId = 0;
	players = {};
	newClients = [];

	SV_authInit();

	SV_wssInit();

	gameWorldLoop();
}

main();
