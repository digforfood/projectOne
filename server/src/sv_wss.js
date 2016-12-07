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
