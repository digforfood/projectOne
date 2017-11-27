/*
===========================================
SV_Player
===========================================
*/
function SV_Player(data) {
	this.id = Date.now();
	this.token = data.token;
	this.socket = data.client;
	this.msgIn = [];
	this.msgOut = [];
	this.quit = false;

	this.socket.player = this;

	this.socket.onmessage = function (event) {
		this.player.msgIn.push(event.data);
	};
	this.socket.onclose = function (event) {
		this.player.quit = true;
	};
}
