const Big = require('big.js')

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
function Best(dataArr){
	let result = void 0;
	const capacity = dataArr.length;
	for(i=0;i<capacity-1;i++){
		if(isValidTick(dataArr[i]))
			item = dataArr[i];
		else
			continue;
		for(k=i+1;k<capacity;k++){
			if(isValidTick(dataArr[k]))
				itemNext = dataArr[k];
			else
				continue;
			if(itemNext.price > item.price){
				diff=Number(Big(itemNext.price).minus(item.price));
				if(!result || result.diff < diff)
					result={item,itemNext,diff};
			}
		}
	}
	return result;
}

module.exports = Best;