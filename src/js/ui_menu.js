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
					id: 10,
					x: 20,
					y: 20,
					width: 150,
					height: 20,
					string: 'Login'
				},
				{
					type: 'input',
					id: 11,
					x: 20,
					y: 40,
					width: 150,
					height: 20,
					string: 'Password'
				},
				{
					type: 'button',
					id: 12,
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
					id: 20,
					x: 20,
					y: 20,
					width: 150,
					height: 20,
					string: 'Start'
				},
				{
					type: 'text',
					id: 21,
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
