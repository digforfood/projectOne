/*
===========================================
SV_messageHandler
===========================================
*/
function SV_messageHandler(){
	var msg = {'m': [{'t': 2, 'b': {'k': 112233, 's': 2}}]};
	this.send(JSON.stringify(msg), function(){ /* ignore errors */ });
}
