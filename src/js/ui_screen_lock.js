/*
===========================================
UI_lockScreen_connectAction
===========================================
*/
function UI_lockScreen_connectAction(){
	if(sys_state.game != G_STATE_DISCONNECTED){
		sys_state.pushStateG(G_STATE_CONNECTED);
		sys_state.pushStateM(M_STATE_MAIN);
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
