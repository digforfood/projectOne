cgs = {};
cgs.shaders = {};

cgs.shaders.v_chars =
	'attribute vec4 a_Position;\n' +
	'void main() {\n' +
	'	gl_Position = a_Position;\n' +
	'}\n';

cgs.shaders.f_chars = 
	'void main() {\n' +
	'	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
	'}\n';
