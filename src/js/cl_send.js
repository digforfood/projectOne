/*
===========================================
CL_createPacket
===========================================
*/
function CL_createPacket(ent){
	var msg = {t: 0, b: {}},
		bufLen = net_evBuf.length;

	if(ent != undefined){
		msg.t = 0;
		msg.b = ent;
	}
	else if(net_clKey != null){
		msg.t = 1;
		msg.b['k'] = net_clKey;

		if(bufLen > 0){
			msg.b['e'] = [];

			for(var i=0; i<bufLen; i++){
				msg.b['e'].push(net_evBuf[i]);
			}
			// To do create packet
		}		
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
