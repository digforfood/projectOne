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
