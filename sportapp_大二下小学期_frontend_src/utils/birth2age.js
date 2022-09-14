export function birth2age(birth) {
  const birthDayTime = new Date(birth).getTime();
  //当前时间 毫秒
  const nowTime = new Date().getTime();
  //一年毫秒数(365 * 86400000 = 31536000000)
  return Math.ceil((nowTime - birthDayTime) / 31536000000);
}
