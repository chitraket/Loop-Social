import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider';
import  firestore  from '@react-native-firebase/firestore';
const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const {user} = useContext(AuthContext);
  const {uid} = route.params;
  useEffect(() => {
   // getAllMessages()
   const docid = uid > user.uid ? user.uid+"-"+ uid : uid+"-"+user.uid
   const messageRef = firestore().collection('chatrooms')
   .doc(docid)
   .collection('messages')
   .orderBy('createdAt',"desc")
   messageRef.onSnapshot((querySanp) => {
    const allmsg =  querySanp.docs.map(docSanp=>{
      const data = docSanp.data()
      if(data.createdAt){
        return {
          ...docSanp.data(),
          createdAt:docSanp.data().createdAt.toDate()
        }
      }else{
        return {
          ...docSanp.data(),
          createdAt:new Date()
        }
      }
      
    })
    setMessages(allmsg)
   })
  }, []);

  const onSend = (messageArray) => {
    const msg = messageArray[0];
    const mymsg = {
      ...msg,
      sentBy:user.uid,
      sentTo:uid,
      createdAt:new Date()
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
    const docid = uid > user.uid ? user.uid+"-"+ uid : uid+"-"+user.uid
    firestore().collection('chatrooms')
    .doc(docid)
    .collection('messages')
    .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})

  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
          left:{
            backgroundColor:'white'
          }
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(text) => onSend(text)}
      user={{
        _id: user.uid,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
});
