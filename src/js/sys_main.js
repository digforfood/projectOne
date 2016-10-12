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
SYS_getShader
===========================================
*/
function SYS_getShader(type, source){
	var shader = gl.createShader(type);
	
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
		alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));  
		return null;
	}

	return shader;
}
