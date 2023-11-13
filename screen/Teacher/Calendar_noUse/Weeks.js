import React from 'react';
import { View, Text } from 'react-native';
import style from '../../style.js';
import Dates from './Date.js';

export const FirstWeeks = (params) => {
  console.log('FirstWeeks로 들어온 파라미터:\n', params);

  return (
    <Dates
      startDay={params?.startDay}
      loc={'first'}
      array={params?.array}
      index={params?.index}
    ></Dates>
  );
};

export const LastWeeks = (params) => {
  console.log('LastWeeks로 들어온 파라미터:\n', params);
  return (
    <Dates
      endDay={params?.endDay}
      loc={'last'}
      array={params?.array}
      index={params?.index}
    ></Dates>
  );
};

export const MiddleWeeks = (params) => {
  console.log('MiddleWeeks로 들어온 파라미터:\n', params);
  const weekSize = new Array(params?.weekNumber - 2); // weekSize = [1,1,1,1,1,1];
  weekSize.fill(1);
  let round = 0;
  const middleWeekList = weekSize.map((week) => {
    round++;
    return (
      <View
        style={{
          backgroundColor: 'green',
          borderWidth: 4,
          borderColor: 'blue',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Dates
          loc={'middle'}
          array={params?.array}
          index={params?.index + 7 * (round - 1)}
        ></Dates>
      </View>
    );
  });

  return middleWeekList;
};

//export default MiddleWeeks;
