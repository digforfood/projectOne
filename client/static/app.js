'use strict'
var STATE_INIT = 0,
	STATE_LOGIN = 1,
	STATE_MENU = 2,
	STATE_RUN = 3,
	STATE_EXIT = 4;

var socket,
	gameState = STATE_INIT,
	loadingFiles = [],
	screenPreloader = document.getElementById('screen-preloader'),
	screenLock = document.getElementById('screen-lock'),
	screenMainMenu = document.getElementById('screen-main_menu');


/*
==============
loadingData
==============
*/
function loadingData(files, state){
	var images = [],
		total = files.length,
		counter = 0;

	for (var i = 0; i < total; i++) {
		var image = new Image();
		images.push(image);
		image.src = files[i];
	}
	function preloading(){
		counter = 0;
		for (var i = 0; i < total; i++) {
			if (images[i].complete) counter++;
		}
		if (counter == total) gameState = state;
		else window.setTimeout(preloading, 0);
	};
	preloading();
}


/*
==============
connectToServer
==============
*/
function connectToServer(state, callback){
	socket = new WebSocket("ws://localhost:443");
	socket.onopen = function(){
		callback(loadingFiles, state, 'Соединение установлено.');
	};
	socket.onclose = function(ent){
		connectToServer(STATE_LOGIN, loadingData);
	};
	socket.onmessage = function(ent){
		handlerEntData(ent.data);
	};
	socket.onerror = function(ent){
		console.log('ent.message');
	};
}


/*
==============
renderInitFrame
==============
*/
function renderInitFrame(){
	if (screenPreloader.className.indexOf('hidden') != -1){
		screenPreloader.classList.remove('hidden');
		connectToServer(STATE_LOGIN, loadingData);
	}
}


/*
==============
renderLoginFrame
==============
*/
function renderLoginFrame(){
	if (screenLock.className.indexOf('hidden') != -1){
		screenPreloader.classList.add('hidden');
		screenLock.classList.remove('hidden');

		//gameState = STATE_MENU;
	}
}


/*
==============
renderMenuFrame
==============
*/
function renderMenuFrame(){
	if (screenMainMenu.className.indexOf('hidden') != -1){
		screenLock.classList.add('hidden');
		screenMainMenu.classList.remove('hidden');

		//gameState = STATE_RUN;
	}
}


/*
==============
gameLoop
==============
*/
function gameLoop(){
	if(gameState === STATE_INIT){
		renderInitFrame();
	}
	else if(gameState === STATE_LOGIN){
		renderLoginFrame();
	}
	else if(gameState === STATE_MENU){
		renderMenuFrame();
	}
	else if(gameState === STATE_RUN){
		//
	}
	else if(gameState === STATE_EXIT){
		//
	}
	window.setTimeout(gameLoop, 0);
}


/*
==============
main
==============
*/
function main(){
	gameLoop();
}

main();
