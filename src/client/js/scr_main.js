/*
===========================================
SCR_drawField_input
===========================================
*/
function SCR_drawField_input(elem) {
	if (m_position && m_position.id == elem.id) {
		CG_drawRect(elem.x, elem.y, 150, 15, [252, 122, 19]);
	}

	// gl.fillStyle = 'rgb(0, 0, 0)';
	CG_drawString( ((elem.buffer && elem.buffer.length)? elem.buffer : elem.string), elem.x+5, elem.y+8 );
}


/*
===========================================
SCR_drawField_text
===========================================
*/
function SCR_drawField_text(elem) {
	if (m_position && m_position.id == elem.id) {
		CG_drawRect(elem.x, elem.y, 150, 15, [252, 122, 19]);
	}

	// gl.fillStyle = 'rgb(0, 0, 0)';
	CG_drawString(elem.string, elem.x + 5, elem.y + 8);
}


/*
===========================================
SCR_drawField_button
===========================================
*/
function SCR_drawField_button(elem) {
	if (sys_state.game == G_STATE_DISCONNECTED) {
		CG_drawRect(elem.x, elem.y, 150, 15, [106, 121, 137]);
	}
	else{
		CG_drawRect(elem.x, elem.y, 150, 15, [252, 2, 2]);
	}

	CG_drawString(elem.string, elem.x+5, elem.y+8);
}


/*
===========================================
SCR_drawLoadScreen
===========================================
*/
function SCR_drawLoadScreen() {
	var loadStatus = SYS_checkResources();

	CG_drawRect(10, scr_height - 30, (scr_width-20)*loadStatus/100, 20, [255, 255, 255]);


	if (loadStatus != 100)
		return;

	CG_setTextures();

	////////////////////TO DO////////////////////	
	if (sys_state.game === G_STATE_INTRO_LOADING) {
		// sys_state.pushStateG(G_STATE_CONNECTING);
		sys_state.pushStateG(G_STATE_DISCONNECTED);
		sys_state.pushStateM(M_STATE_LOCK);
		NET_connect();
	}
	else {
		sys_state.pushStateG(G_STATE_RUN);
	}
	////////////////////TO DO////////////////////
}


/*
===========================================
SCR_drawMenu_lock
===========================================
*/
function SCR_drawMenu_lock() {
	// gl.fillStyle = 'rgb(136, 197, 198)';		// background
	// gl.fillRect (0, 0, scr_width, scr_height); //
	CG_drawRect(0, 0, scr_width, scr_height, [136, 197, 198]);

	for (var i = 0; i < m_active.items.length; i++) {
		if (m_active.items[i].type == MTYPE_INPUT) {
			SCR_drawField_input(m_active.items[i]);
		}
		else if (m_active.items[i].type == MTYPE_BUTTON) {
			SCR_drawField_button(m_active.items[i]);
		}
	}
}


/*
===========================================
SCR_drawMenu_main
===========================================
*/
function SCR_drawMenu_main() {
	// gl.fillStyle = 'rgb(136, 197, 198)';		// background
	// gl.fillRect (0, 0, scr_width, scr_height); //
	CG_drawRect(0, 0, scr_width, scr_height, [136, 197, 198]);

	for (var i = 0; i < m_active.items.length; i++) {
		SCR_drawField_text(m_active.items[i]);
	}
}

/*
===========================================
SCR_drawMenu_options
===========================================
*/
function SCR_drawMenu_options() {
	// gl.fillStyle = 'rgb(136, 197, 198)';		// background
	// gl.fillRect (0, 0, scr_width, scr_height); //
	CG_drawRect(0, 0, scr_width, scr_height, [136, 197, 198]);

	for (var i = 0; i < m_active.items.length; i++) {
		SCR_drawField_text(m_active.items[i]);
	}
}


/*
===========================================
SCR_drawMenu
===========================================
*/
function SCR_drawMenu() {
	if (sys_state.menu === M_STATE_NONE) {
		return;
	}
	else if (sys_state.menu === M_STATE_LOCK) {
		SCR_drawMenu_lock();
	}
	else if (sys_state.menu === M_STATE_MAIN) {
		SCR_drawMenu_main();
	}
	else if (sys_state.menu === M_STATE_OPTIONS) {
		SCR_drawMenu_options();
	}
}


/*
===========================================
SCR_drawFPS
===========================================
*/
function SCR_drawFPS() {
	if (sys_state.game === G_STATE_INTRO_LOADING) {
		return;
	}

	thisfpstime = new Date();
	if ((thisfpstime - lastfpstime) >= 1000) {
		lastfps = fps_count;
		fps_count = 0;
		lastfpstime = thisfpstime;
	}
	// gl.font = '12px serif';
	// gl.fillStyle = 'rgb(0, 0, 0)';
	CG_drawString('FPS: ' + lastfps, canvas.width - 75, 17, 10);
	CG_drawString('m_x: ' + mouse_x, canvas.width - 75, 29, 10);
	CG_drawString('m_y: ' + mouse_y, canvas.width - 75, 41, 10);
	CG_drawString('m_b: ' + keyEvents['m_b'], canvas.width - 75, 53, 10);
	fps_count++;
}


/*
===========================================
SCR_drawСursor
===========================================
*/
function SCR_drawСursor() {
	if (sys_state.game === G_STATE_INTRO_LOADING) {
		return;
	}

	CG_drawPic(cg_glTextures['cursor'], mouse_x, mouse_y, 16, 16);
	// To do draw cursor
	// gl.drawImage(cgs.sprites.cursor, 3, 0, 13, 16, mouse_x, mouse_y, 13, 16);
}
