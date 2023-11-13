const monthArr = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

const month30 = ['APR', 'JUN', 'SEP', 'NOV'];
const month31 = ['JAN', 'MAR', 'MAY', 'JUL', 'AUG', 'OCT', 'DEC'];

const getWeekNumber = (year, month, day) => {
  const monthName = monthArr[month];

  if (monthName === 'FEB') {
    if (year % 4 != 0 && day === 1) {
      return 4;
    } else {
      return 5;
    }
  }
  if (month30.includes(monthName)) {
    if (day === 0) {
      return 6;
    } else {
      return 5;
    }
  }
  if (month31.includes(monthName)) {
    if (day === 6 || day === 0) {
      return 6;
    } else {
      return 5;
    }
  } else {
    console.log('여긴 들어오면 안 됩니다');
    return -1;
  }
};

const getThisMonthWeekNumber = (today) => {
  const month = today.getMonth();
  const year = today.getFullYear();
  const startDate = new Date(year, month, 1);
  const startDateDay = startDate.getDay();

  const weekNumber = getWeekNumber(year, month, startDateDay);
  return weekNumber;
};

export const weeks = (today_) => {
  const weekNumber = getThisMonthWeekNumber(today_);

  return weekNumber;
};

export const getEndDate = (today_) => {
  const year = today_.getFullYear();
  const month = today_.getMonth();
  const monthName = monthArr[month];
  console.log(monthName);
  if (month30.includes(monthName)) {
    const endDate = new Date(year, month, 30);
    console.log('이달의 마지막날 정보: ', endDate);
    return endDate;
  }
  if (month31.includes(monthName)) {
    const endDate = new Date(year, month, 31);
    console.log('이달의 마지막날 정보: ', endDate);
    return new Date(year, month, 31);
  } else {
    if (year % 4 === 0) {
      return new Date(year, month, 29);
    } else {
      return new Date(year, month, 28);
    }
  }
};
