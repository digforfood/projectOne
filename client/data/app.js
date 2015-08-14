'use strict'
var STATE_INIT = 0,
	STATE_LOGIN = 1,
	STATE_MENU = 2,
	STATE_RUN = 3,
	STATE_EXIT = 4;

var socket,
	gameState = STATE_INIT,
	screenPreloader = document.getElementById('screen-preloader'),
	screenLock = document.getElementById('screen-lock'),
	screenMainMenu = document.getElementById('screen-main_menu');

function loadingData(state){
	var images = [];
    var total = imagesToPreload.length;

	for (var i = 0; i < total; i++) {
        var image = new Image();
        images.push(image);
        image.src = imagesToPreload[i];
    }
    function preloading(){
        var counter = 0;
        var total = magesToPreload.length;
        for (var i = 0; i < total; i++) {
            if (images[i].complete) {
                counter++;
            }
        }
        if (counter == total) {
            gameState = state;
        } else {
            window.setTimeout(preloading, 0);
        }
    };
}

function connectToServer(state, callback){
	socket = new WebSocket("ws://localhost:443");
	socket.onopen = function(){
		callback(state, 'Соединение установлено.');
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

function renderInitFrame(){
	if (screenPreloader.className.indexOf('hidden') != -1){
		screenPreloader.classList.remove('hidden');
		connectToServer(STATE_LOGIN, loadingData);
	}
}

function renderLoginFrame(){
	if (screenLock.className.indexOf('hidden') != -1){
		screenPreloader.classList.add('hidden');
		screenLock.classList.remove('hidden');

		//gameState = STATE_MENU;
	}
}

function renderMenuFrame(){
	if (screenMainMenu.className.indexOf('hidden') != -1){
		screenLock.classList.add('hidden');
		screenMainMenu.classList.remove('hidden');

		//gameState = STATE_RUN;
	}
}

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

function main(){
	gameLoop();
}

main();
