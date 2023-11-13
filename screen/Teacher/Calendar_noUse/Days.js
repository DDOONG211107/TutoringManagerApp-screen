import React from 'react';
import { View, Text } from 'react-native';
import style from '../../style.js';

const dayArr = ['월', '화', '수', '목', '금', '토'];
const Day = () => {
  const dayList = dayArr.map((day) => (
    <View
      style={{
        backgroundColor: 'green',
        borderWidth: 4,
        borderColor: 'yellow',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: style.colorList.skyBlue }}>{day}</Text>
    </View>
  ));
  //console.log(dayList);
  return dayList;
};

const Days = () => {
  return (
    <View
      style={{
        flex: 0.1,
        backgroundColor: style.colorList.navy,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: style.size.width_ - 40,
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 5,
      }}
    >
      <Day></Day>
      <View
        style={{
          backgroundColor: 'green',
          borderWidth: 4,
          borderColor: 'yellow',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: style.colorList.red }}>일</Text>
      </View>
    </View>
  );
};

export default Days;
