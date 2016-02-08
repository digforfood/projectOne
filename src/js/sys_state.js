/*
===========================================
CLASS SYS_State
===========================================
*/
function SYS_State(ent_g, ent_m){
	this.game = ent_g;
	this.g_stateStack = [];

	this.menu = ent_m;
	this.m_stateStack = [];

	this.switchState = function(){
		if(this.g_stateStack.length > 0){
			this.game = this.g_stateStack[0];
			if(this.game == G_STATE_DISCONNECTED || this.game == G_STATE_CONNECTING)
				m_active = ui_s_lock;
			else if(this.game == G_STATE_CONNECTED)
				this.pushStateM(M_STATE_MAIN);
			this.g_stateStack = [];
		}
		if(this.m_stateStack.length > 0){
			this.menu = this.m_stateStack[0];
			if(this.menu == M_STATE_NONE)
				m_active = {};
			else if(this.menu == M_STATE_MAIN)
				m_active = ui_s_m_main;
			else if(this.menu == M_STATE_OPTIONS)
				m_active = ui_s_m_options;
			this.m_stateStack = [];
		}
	};

	this.pushStateG = function(state){
		this.g_stateStack = [state];
	};

	this.pushStateM = function(state){
		this.m_stateStack = [state];
	};
}
