/*
===========================================
SYS_checkResources
===========================================
*/
function SYS_checkResources(){
	var obj = 0,
		objComplete = 0;

	for (var i in cgs.media){
		for (var o in cgs.media[i]){
			obj++;

			if(cgs.media[i][o].complete || cgs.media[i][o].readyState == "complete" || cgs.media[i][o].readyState == 4)
				objComplete++;
		}
	}

	return Math.floor(objComplete/obj*100);
}
