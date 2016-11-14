'use strict'
var	G_STATE_INTRO_LOADING = 0,
	G_STATE_DISCONNECTED = 1,
	G_STATE_CONNECTING = 2,
	G_STATE_CONNECTED = 3,
	G_STATE_RUN = 4,
	G_STATE_LOADING = 5,

	MSG_SERVERCOMMAND = 1,
	MSG_GAMESTATE = 2,
	MSG_SNAPSHOT = 3,

	MSG_CL_LOGIN = 0,
	MSG_CL_DATA = 1,

	M_STATE_NONE = 0,
	M_STATE_MAIN = 1,
	M_STATE_OPTIONS = 2,

	CG_GL_P_CHAR = 0,
	CG_GL_P_RECT = 1,
	CG_GL_P_PIC = 2,

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
	"59":  [';', ':', 'ж', 'Ж'],
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

var charMap = {
	"32":{"x":0,"y":0},
	"33":{"x":1,"y":0},
	"34":{"x":2,"y":0},
	"35":{"x":3,"y":0},
	"36":{"x":4,"y":0},
	"37":{"x":5,"y":0},
	"38":{"x":6,"y":0},
	"39":{"x":7,"y":0},
	"40":{"x":8,"y":0},
	"41":{"x":9,"y":0},
	"42":{"x":10,"y":0},
	"43":{"x":11,"y":0},
	"44":{"x":12,"y":0},
	"45":{"x":13,"y":0},
	"46":{"x":14,"y":0},
	"47":{"x":15,"y":0},
	"48":{"x":0,"y":1},
	"49":{"x":1,"y":1},
	"50":{"x":2,"y":1},
	"51":{"x":3,"y":1},
	"52":{"x":4,"y":1},
	"53":{"x":5,"y":1},
	"54":{"x":6,"y":1},
	"55":{"x":7,"y":1},
	"56":{"x":8,"y":1},
	"57":{"x":9,"y":1},
	"58":{"x":10,"y":1},
	"59":{"x":11,"y":1},
	"60":{"x":12,"y":1},
	"61":{"x":13,"y":1},
	"62":{"x":14,"y":1},
	"63":{"x":15,"y":1},
	"64":{"x":0,"y":2},
	"65":{"x":1,"y":2},
	"66":{"x":2,"y":2},
	"67":{"x":3,"y":2},
	"68":{"x":4,"y":2},
	"69":{"x":5,"y":2},
	"70":{"x":6,"y":2},
	"71":{"x":7,"y":2},
	"72":{"x":8,"y":2},
	"73":{"x":9,"y":2},
	"74":{"x":10,"y":2},
	"75":{"x":11,"y":2},
	"76":{"x":12,"y":2},
	"77":{"x":13,"y":2},
	"78":{"x":14,"y":2},
	"79":{"x":15,"y":2},
	"80":{"x":0,"y":3},
	"81":{"x":1,"y":3},
	"82":{"x":2,"y":3},
	"83":{"x":3,"y":3},
	"84":{"x":4,"y":3},
	"85":{"x":5,"y":3},
	"86":{"x":6,"y":3},
	"87":{"x":7,"y":3},
	"88":{"x":8,"y":3},
	"89":{"x":9,"y":3},
	"90":{"x":10,"y":3},
	"91":{"x":11,"y":3},
	"92":{"x":12,"y":3},
	"93":{"x":13,"y":3},
	"94":{"x":14,"y":3},
	"95":{"x":15,"y":3},
	"96":{"x":0,"y":4},
	"97":{"x":1,"y":4},
	"98":{"x":2,"y":4},
	"99":{"x":3,"y":4},
	"100":{"x":4,"y":4},
	"101":{"x":5,"y":4},
	"102":{"x":6,"y":4},
	"103":{"x":7,"y":4},
	"104":{"x":8,"y":4},
	"105":{"x":9,"y":4},
	"106":{"x":10,"y":4},
	"107":{"x":11,"y":4},
	"108":{"x":12,"y":4},
	"109":{"x":13,"y":4},
	"110":{"x":14,"y":4},
	"111":{"x":15,"y":4},
	"112":{"x":0,"y":5},
	"113":{"x":1,"y":5},
	"114":{"x":2,"y":5},
	"115":{"x":3,"y":5},
	"116":{"x":4,"y":5},
	"117":{"x":5,"y":5},
	"118":{"x":6,"y":5},
	"119":{"x":7,"y":5},
	"120":{"x":8,"y":5},
	"121":{"x":9,"y":5},
	"122":{"x":10,"y":5},
	"123":{"x":11,"y":5},
	"124":{"x":12,"y":5},
	"125":{"x":13,"y":5},
	"126":{"x":14,"y":5},
	"1025":{"x":8,"y":8},
	"1040":{"x":0,"y":10},
	"1041":{"x":1,"y":10},
	"1042":{"x":2,"y":10},
	"1043":{"x":3,"y":10},
	"1044":{"x":4,"y":10},
	"1045":{"x":5,"y":10},
	"1046":{"x":6,"y":10},
	"1047":{"x":7,"y":10},
	"1048":{"x":8,"y":10},
	"1049":{"x":9,"y":10},
	"1050":{"x":10,"y":10},
	"1051":{"x":11,"y":10},
	"1052":{"x":12,"y":10},
	"1053":{"x":13,"y":10},
	"1054":{"x":14,"y":10},
	"1055":{"x":15,"y":10},
	"1056":{"x":0,"y":11},
	"1057":{"x":1,"y":11},
	"1058":{"x":2,"y":11},
	"1059":{"x":3,"y":11},
	"1060":{"x":4,"y":11},
	"1061":{"x":5,"y":11},
	"1062":{"x":6,"y":11},
	"1063":{"x":7,"y":11},
	"1064":{"x":8,"y":11},
	"1065":{"x":9,"y":11},
	"1066":{"x":10,"y":11},
	"1067":{"x":11,"y":11},
	"1068":{"x":12,"y":11},
	"1069":{"x":13,"y":11},
	"1070":{"x":14,"y":11},
	"1071":{"x":15,"y":11},
	"1072":{"x":0,"y":12},
	"1073":{"x":1,"y":12},
	"1074":{"x":2,"y":12},
	"1075":{"x":3,"y":12},
	"1076":{"x":4,"y":12},
	"1077":{"x":5,"y":12},
	"1078":{"x":6,"y":12},
	"1079":{"x":7,"y":12},
	"1080":{"x":8,"y":12},
	"1081":{"x":9,"y":12},
	"1082":{"x":10,"y":12},
	"1083":{"x":11,"y":12},
	"1084":{"x":12,"y":12},
	"1085":{"x":13,"y":12},
	"1086":{"x":14,"y":12},
	"1087":{"x":15,"y":12},
	"1088":{"x":0,"y":13},
	"1089":{"x":1,"y":13},
	"1090":{"x":2,"y":13},
	"1091":{"x":3,"y":13},
	"1092":{"x":4,"y":13},
	"1093":{"x":5,"y":13},
	"1094":{"x":6,"y":13},
	"1095":{"x":7,"y":13},
	"1096":{"x":8,"y":13},
	"1097":{"x":9,"y":13},
	"1098":{"x":10,"y":13},
	"1099":{"x":11,"y":13},
	"1100":{"x":12,"y":13},
	"1101":{"x":13,"y":13},
	"1102":{"x":14,"y":13},
	"1103":{"x":15,"y":13},
	"1105":{"x":8,"y":9},
	"8470":{"x":9,"y":9}
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

	cg_glPrograms,
	cg_glCurrentProgram,
	cg_glTextures,
	cg_glCurrentTextures,
	cg_glActiveTexture,

	sys_state,
	cgs,

	socket,
	net_clKey,
	net_buf, //To do
	net_inPackets,
	net_outPacket,
	net_lastPacketSentTime,

	fps,
	canvas,
	gl,
	correntTime,
	deltaMilliseconds,
	prevFrameTime,
	thisFrameTime;

/*
===========================================
CG_drawRect
===========================================
*/
function CG_drawRect(x, y, width, height, color) {
	var program = CG_setProgram(CG_GL_P_RECT);
	gl.bindBuffer(gl.ARRAY_BUFFER, program.rect);
	gl.vertexAttribPointer(program.aPosition, 2, gl.FLOAT, false, 0, 0);

	gl.uniform4f(program.uColor, color[0], color[1], color[2], 1);
	gl.uniform4f(program.uDest, x, y, width, height);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


/*
===========================================
CG_drawPic
===========================================
*/
function CG_drawPic(img, x, y, width, height) {
	var program = CG_setProgram(CG_GL_P_PIC);

	CG_bindTextures(program, img);

	gl.bindBuffer(gl.ARRAY_BUFFER, program.rect);
	gl.vertexAttribPointer(program.aPosition, 2, gl.FLOAT, false, 0, 0);

	gl.uniform4f(program.uDest, x, y, width, height);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


/*
===========================================
CG_drawChar
===========================================
*/
function CG_drawChar(char, x, y, size) {
	var program = CG_setProgram(CG_GL_P_CHAR);

	if (!size) {
		size = 12;
	}

	CG_bindTextures(program, cg_glTextures['char']);

	gl.bindBuffer(gl.ARRAY_BUFFER, program.rect);
	gl.vertexAttribPointer(program.aPosition, 2, gl.FLOAT, false, 0, 0);

	gl.uniform2f(program.uCharacter, charMap[char].x, charMap[char].y);
	gl.uniform2f(program.uDest, x, y);
	gl.uniform1f(program.uSize, size);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


/*
===========================================
CG_drawString
===========================================
*/
function CG_drawString(str, x, y, size) {
	var i = 0,
		char = 0;

	if (!size) {
		size = 12;
	}

	for (i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);
		CG_drawChar(char, x, y, size);

		x += size;
	}
}
/*
===========================================
CG_getOrtho2D
===========================================
*/
function CG_getOrtho2D(left,right,bottom,top) {
	var near = -1,
		far = 1,
		rl = right-left,
		tb = top-bottom,
		fn = far-near;

	return [2/rl,				0,					0,				0,
			0,					2/tb,				0,				0,
			0,					0,					-2/fn,			0,
			-(right+left)/rl,	-(top+bottom)/tb,	-(far+near)/fn,	1];
}


/*
===========================================
CG_setOrtho2D
===========================================
*/
function CG_setOrtho2D() {
	var glOrtho = CG_getOrtho2D(0, scr_width, scr_height, 0),
		program = [];

	for (var i = 0; i < cg_glPrograms.length; i++) {
		program = cg_glPrograms[i];

		if (program.uOrtho == null){
			continue;
		}

		gl.useProgram(program.gl_p);
		gl.uniformMatrix4fv(program.uOrtho, false, glOrtho);
	}
}


/*
===========================================
CG_setTextures
===========================================
*/
function CG_setTextures() {
	CG_createTexture('char', cgs.media.textures.chars);
	CG_createTexture('cursor', cgs.media.sprites.cursor);

	////////////////////TO DO////////////////////
}


/*
===========================================
CG_getShader
===========================================
*/
function CG_getShader(type, source) {
	var shader = gl.createShader(type);
	
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
		alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));  
		return null;
	}

	return shader;
}


/*
===========================================
CG_setProgram
===========================================
*/
function CG_setProgram(id) {
	var i = 0,
		j = 0,
		obj_program = cg_glCurrentProgram;

	if (obj_program != null) {
		if (obj_program.id === id) {
			return obj_program;
		}

		for (i = 0; i < obj_program.attr.length; i++) {
			gl.disableVertexAttribArray(obj_program[obj_program.attr[i]]);
		}
	}

	for (i = 0; i < cg_glPrograms.length; i++) {
		obj_program = cg_glPrograms[i];
		if (obj_program.id === id) {
			cg_glCurrentProgram = obj_program;
			gl.useProgram(obj_program.gl_p);

			for (j = 0; j < obj_program.attr.length; j++) {
				gl.enableVertexAttribArray(obj_program[obj_program.attr[j]]);
			}

			return obj_program;
		}
	}
}


/*
===========================================
CG_bindTextures
===========================================
*/
function CG_bindTextures(program, texture) {
	if (cg_glCurrentTextures[program] !== texture) {
		if (cg_glActiveTexture !== program) {
			cg_glActiveTexture = program;
			gl.activeTexture(gl.TEXTURE0);
		}

		cg_glCurrentTextures[program] = texture;
		gl.bindTexture(gl.TEXTURE_2D, texture);
	}
}


/*
===========================================
CG_createTexture
===========================================
*/
function CG_createTexture(id, img) {
	var texture = gl.createTexture();

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
	gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

	cg_glTextures[id] = texture;
}


/*
===========================================
CG_createProgram
===========================================
*/
function CG_createProgram(id, v_shader, f_shader, uniforms, attr, textures) {
	var i = 0,
		obj_program = {},
		vertexShader = {},
		fragmentShader = {};

	obj_program.id = id;
	obj_program.gl_p = gl.createProgram();
	obj_program.attr = [];

	/////
	obj_program.rect = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, obj_program.rect);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
	/////

	vertexShader = CG_getShader(gl.VERTEX_SHADER, v_shader);
	fragmentShader = CG_getShader(gl.FRAGMENT_SHADER, f_shader);

	gl.attachShader(obj_program.gl_p, vertexShader);
	gl.attachShader(obj_program.gl_p, fragmentShader);
	gl.linkProgram(obj_program.gl_p);
	gl.useProgram(obj_program.gl_p);

	for (i = 0; i < uniforms.length; i++) {
		obj_program[uniforms[i]] = gl.getUniformLocation(obj_program.gl_p, uniforms[i]);
	}

	for (i = 0; i < attr.length; i++) {
		obj_program.attr[obj_program.attr.length] = attr[i];
		obj_program[attr[i]] = gl.getAttribLocation(obj_program.gl_p, attr[i]);
	}

	for (i = 0; i < textures.length; i++) {
		obj_program[textures[i]] = i;
		gl.uniform1i(gl.getUniformLocation(obj_program.gl_p, textures[i]), i);
	}

	cg_glPrograms[cg_glPrograms.length] = obj_program;
}


/*
===========================================
CG_init
===========================================
*/
function CG_init() {
	cg_glPrograms = [];
	cg_glCurrentProgram = null;
	cg_glTextures = {};
	cg_glCurrentTextures = [];
	cg_glActiveTexture = null;

	CG_createProgram(CG_GL_P_CHAR, cgs.shaders.v_chars, cgs.shaders.f_chars, ['uCharacter', 'uDest', 'uOrtho', 'uSize'], ['aPosition'], ['tTexture']);
	CG_createProgram(CG_GL_P_RECT, cgs.shaders.v_rect, cgs.shaders.f_rect, ['uDest', 'uOrtho', 'uColor'], ['aPosition'], []);
	CG_createProgram(CG_GL_P_PIC, cgs.shaders.v_pic, cgs.shaders.f_pic, ['uDest', 'uOrtho'], ['aPosition'], []);

	CG_setOrtho2D();
}
/*
===========================================
CL_loadThreads
===========================================
*/
function CL_loadThreads(){
	if (sys_state.game == G_STATE_INTRO_LOADING) {
		cgs.media = {};
		// To do start load thread audio
		// cgs.media.audio = {};
		// cgs.media.audio.menu = new Audio('https://cs1-50v4.vk-cdn.net/p18/85e3f0113e9ac8.mp3');

		// To do start load thread sprites
		cgs.media.sprites = {};
		cgs.media.sprites.cursor = new Image();
		cgs.media.sprites.cursor.src = 'static/media/sprites/cursor.png';

		cgs.media.sprites.test = new Image();
		cgs.media.sprites.test.src = 'https://arkesoul.files.wordpress.com/2015/09/fsociety.jpg';

		// To do start load thread textures
		cgs.media.textures = {};
		cgs.media.textures.chars = new Image();
		cgs.media.textures.chars.src = 'static/media/sprites/font.bmp';
	}
	else {
		// cgs.media.audio.test = new Audio('https://psv4.vk.me/c4423/u14378279/audios/36982d737b30.mp3');

		cgs.media.sprites.test = new Image();
		cgs.media.sprites.test.src = 'https://arkesoul.files.wordpress.com/2015/09/fsociety.jpg';
	}
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
		evBufLen = net_buf.ev.length;

	if(ent != undefined){
		msg.t = MSG_CL_LOGIN;
		msg.b = ent;
	}
	else if(net_clKey != null){
		msg.t = MSG_CL_DATA;
		msg.b['k'] = net_clKey;

		if(evBufLen > 0){
			msg.b['e'] = [];

			for(var i=0; i<evBufLen; i++){
				msg.b['e'].push(net_buf.ev[i]);
			}

			net_buf.ev = [];
		}

		if(net_buf.mouse.length>0){
			msg.b['m'] = net_buf.mouse;
			net_buf.mouse = '';
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
cgs = {};
cgs.shaders = {};


/*
===========================================
Shader CG_GL_P_RECT
===========================================
*/
cgs.shaders.v_rect =
	'uniform vec4 uDest;\n' +
	'uniform mat4 uOrtho;\n' +
	'attribute vec2 aPosition;\n' +
	'void main(){\n' +
	'	gl_Position = uOrtho * vec4(aPosition * uDest.zw + uDest.xy, 0.0, 1.0);\n' +
	'}\n';

cgs.shaders.f_rect =
	'precision mediump float;\n' +
	'uniform vec4 uColor;\n' +
	'void main() {\n' +
	'	gl_FragColor = vec4(uColor.rgb * (1.0 / 255.0), uColor.a);\n' +
	'}\n';


/*
===========================================
Shader CG_GL_P_CHAR
===========================================
*/
cgs.shaders.v_chars =
	'uniform vec2 uCharacter;\n' +
	'uniform vec2 uDest;\n' +
	'uniform mat4 uOrtho;\n' +
	'uniform float uSize;\n' +
	'attribute vec2 aPosition;\n' +
	'varying vec2 vTexCoord;\n' +
	'void main(){\n' +
	'	gl_Position = uOrtho * vec4(aPosition * uSize + uDest, 0.0, 1.0);\n' +
	'	vTexCoord = (aPosition + uCharacter) * 0.0625;\n' +
	'}\n';

cgs.shaders.f_chars =
	'precision mediump float;\n' +
	'uniform sampler2D tTexture;\n' +
	'varying vec2 vTexCoord;\n' +
	'void main() {\n' +
	'	gl_FragColor = texture2D(tTexture, vTexCoord);\n' +
	'}\n';


/*
===========================================
Shader CG_GL_P_PIC
===========================================
*/
cgs.shaders.v_pic =
	'uniform vec4 uDest;\n' +
	'uniform mat4 uOrtho;\n' +
	'attribute vec2 aPosition;\n' +
	'varying vec2 vTexCoord;\n' +
	'void main(){\n' +
	'	gl_Position = uOrtho * vec4(aPosition * uDest.zw + uDest.xy, 0.0, 1.0);\n' +
	'	vTexCoord = aPosition;\n' +
	'}\n';

cgs.shaders.f_pic = 
	'precision mediump float;\n' +
	'uniform sampler2D tTexture;\n' +
	'varying vec2 vTexCoord;\n' +
	'void main() {\n' +
	'	gl_FragColor = texture2D(tTexture, vTexCoord);\n' +
	'}\n';
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
	net_inPackets = [];
	net_buf = {ev: [], mouse: ''};
}

/*
===========================================
NET_connect
===========================================
*/
function NET_connect(){
	socket = new WebSocket("ws://devhub.mrdoe.ru:443");

	socket.onopen = function(){
		console.log('onopen');

		sys_state.pushStateG(G_STATE_CONNECTING);
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
}
/*
===========================================
SCR_drawField_input
===========================================
*/
function SCR_drawField_input(elem){
	if (m_position && m_position.id == elem.id) {
		CG_drawRect(elem.x, elem.y, 150, 15, [252, 122, 19]);
	}

	// gl.fillStyle = 'rgb(0, 0, 0)';
	CG_drawString( ((elem.buffer && elem.buffer.length)? elem.buffer : elem.string), elem.x+5, elem.y+8 );
}


/*
===========================================
SCR_drawField_button
===========================================
*/
function SCR_drawField_button(elem){
	if(sys_state.game == G_STATE_DISCONNECTED){
		CG_drawRect(elem.x, elem.y, 150, 15, [106, 121, 137]);
	}
	else{
		CG_drawRect(elem.x, elem.y, 150, 15, [252, 2, 2]);
	}

	CG_drawString(elem.string, elem.x+5, elem.y+8);
}


/*
===========================================
SCR_drawLockScreen
===========================================
*/
function SCR_drawLockScreen(){
	// gl.fillStyle = 'rgb(136, 197, 198)';		// background
	// gl.fillRect (0, 0, scr_width, scr_height); //
	CG_drawRect(0, 0, scr_width, scr_height, [136, 197, 198]);

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
	var loadStatus = SYS_checkResources();

	CG_drawRect(10, scr_height - 30, (scr_width-20)*loadStatus/100, 20, [255, 255, 255]);


	if(loadStatus != 100)
		return;

	CG_setTextures();

	////////////////////TO DO////////////////////	
	if (sys_state.game == G_STATE_INTRO_LOADING) {
		sys_state.pushStateG(G_STATE_DISCONNECTED);
		// NET_connect();
	}
	else {
		sys_state.pushStateG(G_STATE_RUN);
	}
	////////////////////TO DO////////////////////
}


/*
===========================================
SCR_drawMenu_main
===========================================
*/
function SCR_drawMenu_main(){
	// gl.fillStyle = 'rgb(136, 197, 198)';		// background
	// gl.fillRect (0, 0, scr_width, scr_height); //

	for (var i = 0; i < m_active.items.length; i++) {
		if (m_position && m_position.id == m_active.items[i].id) {
			gl.fillStyle = 'rgb(252, 122, 19)';
			gl.fillRect(m_active.items[i].x, m_active.items[i].y, 150, 15);
		}

		gl.fillStyle = 'rgb(0, 0, 0)';
		gl.fillText(m_active.items[i].string, m_active.items[i].x+5, m_active.items[i].y+12);
	}
}

/*
===========================================
SCR_drawMenu_options
===========================================
*/
function SCR_drawMenu_options(){
	// gl.fillStyle = 'rgb(136, 197, 198)';		// background
	// gl.fillRect (0, 0, scr_width, scr_height); //
}


/*
===========================================
SCR_drawMenu
===========================================
*/
function SCR_drawMenu(){
	if(sys_state.menu === M_STATE_NONE) {
		return;
	}
	else if(sys_state.menu === M_STATE_MAIN) {
		SCR_drawMenu_main();
	}
	else if(sys_state.menu === M_STATE_OPTIONS) {
		SCR_drawMenu_options();
	}
}


/*
===========================================
SCR_drawFPS
===========================================
*/
function SCR_drawFPS(){
	if(sys_state.game == G_STATE_INTRO_LOADING) {
		return;
	}

	thisfpstime = new Date();
	if ((thisfpstime - lastfpstime) >= 1000) {
		lastfps = fps_count;
		fps_count = 0;
		lastfpstime = thisfpstime;
	}
	// gl.font = '12px serif';
	// gl.fillStyle = 'rgb(0, 0, 0)';
	CG_drawString('FPS: ' + lastfps, canvas.width - 75, 17, 10);
	CG_drawString('m_x: ' + mouse_x, canvas.width - 75, 29, 10);
	CG_drawString('m_y: ' + mouse_y, canvas.width - 75, 41, 10);
	CG_drawString('m_b: ' + keyEvents['m_b'], canvas.width - 75, 53, 10);
	fps_count++;
}


/*
===========================================
SCR_drawСursor
===========================================
*/
function SCR_drawСursor(){
	if(sys_state.game == G_STATE_INTRO_LOADING) {
		return;
	}

	CG_drawPic(cg_glTextures['cursor'], mouse_x, mouse_y, 16, 16);
	// To do draw cursor
	// gl.drawImage(cgs.sprites.cursor, 3, 0, 13, 16, mouse_x, mouse_y, 13, 16);
}
/*
===========================================
SYS_checkResources
===========================================
*/
function SYS_checkResources(){
	var obj = 0,
		objComplete = 0;

	for (var i in cgs.media){
		for (var o in cgs.media[i]){
			obj++;

			if(cgs.media[i][o].complete || cgs.media[i][o].readyState == "complete" || cgs.media[i][o].readyState == 4)
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
	gl.clear(gl.COLOR_BUFFER_BIT);

	if( sys_state.game == G_STATE_INTRO_LOADING || sys_state.game == G_STATE_LOADING){
		SCR_drawLoadScreen();
	}
	else if(sys_state.game <= G_STATE_CONNECTING){
		SCR_drawLockScreen();
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
	gl = canvas.getContext('webgl');
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
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

		return false;
	};
	document.onkeyup = function(e){
		if (!e) e = window.event;
		keyEvents[e.keyCode] = false;

		return false;
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
	sys_state = new SYS_State(G_STATE_INTRO_LOADING, M_STATE_NONE);
	m_active = ui_s_lock;
	canvasInit();

	CG_init();

	NET_init();

	CL_loadThreads();

	fps_count = 0;
	lastfps = 0;
	lastfpstime = new Date();
	
	thisFrameTime = new Date();

	controlEventsInit();
	
	gameLoop();
}

main();