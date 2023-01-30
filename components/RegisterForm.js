import React from 'react';
import {useUser} from '../hooks/ApiHooks';
import { Button, TextInput, Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';


const RegisterForm=()=>{
  //const {setIsLoggedIn}=useContext(MainContext);
  //const{postLogin}=useAuthentication();
  const {postUser,checkUserName}=useUser();
  const{control,getValues,handleSubmit,formState:{errors}}=useForm({
    defaultValues:{username: '',password:'',confirmPassword:'',email:'',full_name:''},
    mode:'onBlur',
  });

  const register = async(registerData) => {
    delete registerData.confirmPassword
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
      < >
        <Text>Register Form</Text>
        <Controller
        control={control}
        rules={{required:{value:true,message:'This is required'},
        minLength:{value:3,message:'Username min length is 3 character'},
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
        <Controller
        control={control}
        rules={{
        validate:(value)=>{
          if(value === getValues('password')){
          return  true;
        } else {
          return 'password doesnt match';
          }
        }}}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='Confirm Password'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry={true}
          autoCapitalize='none'
          errorMessage={errors.confirmPassword && errors.confirmPassword.message}
          />
        )}
        name="confirmPassword"
        />

        <Controller
        control={control}
        rules={{required:{value: true, message:'Email is required in form of abc@de.fg'},pattern:{
          value: /^[a-z0-9.]{1,64}@[a-z0-9.-]{3,64}/i,
          message:'Must be a valid email',
        },
      }}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='Email'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
        />

        <Controller
        control={control}
        rules={{minLength:{value : 3, message: 'must be at least 3 characters'}}}
        render={(
          { field:{onChange,onBlur,value}}
        )=>(
          <TextInput
          placeholder='Full name'
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          autoCapitalize='words'
          errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
        />
        {errors.full_name?.type === 'minLength' && <Text>min length is 3 characters</Text>}

       <Button title='Register now!' onPress={handleSubmit(register)}/>
      </>
    );
};


export default RegisterForm;
