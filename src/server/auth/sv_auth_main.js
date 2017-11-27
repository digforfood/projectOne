//= sv_auth_h.js
//= sv_auth_c_client.js

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
