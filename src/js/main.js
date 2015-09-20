'use strict'
//= constants.js

var socket,
	gameState;


/*
==============
frame
==============
*/
function frame(){
	//
}


/*
==============
gameLoop
==============
*/
function gameLoop(){
	frame();

	window.setTimeout(gameLoop, 0);
}


/*
==============
main
==============
*/
function main(){
	gameState = G_STATE_INIT;
	
	gameLoop();
}

main();
