'use strict'
var WebSocketServer = require('ws').Server,
	webSocketServer,
	currFrameTime,
	prevFrameTime,
	deltaFrameTime,

	playerId,
	players;

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
function SV_messageHandler(data){
	console.log(data);
	// var msg = {'m': [{'t': 2, 'b': {'k': 112233, 's': 2}}]};
	// this.send(JSON.stringify(msg), function(){ /* ignore errors */ });
}
/*
===========================================
SV_wssConnectionHandler
===========================================
*/
function SV_wssConnectionHandler(client){
	// console.log(client);
	var id = playerId++,
		player = {};

	client.on('message', SV_messageHandler);

	client.on('close', function(){
		player.quit = true;
	});

	player.socket = client;
	players[id] = player;
}


/*
===========================================
SV_wssInit
===========================================
*/
function SV_wssInit(){
	webSocketServer = new WebSocketServer({port: 443});

	webSocketServer.on('connection', SV_wssConnectionHandler);
}


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