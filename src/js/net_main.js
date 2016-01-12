/*
===========================================
NET_init
===========================================
*/
function NET_init(){
	////////////////////TO DO NET////////////////////
	socket = new WebSocket("ws://devhub.mrdoe.ru:443");
	socket.onopen = function(){
		sys_state.pushStateG(G_STATE_CONNECTING);
		console.log('onopen');
	};
	socket.onclose = function(ent){
		sys_state.pushStateG(G_STATE_DISCONNECTED);
		console.log('onclose');
	};
	socket.onmessage = function(ent){
		console.log(ent.data);
	};
	socket.onerror = function(ent){
		sys_state.pushStateG(G_STATE_DISCONNECTED);
		console.log('onerror');
	};
	////////////////////TO DO NET////////////////////


	////////////////////TO DO NET////////////////////
	//sys_state.pushStateG(G_STATE_CONNECTING);
	////////////////////TO DO NET////////////////////
}
