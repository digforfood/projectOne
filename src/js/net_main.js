/*
===========================================
NET_init
===========================================
*/
function NET_init(){
	socket = new WebSocket("ws://localhost:443");
	socket.onopen = function(){
		//console.log('onopen');
	};
	socket.onclose = function(ent){
		//console.log('onclose');
	};
	socket.onmessage = function(ent){
		//console.log(ent.data);
	};
	socket.onerror = function(ent){
		//console.log('onerror');
	};
}