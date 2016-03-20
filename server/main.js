'use strict'
var WebSocketServer = new require('ws'),
	webSocketServer = new WebSocketServer.Server({port:443}),
	currFrameTick = new Date(),
	prevFrameTick,
	deltaFrameTick,

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
	playerId = 0;
	players = {};

	webSocketServer.on('connection', function(client){
		var id = playerId++;
		var player = {};
		player.socket = client;
		players[id] = player;

		player.socket.on('message', function(message){
			console.log(message);
			var msg = {'m': [{'t': 2, 'd': {'k': 112233, 's': 2}}]};
			this.send(JSON.stringify(msg), function(){ /* ignore errors */ });
		});

		player.socket.on('close', function(){
			player.quit = true;
		});
	});

	gameWorldLoop();
}

main();
