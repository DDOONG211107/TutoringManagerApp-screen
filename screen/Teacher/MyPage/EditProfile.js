import React, { useContext, useEffect, useRef, useState } from "react";
import { Colors, Surface,TextInput,Button } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db, auth,getCurrentUser } from "../../../config/MyBase";
import { getDocs, collection, deleteDoc, doc,setDoc,query, orderBy,getDoc,ref,onValue,onSnapshot, updateDoc } from "firebase/firestore";
import style from '../../style';
import { UserInterfaceIdiom } from "expo-constants";
import { async } from "@firebase/util";
import { list } from "firebase/storage";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Image_ from '../../../component/Image.js';





const EditProfile = ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [memo, setMemo] = useState("");
    const [education, setEducation] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [text2, onChangeText2] = React.useState("");
    const user = getCurrentUser();
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [educations, setEducations] = useState([
      { label: "최하위", value: "최하위" },
      { label: "하위", value: "하위" },
      { label: "중하위", value: "중하위" },
      { label: "중위", value: "중위" },
      { label: "중상위", value: "중상위" },
      { label: "상위", value: "상위" },
      { label: "최상위", value: "최상위" },
  ]);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    
   

    useEffect(() => {
      const userId = getCurrentUser().uid;
        const unsub = onSnapshot(doc(db, `users/${userId}/`), (doc) => {
          console.log('Current data: ', doc.data());
          setName(doc.data().name);
          setMemo(doc.data().memo);
          setEducation(doc.data().education);
          setAddress(doc.data().address);          
        })
        return () => unsub();
       
    }, []); 

    const _handlePhotoChange = async (url) => {
      console.log('핸들 포토 체인지');
      try {
        //spinner.start();
        const updatedUser = await updateUserPhoto(url);
  
        setPhotoUrl(updatedUser.photoUrl);
      } catch (e) {
        Alert.alert('Photo Error', e.message);
      } finally {
        //spinner.stop();
      }
    };
    

  
  
const changeName = () => {

console.log(name);
updateDoc(doc(db, "users",auth.currentUser.uid), {name: name});
}

const changeMemo = () => {
  
  console.log(memo);
  updateDoc(doc(db, "users",auth.currentUser.uid), {memo: memo});
  }

  const changeAddress = () => {
    
    console.log(address);
    updateDoc(doc(db, "users",auth.currentUser.uid), {address: address});
    }
    const changeEducation = () => {
      
      console.log(education);
      updateDoc(doc(db, "users",auth.currentUser.uid), {education: education});
      }

      

    
    return(
      <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
          <Surface
              style={{
                  width: wp("90%"),
                  height: hp("25%"),
                  justifyContent: "center",
                  flexDirection: "row",
                  marginTop: 10,
              }}
          >
              <View
                  style={{
                      flex: 2,
                      alignItems: "center",
                      justifyContent: "center",
                      marginHorizontal: 10,
                  }}
              >
                  <Image_
                      url={photoUrl}
                      onChangeImage={_handlePhotoChange}
                      showButton={true}
                      rounded={true}
                      width_={100}
                      height_={100}
                  ></Image_>
              </View>
              <View style={{ flex: 4, flexDirection: "column" }}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text style={{fontWeight:"bold"}}>이름: {name}{"\n"}</Text>
                  
                      <Text style={{fontWeight:"bold"}}>학력: {education}{"\n"}</Text>
                  
                      <Text style={{fontWeight:"bold",textDecorationLine:"underline"}}>자기소개</Text>
                      <Text style={{fontWeight:"bold"}}>{memo}</Text>
                  </View>
              </View>
          </Surface>
          <Surface
              style={{
                  width: wp("90%"),
                  height: hp("60%"),
                  marginTop: 10,
              }}
          >
              <View style={{ padding: 10 }}>
                  <Text
                      style={{
                          margin: 10,
                          fontWeight: "bold",
                          fontSize: 20,
                          marginBottom: 15,
                      }}
                  >
                      상세정보
                  </Text>
                  <View style={{ flexDirection: "row", marginBottom: 7 }}>
                      
                      <TextInput mode="outlined"  label="이름" value={name} onChangeText={setName} 
                      style={{ fontSize: 16, flex:5 ,height:50,lineHeight:20}}>              
                      </TextInput>
                      <Button style={{marginTop:5,justifyContent:"center"}} mode="contained"  onPress={(name) => changeName(name)}> 수정 </Button>
                      
                  </View>
                  <View style={{ flexDirection: "row", marginTop:10,marginBottom: 7 }}>
                      
                      <TextInput mode="outlined" multiline={true} label="자기소개" value={memo} onChangeText={setMemo} 
                      style={{ fontSize: 16, flex:5 ,height:100,lineHeight:20}}>              
                      </TextInput>
                      <Button style={{marginTop:55,justifyContent:"center"}} mode="contained"  onPress={(memo) => changeMemo(memo)}> 수정 </Button>
                      
                  </View>
                  <View style={{ flexDirection: "row", marginTop:10,marginBottom: 7 }}>
                      
                      <TextInput mode="outlined"  label="학력" value={education} onChangeText={setEducation} 
                      style={{ fontSize: 16, flex:5 ,height:50,lineHeight:20}}>              
                      </TextInput>
                      <Button style={{marginTop:5 ,justifyContent:"center"}} mode="contained"  onPress={(education) => changeEducation(education)}> 수정 </Button>
                      
                  </View>
                  <View style={{ flexDirection: "row", marginTop:10,marginBottom: 7 }}>
                      
                      <TextInput mode="outlined"  label="지역" value={address} onChangeText={setAddress} 
                      style={{ fontSize: 16, flex:5 ,height:50,lineHeight:20}}>              
                      </TextInput>
                      <Button style={{marginTop:5,justifyContent:"center"}} mode="contained"  onPress={(address) => changeAddress(address)}> 수정 </Button>
                      
                  </View>
                  
              </View>
          </Surface>
      </View>
  </ScrollView>
      
     
    );
};
export default EditProfile;