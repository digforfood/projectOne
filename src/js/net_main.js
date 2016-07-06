/*
===========================================
NET_sendPacket
===========================================
*/
function NET_sendPacket(data){
	socket.send(JSON.stringify(data));
}


/*
===========================================
NET_init
===========================================
*/
function NET_init(){
	net_clKey = parseInt(localStorage['net_clKey']) || null;
	net_inPackets = [];
	net_buf = {ev: [], mouse: ''};
	socket = new WebSocket("ws://devhub.mrdoe.ru:443");

	socket.onopen = function(){
		console.log('onopen');

		sys_state.pushStateG(G_STATE_CONNECTING);
	};

	socket.onclose = function(ent){
		console.log('onclose');

		sys_state.pushStateG(G_STATE_DISCONNECTED);
	};

	socket.onmessage = function(ent){
		console.log(ent.data);

		net_inPackets.push(JSON.parse(ent.data));
	};

	socket.onerror = function(ent){
		console.log('onerror');

		sys_state.pushStateG(G_STATE_DISCONNECTED);
	};


	////////////////////TO DO NET////////////////////
	//sys_state.pushStateG(G_STATE_CONNECTING);
	////////////////////TO DO NET////////////////////
}
