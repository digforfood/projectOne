'use strict'
var	G_STATE_LOADING = 0,
	G_STATE_LOGIN = 1,
	G_STATE_RUN = 2,
	G_STATE_EXIT = 3;

var socket,
	canvas,
	ctx,
	gameState,
	correntTime,
	deltaMilliseconds,
	lastFrameTime,
	thisFrameTime;


/*
===========================================
drawFPS
===========================================
*/
function drawFPS(){
	ctx.font = "12px serif";
	ctx.fillText('FPS: ' + Math.round(1000/deltaMilliseconds), canvas.width - 45, 17);
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
	drawFPS();
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

	lastFrameTime = thisFrameTime;
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
	thisFrameTime = new Date();
	
	gameLoop();
}

main();