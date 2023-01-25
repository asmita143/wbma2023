import React from 'react';
import {useUser} from '../hooks/ApiHooks';
import { Button, TextInput, Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

const RegisterForm=()=>{
  //const {setIsLoggedIn}=useContext(MainContext);
  //const{postLogin}=useAuthentication();
  const {postUser}=useUser();
  const{control,handleSubmit,formState:{errors}}=useForm({
    defaultValues:{username: '',password:'',email:'',full_name:''},
  });

  const register = async(registerData) => {
    console.log('Registering: ', registerData);

    //const data = {username: 'asmitas', password: '5uresh143#'};
    try {
      const registerResult=await postUser(registerData);
      console.log('register',registerResult)
    } catch (error) {
      console.error('register', error);
    }
  };
    return (
      <View >
        <Text>Register Form</Text>
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
        <Controller
        control={control}
        rules={{required:true, minLength:3, validate:checkUser}}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='email'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          />
        )}
        name="email"
        />
        {errors.email?.type === 'required' && <Text>is required</Text>}
        <Controller
        control={control}
        rules={{minLength:3}}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='Full name'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          />
        )}
        name="full_name"
        />
        {errors.full_name?.type === 'minLength' && <Text>min length is 3 characters</Text>}

       <Button title='Register now!' onPress={handleSubmit(register)}/>
      </View>
    );
};


RegisterForm.propTypes={};

export default RegisterForm;
