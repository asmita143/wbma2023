import React ,{useContext}from 'react';
import { MainContext } from '../contexts/MainContext';
import {useAuthentication} from '../hooks/ApiHooks';
import { View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Icon,Button,Text } from '@rneui/themed';

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
      <>
        <Text >Login</Text>
        <Controller
        control={control}
        rules={{required:true, minLength:3}}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <Input
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
          <Input
          placeholder='Password'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry={true}
          />
        )}
        name="password"
        />
        {errors.password &&<Text>Password(min.5 chars)is required!</Text>}
       <Button
       title='Sign in!'
       buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
              containerStyle={{
                width: "100%",
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
              onPress={handleSubmit(logIn)}/>
       </>
    );
};

export default LoginForm;
