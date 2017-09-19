/*
===========================================
CL_parseCommandString
===========================================
*/
function CL_parseCommandString(ent) {
	// To do
}


/*
===========================================
CL_parseGamestate
===========================================
*/
function CL_parseGamestate(ent) {
	if (typeof ent.k != "undefined")
		net_clKey = ent.k;

	sys_state.pushStateG(ent.s);
}


/*
===========================================
CL_parseSnapshot
===========================================
*/
function CL_parseSnapshot(ent) {
	// To do
}


/*
===========================================
CL_parseServerMessage
===========================================
*/
function CL_parseServerMessage() {
	if (net_inPackets.length == 0)
		return;

	var l_msg = [],
		type = 0,
		body = {};

	for (var i = 0; i < net_inPackets.length; i++) {

		l_msg = net_inPackets[i].m;

		for (var j = 0; j < l_msg.length; j++) {

			type = l_msg[j].t;
			body = l_msg[j].b;

			if (type == MSG_SERVERCOMMAND) {
				CL_parseCommandString(body);
			}
			else if (type == MSG_GAMESTATE) {
				CL_parseGamestate(body);
			}
			else if (type == MSG_SNAPSHOT) {
				CL_parseSnapshot(body);
			}
		};
	}

	net_inPackets = [];
}
