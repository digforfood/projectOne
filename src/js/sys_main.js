/*
===========================================
SYS_checkResources
===========================================
*/
function SYS_checkResources(){
	var obj = 0,
		objComplete = 0;

	for (var i in cgs){
		for (var o in cgs[i]){
			obj++;

			if(cgs[i][o].complete || cgs[i][o].readyState == "complete" || cgs[i][o].readyState == 4)
				objComplete++;
		}
	}

	return Math.floor(objComplete/obj*100);
}
