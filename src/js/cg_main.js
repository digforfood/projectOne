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
