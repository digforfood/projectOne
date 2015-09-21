'use strict'
//= constants.js

var socket,
	canvas,
	context,
	gameState,
	deltaMilliseconds,
	lastFrameTime,
	thisFrameTime;


/*
===========================================
scr_updateScreen
===========================================
*/
function scr_updateScreen(){
	if(gameState === STATE_LOADING){
		//
	}
	else if(gameState === STATE_LOGIN){
		//
	}
	else{
		//
	}
}


/*
===========================================
frame
===========================================
*/
function frame(){
	lastFrameTime = thisFrameTime;
	thisFrameTime = new Date();
	deltaMilliseconds = thisFrameTime - lastFrameTime;

	if (true)
		return;			// framerate is too high

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
	context = canvas. getContext('2d');
	gameState = G_STATE_INIT;
	thisFrameTime = new Date();
	
	gameLoop();
}

main();
