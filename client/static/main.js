'use strict'
var	G_STATE_DISCONNECTED = 0,
	G_STATE_CONNECTING = 1,
	G_STATE_CONNECTED = 2,
	G_STATE_RUN = 3,
	G_STATE_LOADING = 4,

	M_STATE_NONE = 0,
	M_STATE_MAIN = 1,
	M_STATE_OPTIONS = 2,

	D_SCREEN_WIDTH = 640,
	D_SCREEN_HEIGHT = 480,

	MTYPE_TEXT = 0,
	MTYPE_INPUT = 1,
	MTYPE_BUTTON = 2,

	LANG_EN = 0,
	LANG_RU = 2,

	K_MOUSE = 'm_b',
	K_BACKSPACE = 8,
	K_TAB = 9,
	K_ENTER = 13,
	K_SHIFT = 16,
	K_CTRL = 17,
	K_ALT = 18,
	K_PAUSE = 19,
	K_CAPS = 20,
	K_ESC = 27,
	K_PAGEUP = 33,
	K_PAGEDOWN = 34,
	K_END = 35,
	K_HOME = 36,
	K_LEFTARROW = 37,
	K_UPARROW = 38,
	K_RIGHTARROW = 39,
	K_DOWNARROW = 40;
var	keys_map = {
	"48":  ['0', ')', '0', ')'],
	"49":  ['1', '!', '1', '!'],
	"50":  ['2', '@', '2', '"'],
	"51":  ['3', '#', '3', '№'],
	"52":  ['4', '$', '4', ';'],
	"53":  ['5', '%', '5', '%'],
	"54":  ['6', '^', '6', ':'],
	"55":  ['7', '&', '7', '?'],
	"56":  ['8', '*', '8', '*'],
	"57":  ['9', '(', '9', '('],
	"65":  ['a', 'A', 'ф', 'Ф'],
	"66":  ['b', 'B', 'и', 'И'],
	"67":  ['c', 'C', 'с', 'С'],
	"68":  ['d', 'D', 'в', 'В'],
	"69":  ['e', 'E', 'у', 'У'],
	"70":  ['f', 'F', 'а', 'А'],
	"71":  ['g', 'G', 'п', 'П'],
	"72":  ['h', 'H', 'р', 'Р'],
	"73":  ['i', 'I', 'ш', 'Ш'],
	"74":  ['j', 'J', 'о', 'О'],
	"75":  ['k', 'K', 'л', 'Л'],
	"76":  ['l', 'L', 'д', 'Д'],
	"77":  ['m', 'M', 'ь', 'Ь'],
	"78":  ['n', 'N', 'т', 'Т'],
	"79":  ['o', 'O', 'щ', 'Щ'],
	"80":  ['p', 'P', 'з', 'З'],
	"81":  ['q', 'Q', 'й', 'Й'],
	"82":  ['r', 'R', 'к', 'К'],
	"83":  ['s', 'S', 'ы', 'Ы'],
	"84":  ['t', 'T', 'е', 'Е'],
	"85":  ['u', 'U', 'г', 'Г'],
	"86":  ['v', 'V', 'м', 'М'],
	"87":  ['w', 'W', 'ц', 'Ц'],
	"88":  ['x', 'X', 'ч', 'Ч'],
	"89":  ['y', 'Y', 'н', 'Н'],
	"90":  ['z', 'Z', 'я', 'Я'],
	"187": ['=', '+', '=', '+'],
	"188": [',', '<', 'б', 'Б'],
	"189": ['-', '_', '-', '_'],
	"190": ['.', '>', 'ю', 'Ю'],
	"191": ['/', '?', '.', ','],
	"192": ['`', '~', 'ё', 'Ё'],
	"219": ['[', '{', 'х', 'Х'],
	"220": ['\\', '|', '\\', '/'],
	"221": [']', '}', 'ъ', 'Ъ'],
	"222": ['\'', '"', 'э', 'Э']
};

var scr_width,
	scr_height,

	fps_count,
	lastfps,
	thisfpstime,
	lastfpstime,

	keyEvents,
	mouse_x,
	mouse_y,
	mouse_movement_x,
	mouse_movement_y,

	ui_stack,
	ui_langSet,
	ui_s_lock,
	ui_s_m_main,
	ui_s_m_options,
	m_active,
	m_activeItem,
	m_focusItem,
	m_position,
	m_buttonDownItem,

	fps,
	socket,
	canvas,
	ctx,
	g_state,
	m_state,
	correntTime,
	deltaMilliseconds,
	prevFrameTime,
	thisFrameTime;

ui_s_lock = {

///////////////////////////////
//LOGIN SCREEN
///////////////////////////////
	string: 'LOGIN',
	items: [
		{
			type: MTYPE_INPUT,
			id: 10,
			x: 20,
			y: 20,
			width: 150,
			height: 20,
			string: 'Login',
			buffer: ''
		},
		{
			type: MTYPE_INPUT,
			id: 11,
			x: 20,
			y: 40,
			width: 150,
			height: 20,
			string: 'Password',
			buffer: ''
		},
		{
			type: MTYPE_BUTTON,
			id: 12,
			x: 20,
			y: 60,
			width: 150,
			height: 20,
			string: 'Connect'
		}
	]

};
ui_s_m_main = {
///////////////////////////////
//MAIN MENU
///////////////////////////////
string: 'MAIN',
items: [
		{
			type: MTYPE_TEXT,
			id: 20,
			x: 20,
			y: 20,
			width: 150,
			height: 20,
			string: 'Start'
		},
		{
			type: MTYPE_TEXT,
			id: 21,
			x: 20,
			y: 40,
			width: 150,
			height: 20,
			string: 'Options'
		}
	]
};
ui_s_m_options = {
///////////////////////////////
//OPTIONS MENU
///////////////////////////////
string: 'OPTIONS',
items: [
		{
			type: MTYPE_TEXT,
			id: 20,
			x: 20,
			y: 20,
			width: 150,
			height: 20,
			string: 'sdfdfg'
		},
		{
			type: MTYPE_TEXT,
			id: 21,
			x: 20,
			y: 40,
			width: 150,
			height: 20,
			string: 'sdfrasdfg'
		}
	]
};
/*
===========================================
NET_init
===========================================
*/
function NET_init(){
	////////////////////TO DO NET////////////////////
	// socket = new WebSocket("ws://localhost:443");
	// socket.onopen = function(){
	// 	//console.log('onopen');
	// };
	// socket.onclose = function(ent){
	// 	//console.log('onclose');
	// };
	// socket.onmessage = function(ent){
	// 	//console.log(ent.data);
	// };
	// socket.onerror = function(ent){
	// 	//console.log('onerror');
	// };
	////////////////////TO DO NET////////////////////


	////////////////////TO DO NET////////////////////
	g_state = G_STATE_CONNECTING;
	////////////////////TO DO NET////////////////////
}
/*
===========================================
UI_rectContainsPoint
===========================================
*/
function UI_rectContainsPoint(x, y, item){
	if(x > item.x && x < item.x + item.width && y > item.y && y < item.y + item.height){
		return true;
	}
	return false;
}


/*
===========================================
UI_handleMouseMoveEvent
===========================================
*/
function UI_handleMouseMoveEvent(){
	m_focusItem = {};

	for(var i =0; i < m_active.items.length; i++){
		if(UI_rectContainsPoint(mouse_x, mouse_y, m_active.items[i])){
			m_focusItem = m_active.items[i];
			if(m_active.items[i].type == MTYPE_TEXT)
				m_position = m_active.items[i];
		}
	}
}


/*
===========================================
UI_mouseEvent
===========================================
*/
function UI_mouseEvent(){
	mouse_x += mouse_movement_x;
	mouse_y += mouse_movement_y;
	if (mouse_x < 0) mouse_x = 0;
	else if (mouse_x >= scr_width) mouse_x = scr_width-1;
	if (mouse_y < 0) mouse_y = 0;
	else if (mouse_y >= scr_height) mouse_y = scr_height-1;

	UI_handleMouseMoveEvent();
}


/*
===========================================
UI_handleMouseClick
===========================================
*/
function UI_handleMouseClick(){
	if (m_focusItem.type == MTYPE_TEXT) {
		//
	}
	else if (m_focusItem.type == MTYPE_INPUT) {
		m_position = m_focusItem;
	}
}


/*
===========================================
UI_handleKeyEvent
===========================================
*/
function UI_handleKeyEvent(key, down){
	if(key == K_MOUSE){
		if(down && !m_buttonDownItem && m_focusItem){
			m_buttonDownItem = m_focusItem.id;
		}
		else if(!down && m_buttonDownItem){
			if (m_buttonDownItem == m_focusItem.id)
				UI_handleMouseClick();

			m_buttonDownItem = 0;
		}
	}

	if(!down)
		return;

	if(key == K_UPARROW){
		//
	}	
	else if(key == K_DOWNARROW){
		//
	}
	else if(key == K_ALT){
		if(keyEvents[K_SHIFT]){
			if(ui_langSet == LANG_EN)
				ui_langSet = LANG_RU;
			else
				ui_langSet = LANG_EN;
			keyEvents[key] = false;
		}
	}
	else if(key == K_BACKSPACE){
		if(m_position.type!=MTYPE_INPUT)
			return;

		m_position.buffer = m_position.buffer.slice(0, -1);
		keyEvents[key] = false;
	}
	else if( (key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 187 && key <= 192) || (key >= 219 && key <= 222) ){
		if(m_position.type!=MTYPE_INPUT)
			return;

		keyEvents[key] = false;
		if(keyEvents[K_SHIFT])
			m_position.buffer += keys_map[key][ui_langSet+1];
		else
			m_position.buffer += keys_map[key][ui_langSet];
	}
}


/*
===========================================
UI_keyEvent
===========================================
*/
function UI_keyEvent(){
	for(var key in keyEvents){
		UI_handleKeyEvent(key, keyEvents[key]);
	}
}


/*
===========================================
CL_mouseEvent
===========================================
*/
function CL_mouseEvent(){
	if (m_state != M_STATE_NONE || g_state <= G_STATE_CONNECTING) {
		UI_mouseEvent();
	} else {
		//
	}
	mouse_movement_x = 0;
	mouse_movement_y = 0;
}


/*
===========================================
CL_keyEvent
===========================================
*/
function CL_keyEvent(){
	if (m_state != M_STATE_NONE || g_state <= G_STATE_CONNECTING) {
		UI_keyEvent();
	} else {
		//
	}
}


/*
===========================================
SCR_drawLockScreen
===========================================
*/
function SCR_drawLockScreen(){
	ctx.fillStyle = 'rgb(136, 197, 198)';		// background
	ctx.fillRect (0, 0, scr_width, scr_height); //

	for (var i = 0; i < m_active.items.length; i++) {
		if (m_position && m_position.id == m_active.items[i].id) {
			ctx.fillStyle = 'rgb(252, 122, 19)';
			ctx.fillRect(m_active.items[i].x, m_active.items[i].y, 150, 15);
		}

		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillText( ((m_active.items[i].buffer && m_active.items[i].buffer.length)? m_active.items[i].buffer : m_active.items[i].string), m_active.items[i].x+5, m_active.items[i].y+12);
	}
}


/*
===========================================
SCR_drawMenu_main
===========================================
*/
function SCR_drawMenu_main(){
	ctx.fillStyle = 'rgb(136, 197, 198)';		// background
	ctx.fillRect (0, 0, scr_width, scr_height); //

	for (var i = 0; i < m_active.items.length; i++) {
		if (m_position && m_position.id == m_active.items[i].id) {
			ctx.fillStyle = 'rgb(252, 122, 19)';
			ctx.fillRect(m_active.items[i].x, m_active.items[i].y, 150, 15);
		}

		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillText(m_active.items[i].string, m_active.items[i].x+5, m_active.items[i].y+12);
	}
}

/*
===========================================
SCR_drawMenu_options
===========================================
*/
function SCR_drawMenu_options(){
	ctx.fillStyle = 'rgb(136, 197, 198)';		// background
	ctx.fillRect (0, 0, scr_width, scr_height); //
}


/*
===========================================
SCR_drawMenu
===========================================
*/
function SCR_drawMenu(){
	if(m_state === M_STATE_NONE){
		return;
	}
	else if(m_state === M_STATE_MAIN){
		SCR_drawMenu_main();
	}
	else if(m_state === M_STATE_OPTIONS){
		SCR_drawMenu_options();
	}
}


/*
===========================================
SCR_drawFPS
===========================================
*/
function SCR_drawFPS(){
	thisfpstime = new Date();
	if ((thisfpstime - lastfpstime) >= 1000) {
		lastfps = fps_count;
		fps_count = 0;
		lastfpstime = thisfpstime;
	}
	ctx.font = '12px serif';
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillText('FPS: ' + lastfps, canvas.width - 65, 17);
	ctx.fillText('m_x: ' + mouse_x, canvas.width - 65, 29);
	ctx.fillText('m_y: ' + mouse_y, canvas.width - 65, 41);
	ctx.fillText('m_b: ' + keyEvents['m_b'], canvas.width - 65, 53);
	fps_count++;
}


/*
===========================================
SCR_drawСursor
===========================================
*/
function SCR_drawСursor(){
	// To do draw cursor
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(mouse_x, mouse_y, 10, 10);
}


/*
===========================================
SCR_updateScreen
===========================================
*/
function SCR_updateScreen(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(g_state == G_STATE_DISCONNECTED || g_state == G_STATE_CONNECTING){
		SCR_drawLockScreen();
	}
	else if(g_state == G_STATE_CONNECTED || g_state == G_STATE_RUN){
		SCR_drawMenu();
	}
	SCR_drawFPS();
	SCR_drawСursor();
}


/*
===========================================
frame
===========================================
*/
function frame(){
	correntTime = new Date();
	deltaMilliseconds = correntTime - thisFrameTime;

	if (deltaMilliseconds < 1000/fps)
		return;			// framerate is too high

	prevFrameTime = thisFrameTime;
	thisFrameTime = correntTime;

	// client mouse event
	CL_mouseEvent();

	// get new key events
	CL_keyEvent();

	// To do fetch results from server

	// To do send results to server

	// To do prediction for other players

	// To do client side motion prediction

	SCR_updateScreen();
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
canvasInit
===========================================
*/
function canvasInit(){
	canvas = document.getElementById('canvas');
	scr_width = parseInt(localStorage['scr_width']) || D_SCREEN_WIDTH;
	scr_height = parseInt(localStorage['scr_height']) || D_SCREEN_HEIGHT;
	canvas.width = scr_width;
	canvas.height = scr_height;
	ctx = canvas.getContext('2d');
}


/*
===========================================
controlEventsInit
===========================================
*/
function controlEventsInit(){
	keyEvents = {};

	//mouse events
	mouse_x = 0;
	mouse_y = 0;
	mouse_movement_x = 0;
	mouse_movement_y = 0;
	keyEvents['m_b'] = 0;
	canvas.oncontextmenu = function(){
		return false;
	};
	canvas.onmousedown = function(e){
		if (!e) e = window.event;
		keyEvents[K_MOUSE] = e.buttons;
	};
	canvas.onmouseup = function(e){
		keyEvents[K_MOUSE] = 0;
	};
	canvas.onmousemove = function(e){
		if (!e) e = window.event;
		mouse_movement_x += e.movementX;
		mouse_movement_y += e.movementY;
	};

	//keyboard events
	document.onkeydown = function(e){
		if (!e) e = window.event;
		keyEvents[e.keyCode] = true;
	};
	document.onkeyup = function(e){
		if (!e) e = window.event;
		keyEvents[e.keyCode] = false;
	};

	//cursor hide
	canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
	canvas.requestFullscreen = canvas.requestFullscreen || canvas.mozRequestFullScreen || canvas.webkitRequestFullscreen;
	canvas.onclick = function(){
		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
			canvas.requestPointerLock();
			canvas.requestFullscreen();
		}
	};
}


/*
===========================================
main
===========================================
*/
function main(){
	fps = 100;
	ui_stack = [];
	ui_langSet = LANG_EN;
	g_state = G_STATE_DISCONNECTED;
	m_state = M_STATE_NONE;
	m_active = ui_s_lock;
	canvasInit();

	NET_init();

	fps_count = 0;
	lastfps = 0;
	lastfpstime = new Date();
	
	thisFrameTime = new Date();

	controlEventsInit();
	
	gameLoop();
}

main();