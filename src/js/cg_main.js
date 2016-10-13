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
	//
}


/*
===========================================
CG_createProgram
===========================================
*/
function CG_createProgram(){
	//
}


/*
===========================================
CG_init
===========================================
*/
function CG_init(){
	//
}
