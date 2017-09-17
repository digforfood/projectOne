//= sv_auth_h.js

/*
===========================================
SV_authTick
===========================================
*/
function SV_authTick(){
	if(!authNewClients.length)
		return;

	for (var i = 0; i < authNewClients.length; i++) {
		// Do client = new Client(authNewClients[i]);
		// authClients.push(client);
	}

	authNewClients = [];
}


/*
===========================================
SV_authTick
===========================================
*/
function SV_authLoop(){
	SV_authTick();

	setTimeout(SV_authLoop, 100);
}


/*
===========================================
SV_authInit
===========================================
*/
function SV_authInit(){
	authNewClients = [];
	authClients = [];

	SV_authLoop();
}
