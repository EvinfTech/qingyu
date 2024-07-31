export const formatTime = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};
export const formatNumber = (n) => {
	const s = n.toString();
	return s[1] ? s : '0' + s;
};
export const Rad = (d) => {
	return (d * Math.PI) / 180;
};
// 计算距离
export const calcDistance = (lat1, lng1, lat2, lng2) => {
	var radLat1 = Rad(lat1);
	var radLat2 = Rad(lat2);
	var a = radLat1 - radLat2;
	var b = Rad(lng1) - Rad(lng2);
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000) / 10000;
	if (s < 1) {
		s = s.toFixed(3) * 1000 + ' m'; //保留小数
		return s;
	} else {
		s = s.toFixed(1) + ' km'; //保留小数
		return s;
	}
};
export const getNowDate = (devide) => {
	let date = new Date();
	let year = date.getFullYear();
	let month = formatNumber(date.getMonth() + 1);
	let day = formatNumber(date.getDate());
	return `${year}${devide}${month}${devide}${day}`;
};
export const groupBy = (arr, property) => {
	return arr.reduce(function (cur, obj) {
		var key = obj[property];
		if (!cur[key]) {
			cur[key] = [];
		}
		cur[key].push(obj);
		return cur;
	}, {});
};
export const randomString = () => {
	let len = 32;
	let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	let maxPos = chars.length;
	let character = '';
	for (let i = 0; i < len; i++) {
		character += chars.charAt(Math.floor(Math.random() * maxPos))
	}
	return character;
};
