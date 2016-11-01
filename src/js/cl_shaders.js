cgs = {};
cgs.shaders = {};

cgs.shaders.v_chars =
	'uniform vec2 uDest;\n' +
	'uniform mat4 uOrtho;\n' +
	'attribute vec2 aPosition;\n' +
	'void main(){\n' +
	'	gl_Position = uOrtho * vec4(aPosition * 8.0 + uDest, 0.0, 1.0);\n' +
	'}\n';

cgs.shaders.f_chars = 
	'void main() {\n' +
	'	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
	'}\n';
