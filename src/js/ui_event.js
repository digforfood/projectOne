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
			m_activeItem = m_active.items[i].id;
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
	//
}


/*
===========================================
UI_handleMouseKeyEvent
===========================================
*/
function UI_handleMouseKeyEvent(ent){
	if(ent && !m_buttonDownItem && m_focusItem){
		m_buttonDownItem = m_focusItem.id;
	}
	else if(!ent && m_buttonDownItem){
		if (m_buttonDownItem == m_focusItem.id)
			UI_handleMouseClick();

		m_buttonDownItem = 0;
	}
}


/*
===========================================
UI_handleKeyboardKeyEvent
===========================================
*/
function UI_handleKeyboardKeyEvent(){
	//
}


/*
===========================================
UI_keyEvent
===========================================
*/
function UI_keyEvent(){
	for(var key in keyEvents){
		if(key == 'm_b'){
			UI_handleMouseKeyEvent(keyEvents[key]);
		}
		else{
			UI_handleKeyboardKeyEvent();
		}
	}
}
