import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import  firestore  from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


const MessagesScreen = ({navigation}) => {
  const [users,setUsers] = useState('')
  const {user} = useContext(AuthContext);
  const getUsers = async ()=> {
    const querySanp = await firestore().collection('users').where('uid','!=',user.uid).get();
    const allusers =  querySanp.docs.map(docSnap => docSnap.data())
    setUsers(allusers)
  }
  useEffect(()=>{
    getUsers()
  },[])
    return (
      <View style={{ flex:1,marginRight:10,marginLeft:10,alignItems:"center",justifyContent:"center" }}>
        <FlatList 
          data={users}
          keyExtractor={item=>item.uid}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userName: item.fname+' '+item.lname,uid:item.uid,status:typeof(item.status) == "string" ? item.status : item.status.toDate().toString(),image:item? item.userImg ||'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg 
                   source={{
                    uri: item
                      ? item.userImg ||
                        'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                      : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                  }}
                   />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item ? item.fname || 'Test' : 'Test'}{' '}{item ? item.lname || 'User' : 'User'}</UserName>
                    {/* <PostTime>{item.id}</PostTime> */}
                  </UserInfoText>
                  <MessageText>{item.email}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
        </View>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
