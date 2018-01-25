'use strict'
var WebSocketServer = require('ws').Server,
	webSocketServer,
	currFrameTime,
	prevFrameTime,
	deltaFrameTime,

	newClients,

	playerId,
	players,
	
	sv_auth;

/*
===========================================
SV_Client
===========================================
*/
class SV_Client {

	constructor(client) {
		this.token = null;
		this.client = client;
		this.msgIn = [];
		this.msgOut = [];
		this.quit = false;
		this.client.cAuth = this;

		this.client.onmessage = function (event) {
			this.cAuth.msgIn.push(event.data);
		};
		this.client.onclose = function (event) {
			this.cAuth.quit = true;
		};
	}
}

class Auth {

	/*
	===========================================
	Auth::Auth
	===========================================
	*/
	constructor(l_gameClients) {
		this.authNewClients = [];
		this.authClients = [];

		this.gameClients = l_gameClients;
	}


	/*
	===========================================
	Auth::checkNewClients
	===========================================
	*/
	checkNewClients() {
		if (!this.authNewClients.length)
			return;

		var client = {},
			len = this.authNewClients.length,
			i;

		for (i = 0; i < len; i++) {
			client = new SV_Client(this.authNewClients.shift());

			this.authClients.push(client);

			if (i === 16)
				return;
		}
	}


	/*
	===========================================
	Auth::handleClientMessages
	===========================================
	*/
	handleClientMessages() {
		if (!this.authClients.length)
			return;

		var messages = [],
			clients = [];

		for (var i = 0; i < this.authClients.length; i++) {
			messages = this.authClients[i].msgIn;

			for (var j = 0; j < messages.length; j++) {
				// console.log(messages[i]);
				this.authClients[i].quit = true;
			}

			this.authClients[i].msgIn = [];

			if (this.authClients[i].quit) {
				this.authClients[i].token = Date.now();

				this.gameClients.push(this.authClients[i]);
			}
			else {
				clients.push(this.authClients[i]);
			}
		}

		this.authClients = clients;
	}


	/*
	===========================================
	Auth::Tick
	===========================================
	*/
	Tick() {
		this.checkNewClients();

		this.handleClientMessages();

		// SV_authSendClientMessages();
	}


	/*
	===========================================
	Auth::Loop
	===========================================
	*/
	Loop() {
		this.Tick();

		setTimeout(() => {this.Loop()}, 100);
	}


	/*
	===========================================
	Auth::Init
	===========================================
	*/
	Init() {
		this.authNewClients = [];
		this.authClients = [];

		this.Loop();
	}
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
	sv_auth.authNewClients.push(client);
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
	sv_auth = new Auth(newClients);

	sv_auth.Init();

	SV_wssInit();

	gameWorldLoop();
}

main();