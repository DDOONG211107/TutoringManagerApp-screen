import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Button from '../../../component/Button.js';
import style from '../../style.js';
import ChannelCreation from './ChannelCreation.js';
import { getCurrentUser } from '../../../config/MyBase.js';
import moment from 'moment';
import { db, auth } from '../../../config/MyBase.js';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

const getDateOrTime = (ts) => {
  const now = moment().startOf('day');
  const target = moment(ts).startOf('day');
  return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
};

const Item = React.memo(
  async ({
    item: { id, guestName, hostUid, createdAt, guestUid },
    onPress,
  }) => {
    // const ThemeContext = React.createContext(style.theme);
    // const theme = useContext(ThemeContext);
    const myUid = getCurrentUser().uid;
    // console.log('호스트의 uid         ', hostUid);
    // console.log('게스트 이름         ', guestName);
    console.log('나의 uid       ', myUid);
    // console.log('######        ', auth.currentUser);
    // if (myUid === hostUid) {
    //   //게스트의 photoUrl을 받아와야 함
    //   console.log('게스트의 photoUrl을 받아와야 함');
    // } else if (myUid === guestUid) {
    //   // 호스트의 photoUrl을 받아와야 함
    // }
    return (
      <TouchableOpacity
        style={style.itemContainer}
        onPress={() => onPress({ id, hostUid })}
      >
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>guestName</Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 5,
              color: style.colorList.grey_1,
            }}
          >
            hostUid
          </Text>
        </View>
        <Text style={{ fontSize: 12, color: style.colorList.grey_1 }}>
          {getDateOrTime(createdAt)}
        </Text>
        <MaterialIcons
          name='keyboard-arrow-right'
          size={24}
          color={style.colorList.black}
        ></MaterialIcons>
      </TouchableOpacity>
    );
  }
);

const ChannelList = ({ navigation, route }) => {
  //const [channels, setChannels] = useState([]);
  const [channels, setChannels] = useState([]);
  const user = getCurrentUser();
  const _handleCreateButtonPress = (params) => {
    //console.log(params);
    navigation.navigate('ChannelCreation', params);
  };

  useEffect(() => {
    const channelRef = collection(db, 'channels');
    const q = query(channelRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
        //console.log('doc$$$    ', doc.data());
      });
      setChannels(list);
    });
    return () => unsubscribe();

    // const snapshot = await getDocs(q);
    // snapshot.forEach((doc) => {
    //   list.push(doc.data());
    // });
  }, []);

  const _handleItemPress = (params) => {
    navigation.navigate('Channel', params);
  };
  // console.log('====유저 정보====');
  // console.log(user);
  // console.log('====channels 정보=====');
  // console.log(channels);

  return (
    <View style={style.container}>
      {/* <View
        style={{
          ...style.view,
          margin: 20,
          width: style.size.width_ - 40,
        }}
      >
        <Text>현재 로그인한 사람의 id: {user.email}</Text>
      </View> */}
      <FlatList
        keyExtractor={(item) => {
          //console.log('키 익스트래터    ', item);
          return item['id'];
        }}
        data={channels}
        renderItem={({ item }) => {
          //console.log('렌더 아이템      ', item);
          return <Item item={item} onPress={_handleItemPress}></Item>;
        }}
        windowSize={3}
      ></FlatList>
      <Button
        title='새 채팅방 만들기'
        isFilled={true}
        disabled={false}
        onPress={_handleCreateButtonPress}
      ></Button>
    </View>
  );
};

export default ChannelList;
