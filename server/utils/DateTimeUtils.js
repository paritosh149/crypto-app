function isValidTime(inputStr){
	if (!inputStr || inputStr.length!==4) {return false;}
    var time = inputStr.match(/.{1,2}/g);
    return time.length === 2 
           && parseInt(time[0],10)>=0 
           && parseInt(time[0],10)<=23 
           && parseInt(time[1],10)>=0 
           && parseInt(time[1],10)<=59;
}
function isValidTick(dataItem){
	return (dataItem && isValidTime(dataItem.time) && !isNaN(dataItem.price));
}

module.exports = {isValidTick, isValidTime }