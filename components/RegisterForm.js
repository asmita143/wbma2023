import React from 'react';
import {useUser} from '../hooks/ApiHooks';
import { Button, TextInput, Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Pattern} from 'react-native-svg';


const RegisterForm=()=>{
  //const {setIsLoggedIn}=useContext(MainContext);
  //const{postLogin}=useAuthentication();
  const {postUser,checkUserName}=useUser();
  const{control,handleSubmit,formState:{errors}}=useForm({
    defaultValues:{username: '',password:'',email:'',full_name:''},
    mode:'onBlur',
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
  const checkUser = async (username) => {
    try {
      const userAvailable = await checkUserName(username);
    console.log('checkUser', userAvailable);
    return userAvailable || 'Username is already taken';
    } catch (error) {
      console.error('checkUser',error.message)
    }

  };
    return (
      <View >
        <Text>Register Form</Text>
        <Controller
        control={control}
        rules={{required:{value:true,message:'This is required'},
        minLength:{value:34,message:'Username min length is 3 character'},
        validate: checkUser}}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='username'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          autoCapitalize='none'
          errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
        />
        {errors.username?.type === 'required' && <Text>is required</Text>}
        {errors.username?.type === 'minLength' && <Text>min length is 3 characters</Text>}

        <Controller
        control={control}
        rules={{
          required:{value:true, message:'min 5 characters, needs 1 number & 1 uppercase letter'},
          pattern :{
            value:/(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message:'min 5 characters, needs 1 number & 1 uppercase letter'},
          }
        }
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='Password'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry={true}
          autoCapitalize='none'
          errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
        />
        {errors.password &&<Text>Password(min.5 chars)is not valid!</Text>}
        <Controller
        control={control}
        rules={{required:true, minLength:3}}
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


export default RegisterForm;
