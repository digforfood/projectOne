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
SV_Client
===========================================
*/
function SV_Client(client) {
	this.token = null;
	this.client = client;
	this.msgIn = [];
	this.msgOut = [];
	this.quit = false;
	this.client.cAuth = this;

	this.client.onmessage = function(event) {
		this.cAuth.msgIn.push(event.data);
	};
	this.client.onclose = function(event) {
		this.cAuth.quit = true;
	};
}

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
		client = new SV_Client(authNewClients.shift());

		authClients.push(client);

		if (i === 16)
			return;
	}
}


/*
===========================================
SV_authHandleClientMessages
===========================================
*/
function SV_authHandleClientMessages() {
	if (!authClients.length)
		return;

	var messages = [],
		clients = [];

	for (var i = 0; i < authClients.length; i++) {
		messages = authClients[i].msgIn;

		for (var j = 0; j < messages.length; j++) {
			// console.log(messages[i]);
			authClients[i].quit = true;
		}

		authClients[i].msgIn = [];

		if (authClients[i].quit) {
			authClients[i].token = Date.now();

			newClients.push(authClients[i]);
		}
		else {
			clients.push(authClients[i]);
		}
	}

	authClients = clients;
}


/*
===========================================
SV_authTick
===========================================
*/
function SV_authTick() {
	SV_authCheckNewClients();

	SV_authHandleClientMessages();

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
function SV_Player(data) {
	this.id = Date.now();
	this.token = data.token;
	this.socket = data.client;
	this.msgIn = [];
	this.msgOut = [];
	this.quit = false;

	this.socket.player = this;

	this.socket.onmessage = function (event) {
		this.player.msgIn.push(event.data);
	};
	this.socket.onclose = function (event) {
		this.player.quit = true;
	};
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