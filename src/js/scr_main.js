/*
===========================================
SCR_drawField_input
===========================================
*/
function SCR_drawField_input(elem){
	if (m_position && m_position.id == elem.id) {
		ctx.fillStyle = 'rgb(252, 122, 19)';
		ctx.fillRect(elem.x, elem.y, 150, 15);
	}

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillText( ((elem.buffer && elem.buffer.length)? elem.buffer : elem.string), elem.x+5, elem.y+12);
}


/*
===========================================
SCR_drawField_button
===========================================
*/
function SCR_drawField_button(elem){
	if (m_position && m_position.id == elem.id) {
		ctx.fillStyle = 'rgb(252, 122, 19)';
		ctx.fillRect(elem.x, elem.y, 150, 15);
	}

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillText(elem.string, elem.x+5, elem.y+12);
}


/*
===========================================
SCR_drawLockScreen
===========================================
*/
function SCR_drawLockScreen(){
	ctx.fillStyle = 'rgb(136, 197, 198)';		// background
	ctx.fillRect (0, 0, scr_width, scr_height); //

	for (var i = 0; i < m_active.items.length; i++) {
		if(m_active.items[i].type == MTYPE_INPUT){
			SCR_drawField_input(m_active.items[i]);
		}
		else if(m_active.items[i].type == MTYPE_BUTTON){
			SCR_drawField_button(m_active.items[i]);
		}
	}
}


/*
===========================================
SCR_drawLoadScreen
===========================================
*/
function SCR_drawLoadScreen(){
	ctx.fillStyle = 'rgb(136, 197, 198)';		// background
	ctx.fillRect (0, 0, scr_width, scr_height); //

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillText( 'Loading', 10, 20);

	////////////////////TO DO////////////////////
	if(SYS_checkResources() != 100)
		return;

	sys_state.pushStateG(G_STATE_RUN);
	////////////////////TO DO////////////////////
}


/*
===========================================
SCR_drawMenu_main
===========================================
*/
function SCR_drawMenu_main(){
	ctx.fillStyle = 'rgb(136, 197, 198)';		// background
	ctx.fillRect (0, 0, scr_width, scr_height); //

	for (var i = 0; i < m_active.items.length; i++) {
		if (m_position && m_position.id == m_active.items[i].id) {
			ctx.fillStyle = 'rgb(252, 122, 19)';
			ctx.fillRect(m_active.items[i].x, m_active.items[i].y, 150, 15);
		}

		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillText(m_active.items[i].string, m_active.items[i].x+5, m_active.items[i].y+12);
	}
}

/*
===========================================
SCR_drawMenu_options
===========================================
*/
function SCR_drawMenu_options(){
	ctx.fillStyle = 'rgb(136, 197, 198)';		// background
	ctx.fillRect (0, 0, scr_width, scr_height); //
}


/*
===========================================
SCR_drawMenu
===========================================
*/
function SCR_drawMenu(){
	if(sys_state.menu === M_STATE_NONE){
		return;
	}
	else if(sys_state.menu === M_STATE_MAIN){
		SCR_drawMenu_main();
	}
	else if(sys_state.menu === M_STATE_OPTIONS){
		SCR_drawMenu_options();
	}
}


/*
===========================================
SCR_drawFPS
===========================================
*/
function SCR_drawFPS(){
	thisfpstime = new Date();
	if ((thisfpstime - lastfpstime) >= 1000) {
		lastfps = fps_count;
		fps_count = 0;
		lastfpstime = thisfpstime;
	}
	ctx.font = '12px serif';
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillText('FPS: ' + lastfps, canvas.width - 65, 17);
	ctx.fillText('m_x: ' + mouse_x, canvas.width - 65, 29);
	ctx.fillText('m_y: ' + mouse_y, canvas.width - 65, 41);
	ctx.fillText('m_b: ' + keyEvents['m_b'], canvas.width - 65, 53);
	fps_count++;
}


/*
===========================================
SCR_drawСursor
===========================================
*/
function SCR_drawСursor(){
	// To do draw cursor
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(mouse_x, mouse_y, 10, 10);
}
