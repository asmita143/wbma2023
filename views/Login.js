import React, {useContext, useEffect,useState} from 'react';
import {StyleSheet, Keyboard, KeyboardAvoidingView, TouchableOpacity, View, Platform, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useUser } from '../hooks/ApiHooks';
import {Text} from 'react-native-svg';

const Login = ({navigation}) => {
  const {setIsLoggedIn,setUser}=useContext(MainContext);
  const {getUserByToken, checkUserName} = useUser();

  const [toggleForm,setToggleForm]=useState(true);

  const checkToken=async()=>{
    try{
      const userToken=await AsyncStorage.getItem('userToken');
      if(userToken === null) return;
      const userData= await getUserByToken(userToken)
        setUser(userData);
        setIsLoggedIn(true);
    }catch(error){
      console.error('checkToken', error);
    }
  }


  useEffect(()=>{
    checkToken();
  },[]);

  return (
    <TouchableOpacity
    onPress={()=>Keyboard.dismiss()}
    style={{flex:1}}
    activeOpacity={1}>
    <KeyboardAvoidingView
    behaviour={Platform.OS === 'ios'? 'padding' : 'height'}
     style={styles.container}>

      {toggleForm ?
      <LoginForm />
      :
      <RegisterForm />}
      <Text>{toggleForm ? 'No account yet?' : 'Go to login'}</Text>
      <Button title={toggleForm ? 'Register' : 'Login'} onPress={()=>{setToggleForm(!toggleForm)}}/>
    </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInButton:{
    backgroundColor:'blue',
  }
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
