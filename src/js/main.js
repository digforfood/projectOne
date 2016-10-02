'use strict'
//= constants.js
//= keys_map.js

var scr_width,
	scr_height,

	fps_count,
	lastfps,
	thisfpstime,
	lastfpstime,

	keyEvents,
	mouse_x,
	mouse_y,
	mouse_movement_x,
	mouse_movement_y,

	ui_stack,
	ui_langSet,
	ui_s_lock,
	ui_s_m_main,
	ui_s_m_options,
	m_active,
	m_activeItem,
	m_focusItem,
	m_position,
	m_buttonDownItem,

	sys_state,
	cgs,

	socket,
	net_clKey,
	net_buf, //To do
	net_inPackets,
	net_outPacket,
	net_lastPacketSentTime,

	fps,
	canvas,
	gl,
	correntTime,
	deltaMilliseconds,
	prevFrameTime,
	thisFrameTime;

//= cl_load.js
//= cl_parse.js
//= cl_send.js
//= cl_shaders.js
//= net_main.js
//= scr_main.js
//= sys_main.js
//= sys_state.js
//= ui_event.js
//= ui_screen_lock.js
//= ui_screen_menu-main.js
//= ui_screen_menu-options.js


/*
===========================================
CL_mouseEvent
===========================================
*/
function CL_mouseEvent(){
	if (sys_state.menu != M_STATE_NONE || sys_state.game <= G_STATE_CONNECTING) {
		UI_mouseEvent();
	}
	else {
		// To do mouse event in game
	}
	mouse_movement_x = 0;
	mouse_movement_y = 0;
}


/*
===========================================
CL_keyEvent
===========================================
*/
function CL_keyEvent(){
	if (sys_state.menu != M_STATE_NONE || sys_state.game <= G_STATE_CONNECTING) {
		UI_keyEvent();
	}
	else {
		// To do key event in game
	}
}


/*
===========================================
CL_incomingEvents
===========================================
*/
function CL_incomingEvents(){
	// fetch results from server
	CL_parseServerMessage();

	// client mouse event
	CL_mouseEvent();

	// get new key events
	CL_keyEvent();
}


/*
===========================================
SCR_updateScreen
===========================================
*/
function SCR_updateScreen(){
	gl.clear(gl.COLOR_BUFFER_BIT);

	if( sys_state.game == G_STATE_INTRO_LOADING || sys_state.game == G_STATE_LOADING){
		SCR_drawLoadScreen();
	}
	else if(sys_state.game <= G_STATE_CONNECTING){
		SCR_drawLockScreen();
	}
	else if(sys_state.game == G_STATE_RUN){
		// To do
	}

	SCR_drawMenu();

	SCR_drawFPS();
	SCR_drawСursor();
}


/*
===========================================
frame
===========================================
*/
function frame(){
	correntTime = new Date();
	deltaMilliseconds = correntTime - thisFrameTime;

	if (deltaMilliseconds < 1000/fps)
		return;			// framerate is too high

	prevFrameTime = thisFrameTime;
	thisFrameTime = correntTime;

	// client incoming events
	CL_incomingEvents();

	// send results to server
	CL_sendCmd();

	// To do prediction for other players

	// To do client side motion prediction

	// switch game and menu state
	sys_state.switchState();

	SCR_updateScreen();
}


/*
===========================================
gameLoop
===========================================
*/
function gameLoop(){
	frame();

	window.setTimeout(gameLoop, 0);
}


/*
===========================================
canvasInit
===========================================
*/
function canvasInit(){
	canvas = document.getElementById('canvas');
	scr_width = parseInt(localStorage['scr_width']) || D_SCREEN_WIDTH;
	scr_height = parseInt(localStorage['scr_height']) || D_SCREEN_HEIGHT;
	canvas.width = scr_width;
	canvas.height = scr_height;
	gl = canvas.getContext('webgl');
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
}


/*
===========================================
controlEventsInit
===========================================
*/
function controlEventsInit(){
	keyEvents = {};

	//mouse events
	mouse_x = 0;
	mouse_y = 0;
	mouse_movement_x = 0;
	mouse_movement_y = 0;
	keyEvents[K_MOUSE] = 0;
	canvas.oncontextmenu = function(){
		return false;
	};
	canvas.onmousedown = function(e){
		if (!e) e = window.event;
		keyEvents[K_MOUSE] = e.buttons;
	};
	canvas.onmouseup = function(e){
		keyEvents[K_MOUSE] = 0;
	};
	canvas.onmousemove = function(e){
		if (!e) e = window.event;
		mouse_movement_x += e.movementX;
		mouse_movement_y += e.movementY;
	};

	//keyboard events
	document.onkeydown = function(e){
		if (!e) e = window.event;
		keyEvents[e.keyCode] = true;
	};
	document.onkeyup = function(e){
		if (!e) e = window.event;
		keyEvents[e.keyCode] = false;
	};

	//cursor hide
	canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
	canvas.requestFullscreen = canvas.requestFullscreen || canvas.mozRequestFullScreen || canvas.webkitRequestFullscreen;
	canvas.onclick = function(){
		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
			canvas.requestPointerLock();
			canvas.requestFullscreen();
		}
	};
}


/*
===========================================
main
===========================================
*/
function main(){
	fps = 100;
	ui_stack = [];
	ui_langSet = LANG_EN;
	sys_state = new SYS_State(G_STATE_INTRO_LOADING, M_STATE_NONE);
	m_active = ui_s_lock;
	canvasInit();

	NET_init();

	CL_loadThreads();

	fps_count = 0;
	lastfps = 0;
	lastfpstime = new Date();
	
	thisFrameTime = new Date();

	controlEventsInit();
	
	gameLoop();
}

main();
