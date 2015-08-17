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
	var lFiles = [],
		style,
		counter = 0;
	for (var i = 0; i < files.length; i++) {
		if (i > 0) {
			var image = new Image();
			lFiles.push(image);
			image.src = files[i];			
		} else {
			if (fileIsCached(files[i])) {
				injectRawStyle(localStorage.font_css_cache);
			} else {
				var xhr = new XMLHttpRequest();
				lFiles.push(xhr);
				xhr.open("GET", files[i], true);
				xhr.send();
			  }
		}
	}

	function fileIsCached(href) {
		return window.localStorage && localStorage.font_css_cache && (localStorage.font_css_cache_file === href);
	}

	function injectRawStyle(text) {
		style = document.createElement('style');
		style.setAttribute("type", "text/css");
		style.innerHTML = text;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function preloading(){
		counter = 0;
		for (var i = 0; i < lFiles.length; i++) {
			if (lFiles[i].complete) counter++;

			if (lFiles[i].readyState === 4) {
				injectRawStyle(xhr.responseText);
				localStorage.font_css_cache = xhr.responseText;
				localStorage.font_css_cache_file = css_href;
			}
			
		}
		if (counter == lFiles.length) gameState = state;
		else window.setTimeout(preloading, 0);
	};
	preloading();
}


/*
==============
connectToServer
==============
*/
function connectToServer(state){
	socket = new WebSocket("ws://localhost:443");
	socket.onopen = function(){
		loadingData(loadingFiles, state, 'Соединение установлено.');
	};
	socket.onclose = function(ent){
		connectToServer(STATE_LOGIN);
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
		connectToServer(STATE_LOGIN);
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
