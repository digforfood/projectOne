'use strict'
var STATE_INIT = 0,
	STATE_LOGIN = 1;
	STATE_MENU = 2,
	STATE_RUN = 3,
	STATE_EXIT = 4;

var socket,
	gameState = 0,
	screenPreloader = document.getElementById('screen-preloader'),
	screenLock = document.getElementById('screen-lock'),
	screenMainMenu = document.getElementById('screen-main_menu');

function renderInitFrame(){
	if (screenPreloader.className.indexOf('hidden') != -1){
		screenPreloader.classList.remove('hidden');
		socket = new WebSocket("ws://localhost:443");

		socket.onopen = function(){console.log('Соединение установлено.');};
		socket.onclose = function(ent){
			if (ent.wasClean)
				console.log('Соединение закрыто чисто');
			else
				console.log('Обрыв соединения');
		};
		socket.onmessage = function(ent){handlerEntData(ent.data)};
		socket.onerror = function(ent){console.log(ent.message);};

		gameState = 1;
	}
}

function renderLoginFrame(){
	if (screenLock.className.indexOf('hidden') != -1){
		screenPreloader.classList.add('hidden');
		screenLock.classList.remove('hidden');

		gameState = 2;
	}
}

function renderMenuFrame(){
	if (screenMainMenu.className.indexOf('hidden') != -1){
		screenLock.classList.add('hidden');
		screenMainMenu.classList.remove('hidden');

		gameState = 3;
	}
}

function gameLoop(){
	if(gameState === STATE_INIT){
		renderInitFrame();
	}
	else if(gameState === STATE_LOGIN){
		//
	}
	else if(gameState === STATE_MENU){
		//
	}
	else if(gameState === STATE_RUN){
		//
	}
	else if(gameState === STATE_EXIT){
		//
	}
	window.setTimeout(gameLoop, 0);
}

function main(){
	gameLoop();
}

main();
