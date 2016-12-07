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

	net_buf = {auth: {}, ev: [], mouse: ''};
	net_buf.auth.name = '';
	net_buf.auth.pass = '';
	net_buf.auth.isready = false;
}

/*
===========================================
NET_connect
===========================================
*/
function NET_connect(){
	// socket = new WebSocket("ws://devhub.mrdoe.ru:443");
	socket = new WebSocket("ws://localhost:443");

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
}
