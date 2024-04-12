"use strict";
const formatNumber = (n) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};
const Rad = (d) => {
  return d * Math.PI / 180;
};
const calcDistance = (lat1, lng1, lat2, lng2) => {
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 1e4) / 1e4;
  if (s < 1) {
    s = s.toFixed(3) * 1e3 + " m";
    return s;
  } else {
    s = s.toFixed(1) + " km";
    return s;
  }
};
const getNowDate = (devide) => {
  let date = /* @__PURE__ */ new Date();
  let year = date.getFullYear();
  let month = formatNumber(date.getMonth() + 1);
  let day = formatNumber(date.getDate());
  return `${year}${devide}${month}${devide}${day}`;
};
const groupBy = (arr, property) => {
  return arr.reduce(function(cur, obj) {
    var key = obj[property];
    if (!cur[key]) {
      cur[key] = [];
    }
    cur[key].push(obj);
    return cur;
  }, {});
};
exports.calcDistance = calcDistance;
exports.formatNumber = formatNumber;
exports.getNowDate = getNowDate;
exports.groupBy = groupBy;
