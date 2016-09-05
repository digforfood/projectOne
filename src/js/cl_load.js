/*
===========================================
CL_loadThreads
===========================================
*/
function CL_loadThreads(){
	if (sys_state.game == G_STATE_INTRO_LOADING) {
		cgs = {};

		// To do start load thread audio
		cgs.audio = {};
		cgs.audio.menu = new Audio('https://cs1-50v4.vk-cdn.net/p18/85e3f0113e9ac8.mp3');

		// To do start load thread sprites
		cgs.sprites = {};
		cgs.sprites.cursor = new Image();
		cgs.sprites.cursor.src = 'http://findicons.com/files/icons/1156/fugue/16/cursor.png';
	}
	else {
		cgs.audio.test = new Audio('https://psv4.vk.me/c4423/u14378279/audios/36982d737b30.mp3');

		cgs.sprites.test = new Image();
		cgs.sprites.test.src = 'https://arkesoul.files.wordpress.com/2015/09/fsociety.jpg';
	}
}
