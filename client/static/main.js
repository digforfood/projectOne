'use strict'
var	G_STATE_LOADING = 0,
	G_STATE_LOGIN = 1,
	G_STATE_RUN = 2,
	G_STATE_EXIT = 3;

var fps_count,
	lastfps,
	thisfpstime,
	lastfpstime,

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
	
	gameLoop();
}

main();