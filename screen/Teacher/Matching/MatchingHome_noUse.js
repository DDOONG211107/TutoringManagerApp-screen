import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentUser, getMatchingInfo, db } from '../../../config/MyBase.js';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { getSortedStudentList } from '../../../config/getSortedList.js';
import style from '../../style.js';
import Image_ from '../../../component/Image.js';

//import { GetScore } from '../../../config/getScore.js';
const defaultPhotoUrl =
  'https://firebasestorage.googleapis.com/v0/b/crescendo-b984d.appspot.com/o/photo.png?alt=media';

export default MatchingHome = ({ navigation, route }) => {
  console.log('render MatchingHome start @@@@');
  // console.log(navigation);
  // console.log(route);
  //const [currentMatchingInfo, setCurrentMatchingInfo] = useState('default');
  const userId = getCurrentUser().uid;
  //const currentMatchingInfo = '';
  const [currentMatchingInfo, setCurrentMatchingInfo] = useState('');
  const [dayBool, setDayBool] = useState([]);
  const [dayTime, setDayTime] = useState([]);
  const [subject, setSubject] = useState('');
  const [money, setMoney] = useState(-1);
  const [teachingType, setTeachingType] = useState([]);
  const [educationLevel, setEducationLevel] = useState([]);
  const [studentInfoList, setStudentInfoList] = useState([]);
  // const unsub = onSnapshot(doc(db, `users/${userId}/`), (doc) => {
  //   //console.log('Current data: ', doc.data().currentMatchingId);
  //   setCurrentMatchingInfo(doc.data().currentMatchingId);
  // });
  // const unsub2 = onSnapshot(
  //   doc(db, `users/${userId}/matching/${currentMatchingInfo}`),
  //   (doc) => {
  //     console.log('unSub2 Current data: ', doc.data());
  //     setSubject(doc.data().subject);
  //     setMoney(doc.data().money);
  //     setTeachingType(doc.data().teachingType);
  //     setDayBool(doc.data().dayBool);
  //     setDayTime(doc.data().dayTime);
  //   }
  // );
  useEffect(() => {
    const unsub = onSnapshot(doc(db, `users/${userId}/`), (doc) => {
      console.log('Current data: ', doc.data().currentMatchingId);
      setCurrentMatchingInfo(doc.data().currentMatchingId);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    let unsub2 = () => {};
    console.log('@@@@@@@@@@@      ', currentMatchingInfo);
    if (currentMatchingInfo === undefined) {
      //console.log('nothing');
    } else if (currentMatchingInfo !== '') {
      //console.log('currentMatchingInfo:       ', currentMatchingInfo);
      unsub2 = onSnapshot(
        doc(db, `users/${userId}/matching/${currentMatchingInfo}`),
        (doc) => {
          console.log('unSub2 Current data: ', doc.data());
          setSubject(doc.data().subject);
          setMoney(doc.data().money);
          setTeachingType(doc.data().teachingType);
          setDayBool(doc.data().dayBool);
          setDayTime(doc.data().dayTime);
          setEducationLevel(doc.data().educationLevel);
        }
      );
    }
    return () => unsub2();
  }, [currentMatchingInfo]);

  useEffect(() => {
    //const studentsRef = collection(db, 'users');
    console.log('세번째 useEffect');
    const q = query(
      collection(db, 'users'),
      where('isTeacher', '==', false),
      where('currentMatchingSubject', '==', subject)
    );
    const unsub3 = onSnapshot(q, (querySnapshot) => {
      const students = [];
      const studentInfo = [];
      querySnapshot.forEach((doc) => {
        const studentObj = {
          uid: doc.data().uid,
          name: doc.data().name,
          photoUrl: doc.data().photoURL,
          education: doc.data().education,
          address: doc.data().address,
          studentCurrentMatchingId: doc.data().currentMatchingId,
          studentCurrentMatchingSubject: doc.data().currentMatchingSubject,
        };
        students.push(doc.data().uid);
        studentInfo.push(studentObj);

        // if (studentObj.studentCurrentMatchingSubject === subject) {
        //   console.log(studentObj.name + ' 을 추가해야 함');
        //   students.push(doc.data().uid);
        //   studentInfo.push(studentObj);
        // }
      });

      setStudentInfoList(studentInfo);
    });

    return () => unsub3();
  }, [currentMatchingInfo]);

  useEffect(() => {
    let unsub4 = () => {};
    console.log('여기?');
    const studentInfoList_ = studentInfoList.slice();
    for (let i = 0; i < studentInfoList_?.length; i++) {
      const uid_ = studentInfoList_[i].uid;
      const matchingId_ = studentInfoList_[i].studentCurrentMatchingId;
      const name_ = studentInfoList_[i].name;
      console.log(i, '   ', uid_, '   ', matchingId_, '   ', name_);
      unsub4 = onSnapshot(
        doc(db, 'users', uid_, 'matching', matchingId_),
        (doc) => {
          console.log('for문 안의 unsub4      ', i);
          console.log(doc.data());
          studentInfoList_[i].matchingInfo = doc.data();
          setStudentInfoList(studentInfoList_);
        }
      );
    }

    return () => unsub4();
  }, [currentMatchingInfo]);

  const sortStudentList = () => {
    console.log('학생을 추천해줘야함');
    if (currentMatchingInfo === 'default') {
      console.log('디폴트');
    } else {
      const sortedStudentInfoList = getSortedStudentList(
        {
          subject,
          money,
          teachingType,
          dayBool,
          dayTime,
          educationLevel,
        },
        studentInfoList
      );

      setStudentInfoList(sortedStudentInfoList);
    }
  };

  const _handleItemPress = (params) => {
    console.log(params);
  };

  console.log('render MatchingHome Info:  ', studentInfoList);
  console.log('render MatchingHome Subject:   ', subject);

  const Item = ({ item, onPress }) => {
    // const [studentName, setStudentName] = useState('');
    // const [studentPhotoUrl, setStudentPhotoUrl] = useState('');
    // const [education, setEducation] = useState('');
    // console.log('Item 안:       ', item);
    // useEffect(() => {
    //   const unsubscribe = onSnapshot(doc(db, 'users', item), (doc) => {
    //     console.log('Item 안의 onSnapshot');
    //     console.log(doc.data());
    //     setStudentName(doc.data().name);
    //     setStudentPhotoUrl(doc.data().photoURL);
    //     setEducation(doc.data().education);
    //   });
    //   return () => unsubscribe();
    // }, []);
    return (
      <TouchableOpacity
        style={style.itemContainer}
        onPress={() => {
          onPress({ uid: item?.uid });
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image_
            url={item?.photoUrl ? item?.photoUrl : defaultPhotoUrl}
            showButton={false}
            rounded={true}
            width_={60}
            height_={60}
          ></Image_>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              marginVertical: 20,
              marginLeft: 20,
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '300',
              marginVertical: 20,
              marginLeft: 20,
            }}
          >
            {item?.education}
          </Text>
        </View>
        <Text style={{ fontSize: 12, color: style.colorList.grey_1 }}>
          {item?.address}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: style.colorList.skyBlue,
      }}
    >
      <View style={{ flex: 4, flexDirection: 'row' }}>
        <View style={{ flex: 3, justifyContent: 'center', paddingLeft: 10 }}>
          <Text>추천된 학생 목록</Text>
          <Text>학생을 누르면 자세한 정보를 확인 할 수 있습니다.</Text>
          <Text style={{ fontSize: 20 }}>
            {currentMatchingInfo
              ? '현재 매칭정보 ' + currentMatchingInfo
              : '현재 매칭 정보가 없습니다'}
          </Text>
          <Text>{subject}</Text>
          {/* <Text>{studentInfoList[1].name}</Text> */}
          <TouchableOpacity
            // onPress={() => {
            //   console.log('삐용');
            // }}
            onPress={sortStudentList}
            style={{
              width: 100,
              height: 50,
              backgroundColor: style.colorList.navy,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: style.colorList.skyBlue }}>추천받기</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('EditMatching')}>
            <Ionicons name='settings' size={30} color='black' />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: style.colorList.grey_0,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
        }}
      >
        <Text>이쯤에 웨이트 조절 버튼</Text>
      </View>
      <View
        style={{
          flex: 10,
          alignSelf: 'stretch',
          backgroundColor: style.colorList.white,
        }}
      >
        <FlatList
          keyExtractor={(item) => {
            //console.log('키 익스트래터    ', item);
            return item.uid;
          }}
          data={studentInfoList}
          renderItem={({ item }) => {
            //console.log('렌더 아이템      ', item);
            return <Item item={item} onPress={_handleItemPress}></Item>;
          }}
          windowSize={3}
        ></FlatList>
        {/* <ScrollView
          style={{ flex: 1, alignSelf: 'stretch' }}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 5 }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name='person' size={70} color='black' />
            </View>
            <View style={{ flex: 3, flexDirection: 'column' }}>
              <View style={{ flex: 1 }}>
                <Text>test</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>test2</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>test3</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 5 }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name='person' size={70} color='black' />
            </View>
            <View style={{ flex: 3, flexDirection: 'column' }}>
              <View style={{ flex: 1 }}>
                <Text>test</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>test2</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>test3</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 5 }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name='person' size={70} color='black' />
            </View>
            <View style={{ flex: 3, flexDirection: 'column' }}>
              <View style={{ flex: 1 }}>
                <Text>test</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>test2</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>test3</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 5 }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                marginHorizontal: 10,
              }}
            >
              <Ionicons name='person' size={70} color='black' />
            </View>
            <View style={{ flex: 3, flexDirection: 'column' }}>
              <View style={{ flex: 1 }}>
                <Text>test</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>test2</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>test3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView> */}
      </View>
    </View>
  );
};
