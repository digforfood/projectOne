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
