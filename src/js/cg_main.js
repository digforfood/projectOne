/*
===========================================
CG_getShader
===========================================
*/
function CG_getShader(type, source){
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
function CG_setProgram(id){
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
CG_createProgram
===========================================
*/
function CG_createProgram(id, v_shader, f_shader, attr){
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

	for (i = 0; i < attr.length; i++) {
		obj_program.attr[obj_program.attr.length] = attr[i];
		obj_program[attr[i]] = gl.getAttribLocation(obj_program.gl_p, attr[i]);
	}

	cg_glPrograms[cg_glPrograms.length] = obj_program;
}


/*
===========================================
CG_init
===========================================
*/
function CG_init(){
	cg_glPrograms = [];
	cg_glCurrentProgram = null;

	CG_createProgram(0, cgs.shaders.v_chars, cgs.shaders.f_chars, ['aPosition']);
}
