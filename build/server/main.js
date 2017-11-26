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

var
	authClients;

/*
===========================================
SV_authCheckNewClients
===========================================
*/
function SV_authCheckNewClients() {
	if (!authNewClients.length)
		return;

	var client = {},
		len = authNewClients.length,
		i;

	for (i = 0; i < len; i++) {
		client = new Client(authNewClients.shift());

		authClients.push(client);

		if (i === 16)
			return;
	}
}


/*
===========================================
SV_authTick
===========================================
*/
function SV_authTick() {
	SV_authCheckNewClients();

	// SV_authSendClientMessages();
}


/*
===========================================
SV_authTick
===========================================
*/
function SV_authLoop() {
	SV_authTick();

	setTimeout(SV_authLoop, 100);
}


/*
===========================================
SV_authInit
===========================================
*/
function SV_authInit() {
	authNewClients = [];
	authClients = [];

	SV_authLoop();
}
/*
===========================================
SV_Player
===========================================
*/
function SV_Player(id) {
	this.id = id;
	this.socket = {};
	this.msgIn = [];
	this.msgOut = [];
	this.quit = true;
}
////////////////////_DB_////////////////////
var db = {'users':[
		{
			'login': '',
			'pass': ''
		},
		{
			'login': '',
			'pass': ''
		}
	]};
////////////////////_DB_////////////////////
/*
===========================================
SV_messageHandler
===========================================
*/
function SV_messageHandler(data) {
	console.log(data);
	// var msg = {'m': [{'t': 2, 'b': {'k': 112233, 's': 2}}]};
	// this.send(JSON.stringify(msg), function() { /* ignore errors */ });
}
/*
===========================================
SV_wssConnectionHandler
===========================================
*/
function SV_wssConnectionHandler(client) {
	// var player = new SV_Player(playerId++);

	// client.player = player;
	// client.onmessage = function(event) { this.player.msgIn.push(event.data); };
	// client.onclose = function(event) { this.player.quit = true; };

	// player.socket = client;
	// players[player.id] = player;

	authNewClients.push(client);
}


/*
===========================================
SV_wssInit
===========================================
*/
function SV_wssInit() {
	webSocketServer = new WebSocketServer({port: 443});

	webSocketServer.on('connection', SV_wssConnectionHandler);
}


/*
===========================================
frame
===========================================
*/
function frame() {
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
	currFrameTime = new Date();
	playerId = 0;
	players = {};
	newClients = [];

	SV_authInit();

	SV_wssInit();

	//gameWorldLoop();
}

main();