export function parseDate(time){
  var curDate = new Date();
  curDate.setTime(time); //向 1970/01/01 添加time毫秒，并显示新的日期和时间：
  var year = curDate.getFullYear();
  var month = curDate.getMonth() + 1;
  var date = curDate.getDate();
  var hours = curDate.getHours();
  var minutes = curDate.getMinutes();
  var seconds = curDate.getSeconds();
  return year+'-'+month+'-'+date + ' '+hours+':'+minutes+':'+seconds;
};