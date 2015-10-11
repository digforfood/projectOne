var	ui_menu = {
	stack: [],
	menu: [

///////////////////////////////
//LOGIN MENU
///////////////////////////////
		{
			string: 'LOGIN',
			children: [
				{
					type: 'input',
					focus: 0,
					x: 20,
					y: 20,
					string: 'Login'
				},
				{
					type: 'input',
					focus: 0,
					x: 20,
					y: 40,
					string: 'Password'
				},
				{
					type: 'button',
					focus: 0,
					x: 20,
					y: 60,
					string: 'Connect'
				}
			]
		},

///////////////////////////////
//MAIN MENU
///////////////////////////////
		{
			string: 'MAIN',
			children: [
				{
					type: 'text',
					focus: 1,
					x: 20,
					y: 20,
					string: 'Start'
				},
				{
					type: 'text',
					focus: 0,
					x: 20,
					y: 40,
					string: 'Settings'
				}
			]
		}
	]
};
