import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Platform,TextInput, StyleSheet, StatusBar} from 'react-native';
// import FormInput from '../components/FormInput';
// import FormButton from '../components/FormButton';
// import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons'
const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar> 
      <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={25} color="#FFF" />
      </TouchableOpacity>
      <HeaderGraphic>
      <RightCircle/>
        <LeftCircle/>
      </HeaderGraphic>

      <Text style={styles.greeting}>
        {`Hello! \nSign upvto get started.`}
      </Text>
      <View style={styles.errorMessage}>
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput style={styles.input} autoCapitalize="none"  onChangeText={userEmail => setEmail(userEmail)}></TextInput>
        </View>
        <View style={{marginTop:32}}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput style={styles.input} secureTextEntry autoCapitalize="none"  onChangeText={userPassword => setPassword(userPassword)}></TextInput>
        </View>
        <View style={{marginTop:32}}>
          <Text style={styles.inputTitle}>Confirm Password</Text>
          <TextInput style={styles.input} secureTextEntry autoCapitalize="none"  onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.button}  onPress={() => register(email, password)}>
        <Text style={{color:'#FFF',fontWeight:"500"}}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignSelf:'center',marginTop:32}}  onPress={() => navigation.navigate('Login')}>
        <Text style={{color:'#414959',fontSize:13}}>New to SocialApp? <Text style={{fontWeight:'500',color:'#E9446A'}}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
const HeaderGraphic = styled.View`
  position:absolute;
  width:100%;
  z-index: -100;
`;
const LeftCircle = styled.View`
  background-color:#F1B38D;
  position:absolute;
  width:230px;
  height:220px;
  border-radius:130px;
  left:-20px;
  top:-75px;
`;
const RightCircle = styled.View`
  background-color:#E9446A;
  position:absolute;
  width:420px;
  height:410px;
  border-radius:220px;
  right:-100px;
  top:-200px;
`;
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  greeting:{
    fontSize:25,
    fontWeight:"500",
    textAlign:'center',
    marginTop:250
  },
  errorMessage:{
    height:72,
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal:30
  },
  error:{
    color:'#E9446A',
    fontSize:13,
    fontWeight:"600",
    textAlign:'center'
  },
  form:{
    marginBottom:40,
    marginHorizontal:30
  },
  inputTitle:{
    color:'#8A8F9E',
    fontSize:10,
    textTransform:'uppercase'
  },
  input:{
    borderBottomColor:'#8A8F9E',
    borderBottomWidth:StyleSheet.hairlineWidth,
    height:40,
    fontSize:15,
    color:'#161F3D'
  },
  button:{
    marginHorizontal:30,
    backgroundColor:'#E94464',
    borderRadius:4,
    height:52,
    alignItems:'center',
    justifyContent:'center'
  },
  back:{
    position:'absolute',
    top:48,
    left:32,
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor:"rgba(21,22,48,0.1)",
    alignItems:"center",
    justifyContent:"center"
  }
});
