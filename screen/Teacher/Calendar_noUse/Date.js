import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
//import { Value } from 'react-native-reanimated';
import style from '../../style.js';

//const dateArr = [1, 2, 3, 4, 5, 6];

let weekCount = 0;

const Date = (params) => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log('Date로 들어온 파라미터:\n', params);
  const myBlur = (msg) => {
    if (msg === true) {
      console.log('here');
    } else {
      console.log('여기는 영역 안');
    }
  };
  const arr = params?.array;
  let i = params?.index;

  const dateArr = new Array(params?.dateNumber);

  dateArr.fill(1);
  const dateList = dateArr.map((item) => {
    if (params?.iscurrentMonth === true) {
      i++;
      console.log('======    ', i, '    ===========');
      console.log(arr[i - 1]);
      return (
        <View
          style={{ ...style.currentMonthDateContainer, alignItems: 'stretch' }}
        >
          <Modal
            animationType='none'
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flex: 1,
                backgroundColor: 'grey',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => myBlur(false)}
                style={{
                  backgroundColor: 'purple',
                  flex: 0.5,
                  width: 400,
                }}
              >
                <View>
                  <Text>
                    여기에 이제 해당 날짜의 수업정보나 일정이 나와야 함
                  </Text>
                  <Text>영역 바깥을 누르면 모달창이 사라져야 함</Text>
                  {/* <Text
                    style={{
                      fontSize: 24,
                      color: arr[i - 1].isHoliday ? 'red' : 'black',
                    }}
                  >
                    {arr[i - 1].date}
                  </Text> */}
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
          {/* <TouchableOpacity style={style.currentMonthDateContainer}> */}
          <TouchableOpacity
            onPress={() => {
              return setModalVisible(true);
            }}
            style={{
              backgroundColor: 'tomato',
              flex: 1,
            }}
          >
            <Text style={{ color: arr[i - 1].isHoliday ? 'red' : 'black' }}>
              {arr[i - 1].date}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (params?.iscurrentMonth === false) {
      return (
        <View style={style.notCurrentMonthDateContainer}>
          <Text>{weekCount}</Text>
        </View>
      );
    }
  });
  //console.log(dayList);
  return dateList;
};

const Dates = (params) => {
  console.log('Dates로 들어온 파라미터:\n', params);
  if (params?.loc === 'first') {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 3,
          borderColor: 'yellow',
          flex: 1,
        }}
      >
        <Date
          dateNumber={params?.startDay === 0 ? 6 : params?.startDay - 1}
          iscurrentMonth={false}
        ></Date>
        <Date
          dateNumber={params?.startDay === 0 ? 1 : 8 - params?.startDay}
          array={params?.array}
          index={params?.index}
          iscurrentMonth={true}
        ></Date>
      </View>
    );
  }
  if (params?.loc === 'middle') {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 3,
          borderColor: 'yellow',
          flex: 1,
        }}
      >
        <Date
          dateNumber={7}
          iscurrentMonth={true}
          array={params?.array}
          index={params?.index}
        ></Date>
      </View>
    );
  }
  if (params?.loc === 'last') {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 3,
          borderColor: 'yellow',
          flex: 1,
        }}
      >
        <Date
          dateNumber={params?.endDay === 0 ? 7 : params?.endDay}
          iscurrentMonth={true}
          array={params?.array}
          index={params?.index}
        ></Date>
        <Date
          dateNumber={params?.endDay === 0 ? 0 : 7 - params?.endDay}
          iscurrentMonth={false}
          index={-1}
        ></Date>
      </View>
    );
  }

  // <View
  //   style={{
  //     flex: 0.1,
  //     backgroundColor: style.colorList.navy,
  //     alignItems: 'center',
  //     justifyContent: 'space-around',
  //     width: style.size.width_ - 40,
  //     flexDirection: 'row',
  //     borderColor: 'red',
  //     borderWidth: 5,
  //   }}
  // >

  //   <Date></Date>
  //   <View
  //     style={{
  //       backgroundColor: 'green',
  //       borderWidth: 4,
  //       borderColor: 'yellow',
  //       flex: 1,
  //       alignItems: 'center',
  //     }}
  //   >
  //     <Text style={{ color: style.colorList.red }}>0</Text>
  //   </View>
  // </View>
};

export default Dates;
