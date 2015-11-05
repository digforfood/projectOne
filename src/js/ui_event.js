/*
===========================================
UI_rectContainsPoint
===========================================
*/
function UI_rectContainsPoint(x, y, item){
	if(x > item.x && x < item.x + item.width && y > item.y && y < item.y + item.height){
		return true;
	}
	return false;
}


/*
===========================================
UI_handleMouseMoveEvent
===========================================
*/
function UI_handleMouseMoveEvent(){
	m_focusItem = {};

	for(var i =0; i < m_active.items.length; i++){
		if(UI_rectContainsPoint(mouse_x, mouse_y, m_active.items[i])){
			m_focusItem = m_active.items[i];
			if(m_active.items[i].type == MTYPE_TEXT)
				m_position = m_active.items[i];
		}
	}
}


/*
===========================================
UI_mouseEvent
===========================================
*/
function UI_mouseEvent(){
	mouse_x += mouse_movement_x;
	mouse_y += mouse_movement_y;
	if (mouse_x < 0) mouse_x = 0;
	else if (mouse_x >= scr_width) mouse_x = scr_width-1;
	if (mouse_y < 0) mouse_y = 0;
	else if (mouse_y >= scr_height) mouse_y = scr_height-1;

	UI_handleMouseMoveEvent();
}


/*
===========================================
UI_handleMouseClick
===========================================
*/
function UI_handleMouseClick(){
	if (m_focusItem.type == MTYPE_TEXT) {
		//
	}
	else if (m_focusItem.type == MTYPE_INPUT) {
		m_position = m_focusItem;
	}
}


/*
===========================================
UI_handleKeyEvent
===========================================
*/
function UI_handleKeyEvent(key, down){
	if(key == K_MOUSE){
		if(down && !m_buttonDownItem && m_focusItem){
			m_buttonDownItem = m_focusItem.id;
		}
		else if(!down && m_buttonDownItem){
			if (m_buttonDownItem == m_focusItem.id)
				UI_handleMouseClick();

			m_buttonDownItem = 0;
		}
	}

	if(!down)
		return;

	if(key == K_UPARROW){
		//
	}	
	else if(key == K_DOWNARROW){
		//
	}
	else if(key == K_ALT){
		if(keyEvents[K_SHIFT]){
			if(ui_langSet == LANG_EN)
				ui_langSet = LANG_RU;
			else
				ui_langSet = LANG_EN;
			keyEvents[key] = false;
		}
	}
	else if(key == K_BACKSPACE){
		if(m_position.type!=MTYPE_INPUT)
			return;

		m_position.buffer = m_position.buffer.slice(0, -1);
		keyEvents[key] = false;
	}
	else if( (key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 187 && key <= 192) || (key >= 219 && key <= 222) ){
		if(m_position.type!=MTYPE_INPUT)
			return;

		keyEvents[key] = false;
		if(keyEvents[K_SHIFT])
			m_position.buffer += keys_map[key][ui_langSet+1];
		else
			m_position.buffer += keys_map[key][ui_langSet];
	}
}


/*
===========================================
UI_keyEvent
===========================================
*/
function UI_keyEvent(){
	for(var key in keyEvents){
		UI_handleKeyEvent(key, keyEvents[key]);
	}
}
