//= sv_auth_h.js

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
