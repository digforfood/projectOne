/*
===========================================
UI_lockScreen_connectAction
===========================================
*/
function UI_lockScreen_connectAction(){
	if(sys_state.game != G_STATE_DISCONNECTED){
		if(net_clKey != null){
			net_logInMsg['k'] = net_clKey;
		} else {
			net_logInMsg['n'] = ui_s_lock.items[0].buffer;
			net_logInMsg['p'] = ui_s_lock.items[1].buffer;
		}

		CL_createPacket();
	}
}


ui_s_lock = {

///////////////////////////////
//LOCK SCREEN
///////////////////////////////
	string: 'LOGIN',
	items: [
		{
			type: MTYPE_INPUT,
			id: 10,
			x: 20,
			y: 20,
			width: 150,
			height: 20,
			string: 'Login',
			buffer: ''
		},
		{
			type: MTYPE_INPUT,
			id: 11,
			x: 20,
			y: 40,
			width: 150,
			height: 20,
			string: 'Password',
			buffer: ''
		},
		{
			type: MTYPE_BUTTON,
			id: 12,
			x: 20,
			y: 60,
			width: 150,
			height: 20,
			string: 'Connect',
			onclick: UI_lockScreen_connectAction
		}
	]

};
