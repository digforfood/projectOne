ui_menu = {
	stack: [],
	menu: {

///////////////////////////////
//LOGIN MENU
///////////////////////////////
		'1':{
			string: 'LOGIN',
			items: [
				{
					type: 'input',
					focus: 0,
					x: 20,
					y: 20,
					width: 150,
					height: 20,
					string: 'Login'
				},
				{
					type: 'input',
					focus: 0,
					x: 20,
					y: 40,
					width: 150,
					height: 20,
					string: 'Password'
				},
				{
					type: 'button',
					focus: 0,
					x: 20,
					y: 60,
					width: 150,
					height: 20,
					string: 'Connect'
				}
			]
		},

///////////////////////////////
//MAIN MENU
///////////////////////////////
		'2':{
			string: 'MAIN',
			items: [
				{
					type: 'text',
					focus: 1,
					x: 20,
					y: 20,
					width: 150,
					height: 20,
					string: 'Start'
				},
				{
					type: 'text',
					focus: 0,
					x: 20,
					y: 40,
					width: 150,
					height: 20,
					string: 'Settings'
				}
			]
		}
	}
};
