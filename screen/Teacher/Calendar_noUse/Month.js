import React from 'react';
import { View, Text } from 'react-native';
import style from '../../style.js';
import Dates from './Date.js';
import { FirstWeeks, MiddleWeeks, LastWeeks } from './Weeks.js';

const _2022_JAN_holidayList = [1, 2, 9, 16, 23, 30, 31];
const _2022_FEB_holidayList = [1, 2, 6, 13, 20, 27];
const _2022_MAR_holidayList = [1, 6, 9, 13, 20, 27];
const _2022_APR_holidayList = [3, 10, 17, 24];
const _2022_MAY_holidayList = [1, 5, 8, 15, 22, 29];
const _2022_JUN_holidayList = [1, 5, 6, 12, 19, 26];
const _2022_JUL_holidayList = [3, 10, 17, 24, 31];
const _2022_AUG_holidayList = [7, 14, 15, 21, 28];
const _2022_SEP_holidayList = [4, 9, 10, 11, 12, 18, 25];
const _2022_OCT_holidayList = [2, 3, 9, 10, 16, 23, 30];
const _2022_NOV_holidayList = [6, 13, 20, 27];
const _2022_DEC_holidayList = [4, 11, 18, 25];

const _2022_holidayList = [
  _2022_JAN_holidayList,
  _2022_FEB_holidayList,
  _2022_MAR_holidayList,
  _2022_APR_holidayList,
  _2022_MAY_holidayList,
  _2022_JUN_holidayList,
  _2022_JUL_holidayList,
  _2022_AUG_holidayList,
  _2022_SEP_holidayList,
  _2022_OCT_holidayList,
  _2022_NOV_holidayList,
  _2022_DEC_holidayList,
];

class Date {
  constructor(year_, month_, date_) {
    this.year = year_;
    this.month = month_;
    this.date = date_;
    this.isHoliday = _2022_holidayList[month_].includes(date_) ? true : false;
  }
}

const Month = (params) => {
  console.log('Month안으로 들어오는 파라미터:\n', params);
  const monthArray = new Array(params?.monthLength);
  for (let i = 0; i < monthArray.length; i++) {
    monthArray[i] = new Date(params?.year, params?.month, i + 1);
  }

  return (
    <View
      style={{
        flex: 0.9,
        backgroundColor: style.colorList.grey_0,
        alignItems: 'center',
        justifyContent: 'center',
        width: style.size.width_ - 40,
        borderColor: 'purple',
        borderWidth: 6,
      }}
    >
      <FirstWeeks
        startDay={params?.startDay}
        array={monthArray}
        index={0}
      ></FirstWeeks>
      <MiddleWeeks
        weekNumber={params?.weekNumber}
        array={monthArray}
        index={params?.startDay === 0 ? 1 : 8 - params?.startDay}
      />
      <LastWeeks
        endDay={params?.endDay}
        array={monthArray}
        index={
          params?.endDay === 0
            ? params?.monthLength - 7
            : params?.monthLength - params?.endDay
        }
      ></LastWeeks>
    </View>
  );
};

export default Month;
