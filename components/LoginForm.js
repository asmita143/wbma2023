import React ,{useContext}from 'react';
import { MainContext } from '../contexts/MainContext';
import {useAuthentication} from '../hooks/ApiHooks';
import {Button, TextInput, Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm=(props)=>{
  const {setIsLoggedIn,setUser}=useContext(MainContext);
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
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('logIn', error);
    }
  };
    return (
      <View >
        <Text>Login Form</Text>
        <Controller
        control={control}
        rules={{required:{value: true, message:'is required'}}}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='username'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
        />

        <Controller
        control={control}
        rules={{required:{value:true,message:'is required'}}}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='Password'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry={true}
          errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
        />
       <Button title='Sign in!' onPress={handleSubmit(logIn)}/>
      </View>
    );
};

export default LoginForm;
