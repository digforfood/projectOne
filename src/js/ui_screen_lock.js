/*
===========================================
UI_lockScreen_connectAction
===========================================
*/
function UI_lockScreen_connectAction(){
	if(sys_state.game != G_STATE_DISCONNECTED){
		var data = {};

		if(net_clKey != null){
			data['k'] = net_clKey;
		} else {
			data['n'] = ui_s_lock.items[0].buffer;
			data['p'] = ui_s_lock.items[1].buffer;
		}

		CL_createPacket(data);
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
