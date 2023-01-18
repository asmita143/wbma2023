import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from '../hooks/ApiHooks';
import { useUser } from '../hooks/ApiHooks';

const Login = ({navigation}) => {
  const {setIsLoggedIn}=useContext(MainContext);
  const{postLogin}=useAuthentication();
  const {getUserByToken} = useUser();

  const logIn = async() => {
    console.log('Login Button pressed');
    const data = {username: 'asmitas', password: '5uresh143#'};
    try {
      const loginResult=await postLogin(data);
      console.log('logIn',loginResult)
      await AsyncStorage.setItem('userToken', loginResult.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('logIn', error);
    }
  };
  const checkToken=async()=>{
    try{
      const userToken=await AsyncStorage.getItem('userToken');
      const userData= await getUserByToken(userToken)
        setIsLoggedIn(true);
    }catch(error){
      cconsole.error('checkToken', error);
    }
  }
  useEffect(()=>{
    checkToken();
  },[]);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button style={styles.logInButton} title="Sign in!" onPress={logIn} />
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
