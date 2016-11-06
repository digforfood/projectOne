/*
===========================================
CL_loadThreads
===========================================
*/
function CL_loadThreads(){
	if (sys_state.game == G_STATE_INTRO_LOADING) {
		cgs.media = {};
		// To do start load thread audio
		// cgs.media.audio = {};
		// cgs.media.audio.menu = new Audio('https://cs1-50v4.vk-cdn.net/p18/85e3f0113e9ac8.mp3');

		// To do start load thread sprites
		cgs.media.sprites = {};
		cgs.media.sprites.cursor = new Image();
		cgs.media.sprites.cursor.src = 'static/media/sprites/cursor.png';

		cgs.media.sprites.test = new Image();
		cgs.media.sprites.test.src = 'http://rutravel.net/uploads/posts/2015-03/1426435026_moscow_map-20.jpg';

		// To do start load thread textures
		cgs.media.textures = {};
		cgs.media.textures.chars = new Image();
		cgs.media.textures.chars.src = 'static/media/sprites/font.bmp';
	}
	else {
		// cgs.media.audio.test = new Audio('https://psv4.vk.me/c4423/u14378279/audios/36982d737b30.mp3');

		cgs.media.sprites.test = new Image();
		cgs.media.sprites.test.src = 'https://arkesoul.files.wordpress.com/2015/09/fsociety.jpg';
	}
}
