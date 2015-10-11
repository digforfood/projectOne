/*
===========================================
UI_handleMouseEvent
===========================================
*/
function UI_handleMouseEvent(){
	//
}


/*
===========================================
UI_mouseEvent
===========================================
*/
function UI_mouseEvent(){
	mouse_thisFrameButton = mouse_button;
	mouse_x += mouse_movement_x;
	mouse_y += mouse_movement_y;
	if (mouse_x < 0) mouse_x = 0;
	else if (mouse_x >= scr_width) mouse_x = scr_width-1;
	if (mouse_y < 0) mouse_y = 0;
	else if (mouse_y >= scr_height) mouse_y = scr_height-1;

	UI_handleMouseEvent();
	mouse_prevFrameButton = mouse_thisFrameButton;
}
