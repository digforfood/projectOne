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
