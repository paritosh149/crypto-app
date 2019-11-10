const Big = require('big.js')
const luxon = require('luxon');

const { isValidTick } = require('./DateTimeUtils')

const TIME_FORMAT = 'HHmm'

function best(dataArray) {

	dataArr = dataArray.sort((a, b) => {
		if (a.time > b.time) return 1;
		if (a.time < b.time) return -1;
		return 0;
	});
	let result = void 0;
	const capacity = dataArr.length;
	for (i = 0; i < capacity - 1; i++) {
		if (isValidTick(dataArr[i]))
			item = dataArr[i];
		else
			continue;
		for (k = i + 1; k < capacity; k++) {
			if (isValidTick(dataArr[k]))
				itemNext = dataArr[k];
			else
				continue;
			if (itemNext.price > item.price) {
				diff = Number(Big(itemNext.price).minus(item.price));
				if (!result || result.profit < diff) {
					result = {
						buy: {
							time: luxon.DateTime.fromFormat(item.time, TIME_FORMAT).toJSON(),
							price: item.price
						},
						sell: {
							time: luxon.DateTime.fromFormat(itemNext.time, TIME_FORMAT).toJSON(),
							price: itemNext.price
						},
						profit: diff
					};
				}
			}
		}
	}
	return result;
}

module.exports = { best };