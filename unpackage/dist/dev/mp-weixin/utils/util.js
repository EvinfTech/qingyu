"use strict";
const formatNumber = (n) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
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
exports.formatNumber = formatNumber;
exports.getNowDate = getNowDate;
exports.groupBy = groupBy;
