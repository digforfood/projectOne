/*
===========================================
CL_parseCommandString
===========================================
*/
function CL_parseCommandString(data){
	// To do
}


/*
===========================================
CL_parseGamestate
===========================================
*/
function CL_parseGamestate(data){
	if(typeof data.k != "undefined")
		net_clKey = data.k;

	sys_state.pushStateG(data.s);
}


/*
===========================================
CL_parseSnapshot
===========================================
*/
function CL_parseSnapshot(data){
	// To do
}


/*
===========================================
CL_parseServerMessage
===========================================
*/
function CL_parseServerMessage(){
	if (net_inPackets.length == 0)
		return;

	var l_msg = [],
		type = 0,
		data = {};

	for(var i = 0; i < net_inPackets.length; i++){

		l_msg = net_inPackets[i].m;

		for (var j = 0; j < l_msg.length; j++) {

			type = l_msg[j].t;
			data = l_msg[j].d;

			if(type == MSG_SERVERCOMMAND){
				CL_parseCommandString(data);
			}
			else if(type == MSG_GAMESTATE){
				CL_parseGamestate(data);
			}
			else if(type == MSG_SNAPSHOT){
				CL_parseSnapshot(data);
			}
		};
	}

	net_inPackets = [];
}
