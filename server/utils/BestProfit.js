const Big = require('big.js')
const luxon = require('luxon');

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
	// TODO: sort the items by time
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
				if(!result || result.profit < diff){
					result={
						buy: {time: luxon.DateTime.fromFormat(item.time, 'HHmm').toJSON(),
					price: item.price},
						sell: {time: luxon.DateTime.fromFormat(itemNext.time, 'HHmm').toJSON(),
						price: itemNext.price},
						profit: diff
					};
				}
			}
		}
	}
	return result;
}

module.exports = Best;