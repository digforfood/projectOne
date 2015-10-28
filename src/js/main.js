'use strict'
//= constants.js

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
	ui_s_lock,
	ui_s_m_main,
	ui_s_m_options,
	m_active,
	m_activeItem,
	m_focusItem,
	m_buttonDownItem,

	fps,
	socket,
	canvas,
	ctx,
	g_state,
	m_state,
	correntTime,
	deltaMilliseconds,
	prevFrameTime,
	thisFrameTime;

//= ui_screen_lock.js
//= ui_screen_menu-main.js
//= ui_screen_menu-options.js
//= net_main.js
//= ui_event.js


/*
===========================================
CL_mouseEvent
===========================================
*/
function CL_mouseEvent(){
	if (m_state != M_STATE_NONE || g_state <= G_STATE_CONNECTING) {
		UI_mouseEvent();
	} else {
		//
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
	if (m_state == M_STATE_NONE) {
		//
	} else {
		UI_keyEvent();
	}
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
		if (m_activeItem == m_active.items[i].id) {
			ctx.fillStyle = 'rgb(252, 122, 19)';
			ctx.fillRect (m_active.items[i].x, m_active.items[i].y, 150, 15);
		}

		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillText(m_active.items[i].string, m_active.items[i].x+5, m_active.items[i].y+12);
	}
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
		if (m_activeItem == m_active.items[i].id) {
			ctx.fillStyle = 'rgb(252, 122, 19)';
			ctx.fillRect (m_active.items[i].x, m_active.items[i].y, 150, 15);
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
	if(m_state === M_STATE_NONE){
		return;
	}
	else if(m_state === M_STATE_MAIN){
		SCR_drawMenu_main();
	}
	else if(m_state === M_STATE_OPTIONS){
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


/*
===========================================
SCR_updateScreen
===========================================
*/
function SCR_updateScreen(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(g_state == G_STATE_DISCONNECTED || g_state == G_STATE_CONNECTING){
		SCR_drawLockScreen();
	}
	else if(g_state == G_STATE_CONNECTED || g_state == G_STATE_RUN){
		SCR_drawMenu();
	}
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

	// client mouse event
	CL_mouseEvent();

	// get new key events
	CL_keyEvent();

	// To do fetch results from server

	// To do send results to server

	// To do prediction for other players

	// To do client side motion prediction

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
	ctx = canvas.getContext('2d');
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
	keyEvents['m_b'] = 0;
	canvas.oncontextmenu = function(){
		return false;
	};
	canvas.onmousedown = function(e){
		if (!e) e = window.event;
		keyEvents['m_b'] = e.buttons;
	};
	canvas.onmouseup = function(e){
		keyEvents['m_b'] = 0;
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
	g_state = G_STATE_DISCONNECTED;
	m_state = M_STATE_NONE;
	m_active = ui_s_lock;
	canvasInit();

	NET_init();

	fps_count = 0;
	lastfps = 0;
	lastfpstime = new Date();
	
	thisFrameTime = new Date();

	controlEventsInit();
	
	gameLoop();
}

main();
