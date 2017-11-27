/*
===========================================
SV_Client
===========================================
*/
function SV_Client(client) {
	this.token = null;
	this.client = client;
	this.msgIn = [];
	this.msgOut = [];
	this.quit = false;
	this.client.cAuth = this;

	this.client.onmessage = function(event) {
		this.cAuth.msgIn.push(event.data);
	};
	this.client.onclose = function(event) {
		this.cAuth.quit = true;
	};
}
