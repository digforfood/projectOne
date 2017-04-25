/*
===========================================
CL_createPacket
===========================================
*/
function CL_createPacket(){
	var msg = [];

	if(net_buf.auth.isready){
		msg[0] = MSG_CL_LOGIN;
		msg[1] = {n: net_buf.auth.name, p: net_buf.auth.pass};

		net_buf.auth.name = '';
		net_buf.auth.pass = '';
		net_buf.auth.isready = false;
	}
	else {
		msg[0] = MSG_CL_DATA;
		msg[1] = net_clKey;

		if(net_buf.ev.length > 0){
			// for(var i=0; i<evBufLen; i++){
			// 	msg.b['e'].push(net_buf.ev[i]);
			// }

			net_buf.ev = [];
		}

		if(net_buf.mouse.length > 0){
			// msg.b['m'] = net_buf.mouse;

			net_buf.mouse = '';
		}
	}


	if(!msg.length)
		return;

	console.log('NET send msg: ', msg); // To do NET send msg
	NET_sendPacket(msg);

	net_lastPacketSentTime = correntTime;
}


/*
===========================================
CL_sendCmd
===========================================
*/
function CL_sendCmd(){
	if (sys_state.game == G_STATE_INTRO_LOADING)
		return;

	if (sys_state.game == G_STATE_DISCONNECTED)
		return;

	if (sys_state.game == G_STATE_CONNECTING && !net_buf.auth.isready)
		return;

	if (sys_state.menu != M_STATE_NONE && correntTime - net_lastPacketSentTime < 1000)
		return;

	CL_createPacket();
}
