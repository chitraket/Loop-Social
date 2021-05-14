import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';
import ProgressiveImage from './ProgressiveImage';

import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View,Image,Text } from 'react-native';

const PostCard = ({item, onDelete, onPress}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  likeIcon = item.likes ? 'heart' : 'heart-outline';
  likeIconColor = item.likes ? '#E94464' : '#454D65';


  if (item.likes == 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments == 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }


  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.feedItem} key={item.id}>
      <Image source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
          style={styles.avatar}/>
          <View style={{flex: 1}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <View>
                <Text style={styles.name}>{userData ? userData.fname || 'Test' : 'Test'}{' '}{userData ? userData.lname || 'User' : 'User'}</Text>
                <Text style={styles.timestamp}>{moment(item.postTime.toDate()).fromNow()}</Text>
              </View>
            </View>
            <Text style={styles.posts}>{item.post}</Text>
            {item.postImg != null ? (
              <Image
                defaultImageSource={require('../assets/default-img.jpg')}
                source={{uri: item.postImg}}
                style={styles.postImage}
                resizeMode="cover"
              />
            ) : (
              <Divider />
            )}
           <InteractionWrapper>
        <Interaction active={item.likes}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.likes}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25}  color="#454D65"/>
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)} >
            <Ionicons name="md-trash-bin" size={25} color="#454D65"/>
          </Interaction>
        ) : null}
      </InteractionWrapper>
          </View>
    </View>
  );
};

export default PostCard;
 
const styles = StyleSheet.create({
  feedItem:{
   backgroundColor:"#FFF",
   borderRadius:5,
   padding:8,
   flexDirection:"row",
   marginVertical:8
  },
  avatar:{
    width:36,
    height:36,
    borderRadius:18,
    marginRight:16
  },
  name:{
    fontSize:15,
    fontWeight:"500",
    color:"#454D65"
  },
  timestamp:{
    fontSize:11,
    color:"#C4C6CE",
    marginTop:4
  },
  posts:{
    marginTop:16,
    fontSize:14,
    color:"#838899"
  },
  postImage:{
    width:undefined,
    height:150,
    borderRadius:5,
    marginVertical:16,
  }
})