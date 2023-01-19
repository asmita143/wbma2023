import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from '../components/LoginForm';
import { useUser } from '../hooks/ApiHooks';

const Login = ({navigation}) => {
  const {setIsLoggedIn}=useContext(MainContext);
  const {getUserByToken} = useUser();
  const checkToken=async()=>{
    try{
      const userToken=await AsyncStorage.getItem('userToken');
      if(userToken === null) return;
      const userData= await getUserByToken(userToken)
        setIsLoggedIn(true);
    }catch(error){
      console.error('checkToken', error);
    }
  }
  useEffect(()=>{
    checkToken();
  },[]);

  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
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
