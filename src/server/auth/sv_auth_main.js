//= sv_auth_c_client.js

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
