/*
===========================================
CL_createPacket
===========================================
*/
function CL_createPacket(){
	var msg = {};

	if(Object.keys(net_logInMsg).length > 0){
		msg['li'] = net_logInMsg;

		net_logInMsg = {};

		////////////////////TEST////////////////////
		net_inPackets.push({'m': [{'t': MSG_GAMESTATE, 'd': {'k': 112233, 's': G_STATE_CONNECTED}}]});
		////////////////////TEST////////////////////
	}
	else if(net_clKey != null){
		msg['k'] = net_clKey;

		// To do create packet
	}
	else
		return;

	// To do NET send msg
	console.log('NET send msg: ', msg);
}


/*
===========================================
CL_sendCmd
===========================================
*/
function CL_sendCmd(){
	if (sys_state.game == G_STATE_DISCONNECTED)
		return;

	CL_createPacket();
}
