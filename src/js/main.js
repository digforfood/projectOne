'use strict'
//= constants.js

var fps_count,
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
	gameState,
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
	//
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
	ctx.font = "12px serif";
	ctx.fillText('FPS: ' + lastfps, canvas.width - 45, 17);
	ctx.fillText('m_x: ' + mouse_x, canvas.width - 45, 29);
	ctx.fillText('m_y: ' + mouse_y, canvas.width - 45, 41);
	ctx.fillText('m_b: ' + mouse_button, canvas.width - 45, 53);
	fps_count++;
}


/*
===========================================
SCR_drawСursor
===========================================
*/
function SCR_drawСursor(){
	//
}


/*
===========================================
SCR_updateScreen
===========================================
*/
function SCR_updateScreen(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(gameState === G_STATE_LOADING){
		//
	}
	else if(gameState === G_STATE_LOGIN){
		//
	}
	else{
		//
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
	canvas.width = 640;
	canvas.height = 480;
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
	canvas.onclick = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
}


/*
===========================================
main
===========================================
*/
function main(){
	fps = 100;
	canvasInit();
	gameState = G_STATE_LOGIN;

	fps_count = 0;
	lastfps = 0;
	lastfpstime = new Date();
	
	thisFrameTime = new Date();

	controlEventsInit();
	
	gameLoop();
}

main();
