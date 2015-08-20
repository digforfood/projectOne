'use strict'
var STATE_INIT = 0,
	STATE_LOGIN = 1,
	STATE_MENU = 2,
	STATE_RUN = 3,
	STATE_EXIT = 4;
var resources_fonts = "static/fonts/fonts.css";

var socket,
	gameState = STATE_INIT,
	screenPreloader = document.getElementById('screen-preloader'),
	screenLock = document.getElementById('screen-lock'),
	screenMainMenu = document.getElementById('screen-main_menu');


/*
==============
loadingData
==============
*/
function loadingData(state){
	var fontXhr = false;
	if (!(window.localStorage && localStorage.font_css_cache && (localStorage.font_css_cache_file === resources_fonts))){
		fontXhr = new XMLHttpRequest();
		fontXhr.open("GET", resources_fonts, true);
		fontXhr.send();
	}

	function insertRawStyle(text) {
		var style = document.createElement('style');
		style.setAttribute("type", "text/css");
		style.innerHTML = text;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function check(){
		if (document.readyState == "complete"){
			if (fontXhr.readyState === 4){
				insertRawStyle(fontXhr.responseText);
				localStorage.font_css_cache = fontXhr.responseText;
				localStorage.font_css_cache_file = resources_fonts;
				gameState = state;
				return 0;
			}else if(!fontXhr){
				insertRawStyle(localStorage.font_css_cache);
				gameState = state;
				return 0;
			}
		}
		window.setTimeout(check, 0);
	};
	check();
}


/*
==============
connectToServer
==============
*/
function connectToServer(state){
	socket = new WebSocket("ws://localhost:443");
	socket.onopen = function(){
		loadingData(state, 'Соединение установлено.');
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