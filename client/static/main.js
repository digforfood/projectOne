'use strict'
var	G_STATE_LOADING = 0,
	G_STATE_RUN = 1,
	G_STATE_EXIT = 2,

	M_STATE_NONE = 0,
	M_STATE_LOGIN = 1,
	M_STATE_MAIN = 2,

	D_SCREEN_WIDTH = 640,
	D_SCREEN_HEIGHT = 480;

var scr_width,
	scr_height,

	fps_count,
	lastfps,
	thisfpstime,
	lastfpstime,

	keyboard_keys,
	mouse_x,
	mouse_y,
	mouse_movement_x,
	mouse_movement_y,
	mouse_button,

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


/*
===========================================
CH_mouse
===========================================
*/
function CH_mouse(){
	mouse_x += mouse_movement_x;
	mouse_y += mouse_movement_y;
	if (mouse_x < 0) mouse_x = 0;
	else if (mouse_x >= scr_width) mouse_x = scr_width-1;
	if (mouse_y < 0) mouse_y = 0;
	else if (mouse_y >= scr_height) mouse_y = scr_height-1;
	mouse_movement_x = 0;
	mouse_movement_y = 0;
}


/*
===========================================
SCR_drawMenu_login
===========================================
*/
function SCR_drawMenu_login(){
	ctx.fillStyle = 'rgb(136, 197, 198)';		// background
	ctx.fillRect (0, 0, scr_width, scr_height); //
}


/*
===========================================
SCR_drawMenu_main
===========================================
*/
function SCR_drawMenu_main(){
	//
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
	else if(m_state === M_STATE_LOGIN){
		SCR_drawMenu_login();
	}
	else if(m_state === M_STATE_MAIN){
		SCR_drawMenu_main();
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
	ctx.fillText('m_b: ' + mouse_button, canvas.width - 65, 53);
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

	if(g_state === G_STATE_LOADING){
		//
	}
	else if(g_state === G_STATE_RUN){
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

	// To do get new key events

	// command handler mouse
	CH_mouse();

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
	//mouse events
	mouse_x = 0;
	mouse_y = 0;
	mouse_movement_x = 0;
	mouse_movement_y = 0;
	mouse_button = 0;
	canvas.oncontextmenu = function(){
		return false;
	};
	canvas.onmousedown = function(e){
		if (!e) e = window.event;
		mouse_button = e.buttons;
	};
	canvas.onmouseup = function(e){
		mouse_button = 0;
	};
	canvas.onmousemove = function(e){
		if (!e) e = window.event;
		mouse_movement_x = e.movementX;
		mouse_movement_y = e.movementY;
	};

	//keyboard events
	keyboard_keys = {};
	document.onkeydown = function(e){
		if (!e) e = window.event;
		keyboard_keys[e.keyCode] = true;
	};
	document.onkeyup = function(e){
		if (!e) e = window.event;
		keyboard_keys[e.keyCode] = false;
	};

	//cursor hide
	canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
	canvas.requestFullscreen = canvas.requestFullscreen || canvas.mozRequestFullScreen || canvas.webkitRequestFullscreen;
	canvas.onclick = function(){
		canvas.requestPointerLock();
		canvas.requestFullscreen();
	};
}


/*
===========================================
main
===========================================
*/
function main(){
	fps = 100;
	g_state = G_STATE_RUN;
	m_state = M_STATE_LOGIN;
	canvasInit();

	fps_count = 0;
	lastfps = 0;
	lastfpstime = new Date();
	
	thisFrameTime = new Date();

	controlEventsInit();
	
	gameLoop();
}

main();