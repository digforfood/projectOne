/*
===========================================
UI_mainMenu_startAction
===========================================
*/
function UI_mainMenu_startAction(){
	CL_loadThreads();
	sys_state.pushStateG(G_STATE_LOADING);
	sys_state.pushStateM(M_STATE_NONE);
}


/*
===========================================
UI_mainMenu_optionsAction
===========================================
*/
function UI_mainMenu_optionsAction(){
	sys_state.pushStateM(M_STATE_OPTIONS);
}


ui_s_m_main = {
///////////////////////////////
//MAIN MENU
///////////////////////////////
string: 'MAIN',
items: [
		{
			type: MTYPE_TEXT,
			id: 20,
			x: 20,
			y: 20,
			width: 150,
			height: 20,
			string: 'Start',
			onclick: UI_mainMenu_startAction
		},
		{
			type: MTYPE_TEXT,
			id: 21,
			x: 20,
			y: 40,
			width: 150,
			height: 20,
			string: 'Options',
			onclick: UI_mainMenu_optionsAction
		}
	]
};
