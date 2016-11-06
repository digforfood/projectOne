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
	'void main() {\n' +
	'	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n' +
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
	'attribute vec2 aPosition;\n' +
	'varying vec2 vTexCoord;\n' +
	'void main(){\n' +
	'	gl_Position = uOrtho * vec4(aPosition * 8.0 + uDest, 0.0, 1.0);\n' +
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
