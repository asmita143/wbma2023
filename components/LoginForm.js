import React ,{useContext}from 'react';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import {useAuthentication} from '../hooks/ApiHooks';
import {Button, TextInput, Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm=(props)=>{
  const {setIsLoggedIn}=useContext(MainContext);
  const{postLogin}=useAuthentication();
  const{control,handleSubmit,formState:{errors}}=useForm({
    defaultValues:{username: '',password:''},
  });

  const logIn = async(loginData) => {
    console.log('Login Button pressed',loginData);

    //const data = {username: 'asmitas', password: '5uresh143#'};
    try {
      const loginResult=await postLogin(loginData);
      console.log('logIn',loginResult)
      await AsyncStorage.setItem('userToken', loginResult.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('logIn', error);
    }
  };
    return (
      <View>
        <Text>Login Form</Text>
        <Controller
        control={control}
        rules={{required:true, minLength:3}}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='username'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          />
        )}
        name="username"
        />
        {errors.username?.type === 'required' && <Text>is required</Text>}
        {errors.username?.type === 'minLength' && <Text>min length is 3 characters</Text>}
        <Controller
        control={control}
        rules={{required:true, minLength:5}}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='Password'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry={true}
          />
        )}
        name="password"
        />
        {errors.password &&<Text>Password(min.5 chars)is not valid!</Text>}
       <Button title='Sign in!' onPress={handleSubmit(logIn)}/>
      </View>
    );
};

LoginForm.propTypes={};

export default LoginForm;
