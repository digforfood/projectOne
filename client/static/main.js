'use strict'
var	G_STATE_DISCONNECTED = 0,
	G_STATE_CONNECTING = 1,
	G_STATE_CONNECTED = 2,
	G_STATE_RUN = 3,
	G_STATE_LOADING = 4,

	MSG_SERVERCOMMAND = 1,
	MSG_GAMESTATE = 2,
	MSG_SNAPSHOT = 3,

	MSG_CL_LOGIN = 0,
	MSG_CL_DATA = 1,

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
	K_SPACE = 32,
	K_PAGEUP = 33,
	K_PAGEDOWN = 34,
	K_END = 35,
	K_HOME = 36,
	K_LEFTARROW = 37,
	K_UPARROW = 38,
	K_RIGHTARROW = 39,
	K_DOWNARROW = 40;
var	keys_map = {
	"32":  [' ', ' ', ' ', ' '],
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

	sys_state,
	cgs,

	socket,
	net_clKey,
	net_evBuf, //To do
	net_inPackets,
	net_outPacket,
	net_lastPacketSentTime,

	fps,
	canvas,
	ctx,
	correntTime,
	deltaMilliseconds,
	prevFrameTime,
	thisFrameTime;

/*
===========================================
CL_loadThreads
===========================================
*/
function CL_loadThreads(){
	cgs = {};

	// To do start load thread audio
	cgs.audio = {};
	cgs.audio.test = new Audio('https://s21f.storage.yandex.net/get-mp3/3ab75658db4feb0f48fe9b143e6d02a9/00052914c11ad807/music/13/4/data-0.3:52466573623:7835062?track-id=168524&play=true&');

	// To do start load thread sprites
	cgs.sprites = {};
	cgs.sprites.test = new Image();
	cgs.sprites.test.src = 'https://arkesoul.files.wordpress.com/2015/09/fsociety.jpg';
}
/*
===========================================
CL_parseCommandString
===========================================
*/
function CL_parseCommandString(ent){
	// To do
}


/*
===========================================
CL_parseGamestate
===========================================
*/
function CL_parseGamestate(ent){
	if(typeof ent.k != "undefined")
		net_clKey = ent.k;

	sys_state.pushStateG(ent.s);
}


/*
===========================================
CL_parseSnapshot
===========================================
*/
function CL_parseSnapshot(ent){
	// To do
}


/*
===========================================
CL_parseServerMessage
===========================================
*/
function CL_parseServerMessage(){
	if (net_inPackets.length == 0)
		return;

	var l_msg = [],
		type = 0,
		body = {};

	for(var i = 0; i < net_inPackets.length; i++){

		l_msg = net_inPackets[i].m;

		for (var j = 0; j < l_msg.length; j++) {

			type = l_msg[j].t;
			body = l_msg[j].b;

			if(type == MSG_SERVERCOMMAND){
				CL_parseCommandString(body);
			}
			else if(type == MSG_GAMESTATE){
				CL_parseGamestate(body);
			}
			else if(type == MSG_SNAPSHOT){
				CL_parseSnapshot(body);
			}
		};
	}

	net_inPackets = [];
}
/*
===========================================
CL_createPacket
===========================================
*/
function CL_createPacket(ent){
	var msg = {t: 0, b: {}},
		bufLen = net_evBuf.length;

	if(ent != undefined){
		msg.t = MSG_CL_LOGIN;
		msg.b = ent;
	}
	else if(net_clKey != null){
		msg.t = MSG_CL_DATA;
		msg.b['k'] = net_clKey;

		if(bufLen > 0){
			msg.b['e'] = [];

			for(var i=0; i<bufLen; i++){
				msg.b['e'].push(net_evBuf[i]);
			}
			// To do create packet
		}		
	}
	else
		return;


	console.log('NET send msg: ', msg); // To do NET send msg
	NET_sendPacket(msg);

	net_lastPacketSentTime = correntTime;
}


/*
===========================================
CL_sendCmd
===========================================
*/
function CL_sendCmd(){
	if (sys_state.game == G_STATE_DISCONNECTED && sys_state.game == G_STATE_CONNECTING)
		return;

	if (sys_state.menu != M_STATE_NONE && correntTime - net_lastPacketSentTime < 1000)
		return;

	CL_createPacket();
}
/*
===========================================
NET_sendPacket
===========================================
*/
function NET_sendPacket(data){
	socket.send(JSON.stringify(data));
}


/*
===========================================
NET_init
===========================================
*/
function NET_init(){
	net_clKey = parseInt(localStorage['net_clKey']) || null;
	net_logInMsg = {};
	net_inPackets = [];
	net_evBuf = [];
	socket = new WebSocket("ws://devhub.mrdoe.ru:443");

	socket.onopen = function(){
		console.log('onopen');

		if(net_clKey != null){
			net_logInMsg['k'] = net_clKey;

			CL_createPacket();
		} else {
			sys_state.pushStateG(G_STATE_CONNECTING);
		}
	};

	socket.onclose = function(ent){
		console.log('onclose');

		sys_state.pushStateG(G_STATE_DISCONNECTED);
	};

	socket.onmessage = function(ent){
		console.log(ent.data);

		net_inPackets.push(JSON.parse(ent.data));
	};

	socket.onerror = function(ent){
		console.log('onerror');

		sys_state.pushStateG(G_STATE_DISCONNECTED);
	};


	////////////////////TO DO NET////////////////////
	//sys_state.pushStateG(G_STATE_CONNECTING);
	////////////////////TO DO NET////////////////////
}
/*
===========================================
SCR_drawField_input
===========================================
*/
function SCR_drawField_input(elem){
	if (m_position && m_position.id == elem.id) {
		ctx.fillStyle = 'rgb(252, 122, 19)';
		ctx.fillRect(elem.x, elem.y, 150, 15);
	}

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillText( ((elem.buffer && elem.buffer.length)? elem.buffer : elem.string), elem.x+5, elem.y+12);
}


/*
===========================================
SCR_drawField_button
===========================================
*/
function SCR_drawField_button(elem){
	if(sys_state.game == G_STATE_DISCONNECTED){
		ctx.fillStyle = 'rgb(106, 121, 137)';
	}
	else{
		ctx.fillStyle = 'rgb(252, 2, 2)';
	}
	ctx.fillRect(elem.x, elem.y, 150, 15);

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillText(elem.string, elem.x+5, elem.y+12);
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
		if(m_active.items[i].type == MTYPE_INPUT){
			SCR_drawField_input(m_active.items[i]);
		}
		else if(m_active.items[i].type == MTYPE_BUTTON){
			SCR_drawField_button(m_active.items[i]);
		}
	}
}


/*
===========================================
SCR_drawLoadScreen
===========================================
*/
function SCR_drawLoadScreen(){
	ctx.fillStyle = 'rgb(136, 197, 198)';		// background
	ctx.fillRect (0, 0, scr_width, scr_height); //

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillText( 'Loading', 10, 20);

	////////////////////TO DO////////////////////
	if(SYS_checkResources() != 100)
		return;

	sys_state.pushStateG(G_STATE_RUN);
	////////////////////TO DO////////////////////
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
	if(sys_state.menu === M_STATE_NONE){
		return;
	}
	else if(sys_state.menu === M_STATE_MAIN){
		SCR_drawMenu_main();
	}
	else if(sys_state.menu === M_STATE_OPTIONS){
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
SYS_checkResources
===========================================
*/
function SYS_checkResources(){
	var obj = 0,
		objComplete = 0;

	for (var i in cgs){
		for (var o in cgs[i]){
			obj++;

			if(cgs[i][o].complete || cgs[i][o].readyState == "complete" || cgs[i][o].readyState == 4)
				objComplete++;
		}
	}

	return Math.floor(objComplete/obj*100);
}
/*
===========================================
CLASS SYS_State
===========================================
*/
function SYS_State(ent_g, ent_m){
	this.game = ent_g;
	this.g_stateStack = [];

	this.menu = ent_m;
	this.m_stateStack = [];

	this.switchState = function(){
		if(this.g_stateStack.length > 0){
			this.game = this.g_stateStack[0];
			if(this.game == G_STATE_DISCONNECTED || this.game == G_STATE_CONNECTING)
				m_active = ui_s_lock;
			else if(this.game == G_STATE_CONNECTED)
				this.pushStateM(M_STATE_MAIN);
			this.g_stateStack = [];
		}
		if(this.m_stateStack.length > 0){
			this.menu = this.m_stateStack[0];
			if(this.menu == M_STATE_NONE)
				m_active = {};
			else if(this.menu == M_STATE_MAIN)
				m_active = ui_s_m_main;
			else if(this.menu == M_STATE_OPTIONS)
				m_active = ui_s_m_options;
			this.m_stateStack = [];
		}
	};

	this.pushStateG = function(state){
		this.g_stateStack = [state];
	};

	this.pushStateM = function(state){
		this.m_stateStack = [state];
	};
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

	if(m_focusItem.onclick == undefined)
		return;

	m_focusItem.onclick();
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
			return;
		}
		else if(!down && m_buttonDownItem){
			if (m_buttonDownItem == m_focusItem.id)
				UI_handleMouseClick();

			m_buttonDownItem = 0;
			return;
		}
	}

	if(!down)
		return;

	if(key == K_UPARROW){
		// To do
	}	
	else if(key == K_DOWNARROW){
		// To do
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
		if(!m_position || m_position.type!=MTYPE_INPUT)
			return;

		m_position.buffer = m_position.buffer.slice(0, -1);
		keyEvents[key] = false;
	}
	else{
		if(!m_position || m_position.type!=MTYPE_INPUT || keys_map[key] == undefined)
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
UI_lockScreen_connectAction
===========================================
*/
function UI_lockScreen_connectAction(){
	if(sys_state.game != G_STATE_DISCONNECTED){
		var data = {};

		if(net_clKey != null){
			data['k'] = net_clKey;
		} else {
			data['n'] = ui_s_lock.items[0].buffer;
			data['p'] = ui_s_lock.items[1].buffer;
		}

		CL_createPacket(data);
	}
}


ui_s_lock = {

///////////////////////////////
//LOCK SCREEN
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
			string: 'Connect',
			onclick: UI_lockScreen_connectAction
		}
	]

};
/*
===========================================
UI_mainMenu_startAction
===========================================
*/
function UI_mainMenu_startAction(){
	CL_loadThreads();
	sys_state.pushStateG(G_STATE_LOADING);
	sys_state.pushStateM(M_STATE_NONE);
}


/*
===========================================
UI_mainMenu_optionsAction
===========================================
*/
function UI_mainMenu_optionsAction(){
	sys_state.pushStateM(M_STATE_OPTIONS);
}


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
			string: 'Start',
			onclick: UI_mainMenu_startAction
		},
		{
			type: MTYPE_TEXT,
			id: 21,
			x: 20,
			y: 40,
			width: 150,
			height: 20,
			string: 'Options',
			onclick: UI_mainMenu_optionsAction
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
CL_mouseEvent
===========================================
*/
function CL_mouseEvent(){
	if (sys_state.menu != M_STATE_NONE || sys_state.game <= G_STATE_CONNECTING) {
		UI_mouseEvent();
	}
	else {
		// To do mouse event in game
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
	if (sys_state.menu != M_STATE_NONE || sys_state.game <= G_STATE_CONNECTING) {
		UI_keyEvent();
	}
	else {
		// To do key event in game
	}
}


/*
===========================================
CL_incomingEvents
===========================================
*/
function CL_incomingEvents(){
	// fetch results from server
	CL_parseServerMessage();

	// client mouse event
	CL_mouseEvent();

	// get new key events
	CL_keyEvent();
}


/*
===========================================
SCR_updateScreen
===========================================
*/
function SCR_updateScreen(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(sys_state.game <= G_STATE_CONNECTING){
		SCR_drawLockScreen();
	}
	else if(sys_state.game == G_STATE_LOADING){
		SCR_drawLoadScreen();
	}
	else if(sys_state.game == G_STATE_RUN){
		// To do
	}

	SCR_drawMenu();

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

	// client incoming events
	CL_incomingEvents();

	// send results to server
	CL_sendCmd();

	// To do prediction for other players

	// To do client side motion prediction

	// switch game and menu state
	sys_state.switchState();

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
	keyEvents[K_MOUSE] = 0;
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
	sys_state = new SYS_State(G_STATE_DISCONNECTED, M_STATE_NONE);
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