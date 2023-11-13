import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import Button from '../../../component/Button.js';
import Input from '../../../component/Input.js';
import style from '../../style.js';
import { getCurrentUser, createChannel, db } from '../../../config/MyBase.js';
import {
  getDocs,
  query,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';

const ChannelCreation = ({ navigation, route }) => {
  //const [channels, setChannels] = useState([]);
  //const [inviteUser, setInviteUser] = useState('');
  const [guestId, setGuestId] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const {
    uid: hostUid,
    name: hostName,
    //photoUrl: hostPhotoUrl,
  } = getCurrentUser();

  useEffect(() => {
    setDisabled(!(guestId && !errorMessage));
  }, [guestId, errorMessage]);

  const _handleInviteUser = (inviteUserId) => {
    setGuestId(inviteUserId);
    setErrorMessage(
      inviteUserId.trim() ? '' : '채팅할 상대방의 id를 입력해주세요'
    );
  };

  const _handleCreateButtonPress = async () => {
    //console.log('일단 create버튼 누름');
    try {
      //spinner.start();
      //console.log('초대할 id:  ', inviteUser);
      const id = await createChannel(guestId, hostId);
      navigation.replace('Channel', { id, inviteUser });
    } catch (e) {
      Alert.alert('Creation Error', e.message);
    } finally {
      //spinner.stop();
    }
  };

  return (
    <View style={style.container}>
      <Input
        label='채팅할 상대방의 아이디를 입력해주세요'
        value={guestId}
        placeholder='상대방의 id 입력'
        onChangeText={_handleInviteUser}
        onSubmitEditing={() => {
          setGuestId(guestId.trim());
          //_handleCreateButtonPress();
        }}
        disabled={false}
      ></Input>

      <Button
        title='채팅방 만들기'
        isFilled={true}
        disabled={disabled}
        //onPress={_handleCreateButtonPress}
        onPress={async () => {
          console.log('삐용');
          await getDocs(
            query(collection(db, 'users'), where('id', '==', guestId))
          ).then((guest) => {
            if (guest.empty) {
              Alert.alert(
                '오류',
                '해당 아이디를 가진 사람이 없습니다',
                [{ text: '확인' }],
                { cancelable: false }
              );
            } else {
              const {
                name: guestName,
                uid: guestUid,
                //photoURL: guestPhotoUrl,
              } = guest.docs[0].data();
              let newChannelId = '';
              Alert.alert(guestName, '초대하려는 사람의 이름이 맞습니까?', [
                { text: '취소', style: 'cancel' },
                {
                  text: '확인',
                  onPress: async () => {
                    await addDoc(collection(db, 'channels'), {
                      createdAt: Date.now(),
                      hostUid: hostUid,
                      guestUid: guestUid,
                      hostName: hostName,
                      guestName: guestName,
                      // guestPhotoUrl: guestPhotoUrl,
                      // hostPhotoUrl: hostPhotoUrl,
                      id: 444,
                      //guestAccept: false,
                    })
                      .then(async (document) => {
                        console.log('일단 여기');
                        await updateDoc(doc(db, 'users', hostUid), {
                          myChannels: arrayUnion(document.id),
                        });
                        await updateDoc(doc(db, 'users', guestUid), {
                          myChannels: arrayUnion(document.id),
                        });
                        const newChannelRef = doc(db, 'channels', document.id);
                        await updateDoc(newChannelRef, {
                          id: document.id,
                        });
                        console.log(
                          '@@@@@@ ',
                          document.id,
                          '      ',
                          newChannelRef.id
                        );
                        newChannelId = newChannelRef.id;
                        console.log('!!!!!!!!!!!!!       ', newChannelId);
                      })

                      .then(() => {
                        Alert.alert(
                          '성공',
                          `채팅방 생성`,
                          [
                            {
                              text: '확인',
                              onPress: () =>
                                navigation.replace('Channel', {
                                  guestUid,
                                  guestId,
                                  guestName,
                                  hostUid,
                                  hostName,
                                  // guestPhotoUrl,
                                  // hostPhotoUrl,
                                  newChannelId,
                                }),
                            },
                          ],
                          {
                            cancelable: false,
                          }
                        );
                      });
                  },
                },
              ]);
            }
          });
        }}
      ></Button>
    </View>
  );
};

export default ChannelCreation;
