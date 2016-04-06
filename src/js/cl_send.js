/*
===========================================
CL_createPacket
===========================================
*/
function CL_createPacket(ent){
	var msg = {t: 0, b: {}},
		evBufLen = net_buf.ev.length;

	if(ent != undefined){
		msg.t = MSG_CL_LOGIN;
		msg.b = ent;
	}
	else if(net_clKey != null){
		msg.t = MSG_CL_DATA;
		msg.b['k'] = net_clKey;

		if(evBufLen > 0){
			msg.b['e'] = [];

			for(var i=0; i<evBufLen; i++){
				msg.b['e'].push(net_buf.ev[i]);
			}

			net_buf.ev = [];
		}

		if(net_buf.mouse.length>0){
			msg.b['m'] = net_buf.mouse;
			net_buf.mouse = '';
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
