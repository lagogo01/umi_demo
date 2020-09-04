// 获取系统日期YYYY-MM-DD
export const getSystemCurrentDate = () => {
  return getSystemDate();
};

// 获取系统日期YYYY-MM-DD HH:MM:SS
export const getSystemCurrentTime = () => {
  return getSystemDateHourMinuteSecond();
};

// 时间段--[当天的00:00:00,当前时间]
export const getDayDate = () => {
  return [`${getSystemDate()} 00:00:00`, getSystemDateHourMinuteSecond()];
};

// 时间段--[7天前的YYYY-MM-DD,当天]
export const getNDaysDate = day => {
  return [getDaysBeforeDate(day), getSystemCurrentDate()];
};

// 时间段--[当n天的00:00:00,当前时间]
export const getNDaysData = day => {
  return [
    `${getDaysBeforeDate(day)} 00:00:00`,
    getSystemDateHourMinuteSecond(),
  ];
};

// 时间段--[当天日期,当前日期]
export const getCurrentDate = () => {
  return [getSystemDate(), getSystemDate()];
};

// 时间段--[本周一的日期,本周日的日期]
export const getWeekDate = () => {
  // 按周日为一周的最后一天计算
  const date = new Date();

  // 今天是这周的第几天
  const today = date.getDay();

  // 上周日距离今天的天数（负数表示）
  let stepSunDay = -today + 1;

  // 如果今天是周日
  if (today === 0) {
    stepSunDay = -7;
  }

  // 周一距离今天的天数（负数表示）
  const stepMonday = 7 - today;

  const time = date.getTime();

  const monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
  const sunday = new Date(time + stepMonday * 24 * 3600 * 1000);

  // 本周一的日期 （起始日期）
  const startDate = transferDate(monday); // 日期变换
  // 本周日的日期 （结束日期）
  const endDate = transferDate(sunday); // 日期变换

  return [startDate, endDate];
};

// 时间段--[当前月的第一天,当前月的最后一天]
export const getMonthDate = () => {
  // 获取当前月的第一天
  const start = new Date();
  start.setDate(1);

  // 获取当前月的最后一天
  const date = new Date();
  let currentMonth = date.getMonth();
  const nextMonth = ++currentMonth;
  const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
  const oneDay = 1000 * 60 * 60 * 24;
  const end = new Date(nextMonthFirstDay - oneDay);

  const startDate = transferDate(start); // 日期变换
  const endDate = transferDate(end); // 日期变换

  return [startDate, endDate];
};

// 时间段--[本年的第一天,系统的当天]
export const getYearDate = () => {
  const systemDate = new Date();
  // 获取当年
  const year = systemDate.getFullYear();
  const startDate = `${year}-01-01`;
  return [startDate, getSystemDate()];
};

// 系统当天日期YYYY-MM-DD
function getSystemDate() {
  const systemDate = new Date();

  // 获取当年
  const year = systemDate.getFullYear();

  // 获取当月 （月+1是因为js中月份是按0开始的）
  let month = systemDate.getMonth() + 1;

  // 获取当日
  let day = systemDate.getDate();

  if (day < 10) {
    // 如果日小于10，前面拼接0

    day = `0${day}`;
  }

  if (month < 10) {
    // 如果月小于10，前面拼接0

    month = `0${month}`;
  }

  return [year, month, day].join('-');
}

// 系统当天日期YYYY-MM-DD HH:MM:SS
function getSystemDateHourMinuteSecond() {
  const systemDate = new Date();

  const hour =
    systemDate.getHours() < 10
      ? `0${systemDate.getHours()}`
      : systemDate.getHours();
  const minute =
    systemDate.getMinutes() < 10
      ? `0${systemDate.getMinutes()}`
      : systemDate.getMinutes();
  const second =
    systemDate.getSeconds() < 10
      ? `0${systemDate.getSeconds()}`
      : systemDate.getSeconds();

  return `${getSystemDate()} ${hour}:${minute}:${second}`;
}

// 系统前{beforeDay}天日期YYYY-MM-DD
function getDaysBeforeDate(beforeDay) {
  const date = new Date();
  let timestamp;
  let newDate;

  timestamp = date.getTime();

  // 获取一天前的日期
  newDate = new Date(timestamp - beforeDay * 24 * 3600 * 1000);

  const year = newDate.getFullYear();

  // 月+1是因为js中月份是按0开始的
  let month = newDate.getMonth() + 1;

  let day = newDate.getDate();

  if (day < 10) {
    // 如果日小于10，前面拼接0

    day = `0${day}`;
  }

  if (month < 10) {
    // 如果月小于10，前面拼接0

    month = `0${month}`;
  }

  return [year, month, day].join('-');
}

// 日期转YYYY-MM-DD
function transferDate(date) {
  // 年
  const year = date.getFullYear();
  // 月
  let month = date.getMonth() + 1;
  // 日
  let day = date.getDate();

  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (day >= 0 && day <= 9) {
    day = `0${day}`;
  }

  const dateString = `${year}-${month}-${day}`;

  return dateString;
}
