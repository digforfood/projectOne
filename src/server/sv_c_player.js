/*
===========================================
SV_Player
===========================================
*/
function SV_Player(id) {
	this.id = id;
	this.socket = {};
	this.msgIn = [];
	this.msgOut = [];
	this.quit = true;
}
