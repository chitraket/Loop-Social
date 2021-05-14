import React from 'react';
import {View, TouchableOpacity, Text,Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
} from '../styles/NavStyles';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator
  
  >
    <Stack.Screen
      name="Cools Social"
      component={HomeScreen}
      options={{
      headerStyle:{
          elevation:0,
          backgroundColor:'#fff',
          ...styles.header
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: "#E94464",
          fontSize: 18,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#E94464"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),
      }}
      
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor:"#EFECF4",
          shadowColor: '#EFECF4',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#E94464" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} 
    options={{
      headerStyle:{
          elevation:0,
          backgroundColor:'#fff',
          ...styles.header
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: "#E94464",
          fontSize: 18,
        },
      }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        title:
        <Card>
         <UserInfo>
          <UserImgWrapper>
                  <UserImg  style={{width:30,height:30,borderRadius:18}} source={{
                    uri:route.params.image}}/>
          </UserImgWrapper>
          <TextSection>
                  <UserInfoText>
                    <UserName>{route.params.userName}</UserName>
                  </UserInfoText>
                  <MessageText>{route.params.status}</MessageText>
                </TextSection>
        </UserInfo>
        </Card>,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#161F3D',
        inactiveTintColor:'#B8BBC4',
        showLabel:false,
        style:{
          position:'absolute',
          elevation:0,
          backgroundColor:'#fff',
          height:80,
         ...styles.header
        }
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <View style={{alignItems:'center',justifyContent:'center',top:10}}>
            <Ionicons
              name="ios-home"
              color={color}
              size={size}
            />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <View style={{alignItems:'center',justifyContent:'center',top:10}}>
            <Ionicons
              name="ios-chatbubbles"
              color={color}
              size={size}
            />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <View style={{alignItems:'center',justifyContent:'center',top:10}}>
            <Ionicons name="ios-person" color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header:{
    borderBottomWidth:1,
    borderBottomColor:"#EBECF4",
    shadowColor:"#454D65",
    shadowOffset:{height:5},
    shadowRadius:15,
    shadowOpacity:0.2,
  },
})
export default AppStack;
