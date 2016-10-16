cgs = {};
cgs.shaders = {};

cgs.shaders.v_chars =
	'attribute vec4 aPosition;\n' +
	'void main() {\n' +
	'	gl_Position = aPosition;\n' +
	'}\n';

cgs.shaders.f_chars = 
	'void main() {\n' +
	'	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
	'}\n';
