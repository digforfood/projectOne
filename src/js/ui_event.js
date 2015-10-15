/*
===========================================
UI_handleMouseEvent
===========================================
*/
function UI_handleMouseEvent(){
	for(var i =0; i < a_menu.items.length; i++){
		if(UI_isFocus(mouse_x, mouse_y, a_menu.items[i]))
			UI_setFocus(a_menu.items[i].id);
	}
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


/*
===========================================
UI_isFocus
===========================================
*/
function UI_isFocus(x, y, item){
	if(x > item.x && x < item.x + item.width && y > item.y && y < item.y + item.height){
		return true;
	}
	return false;
}

/*
===========================================
UI_setFocus
===========================================
*/
function UI_setFocus(id){
	m_focus = id;
}
