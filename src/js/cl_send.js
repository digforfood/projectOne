/*
===========================================
CL_createPacket
===========================================
*/
function CL_createPacket(obj){
	var msg = {};

	if(obj != undefined){
		msg['li'] = obj;
	}
	else if(net_clKey != null){
		msg['k'] = net_clKey;

		// To do create packet
		// To do create packet
		// To do create packet
		// To do create packet
		// To do create packet
		// To do create packet
		// To do create packet
		// To do create packet
	}
	else
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
	if (sys_state.game == G_STATE_DISCONNECTED && sys_state.game == G_STATE_CONNECTING)
		return;

	if (sys_state.menu != M_STATE_NONE && correntTime - net_lastPacketSentTime < 1000)
		return;

	CL_createPacket();
}
