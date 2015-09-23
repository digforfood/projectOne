'use strict'
//= constants.js

var fps_count,
	lastfps,
	thisfpstime,
	lastfpstime,

	mouse_x,
	mouse_y,
	mouse_button,

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
scr_drawFPS
===========================================
*/
function scr_drawFPS(){
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
scr_updateScreen
===========================================
*/
function scr_updateScreen(){
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
	scr_drawFPS();
}


/*
===========================================
frame
===========================================
*/
function frame(){
	correntTime = new Date();
	deltaMilliseconds = correntTime - thisFrameTime;

	if (deltaMilliseconds < 10)
		return;			// framerate is too high

	prevFrameTime = thisFrameTime;
	thisFrameTime = correntTime;

	// To do get new key events

	// To do fetch results from server

	// To do prediction for other players

	// To do client side motion prediction

	scr_updateScreen();
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
controlEventsInit
===========================================
*/
function controlEventsInit(){
	//mouse events
	mouse_x = 0;
	mouse_y = 0;
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
		mouse_x = e.clientX;
		mouse_y = e.clientY;
	};
}


/*
===========================================
main
===========================================
*/
function main(){
	canvas = document.getElementById('canvas');
	canvas.width = 640;
	canvas.height = 480;
	ctx = canvas.getContext('2d');
	gameState = G_STATE_LOGIN;

	fps_count = 0;
	lastfps = 0;
	lastfpstime = new Date();
	
	thisFrameTime = new Date();

	controlEventsInit();
	
	gameLoop();
}

main();
