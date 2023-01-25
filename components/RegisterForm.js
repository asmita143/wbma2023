import React from 'react';
import {useUser} from '../hooks/ApiHooks';
import { Text,} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import { Input,Button} from '@rneui/themed';

const RegisterForm = () => {
  //const {setIsLoggedIn}=useContext(MainContext);
  //const{postLogin}=useAuthentication();
  const {postUser,checkUserName} = useUser();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: '', email: '', full_name: ''},
    mode:'onBlur',
  });

  const register = async (registerData) => {
    console.log('Registering: ', registerData);

    //const data = {username: 'asmitas', password: '5uresh143#'};
    try {
      const registerResult = await postUser(registerData);
      console.log('register', registerResult);
    } catch (error) {
      console.error('register', error);
    }
  };
  const checkUser = async()=> {
    const userAvailable =await checkUserName('asmitas');
    return userAvailable;
  }
  return (
    <>
      <Text >Register</Text>
      <Controller
        control={control}
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"

        errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text>is required</Text>}
      {errors.username?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}
      <Controller
        control={control}
        rules={{required: true, minLength: 5}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password(min.5 chars)is not valid!</Text>}
      <Controller
        control={control}
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="email"
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
        rules={{minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
          />
        )}
        name="full_name"
      />
      {errors.full_name?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}

      <Button
        title="Register now!"
        buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
              containerStyle={{
                width: "100%",
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
        onPress={handleSubmit(register)}
      />
    </>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
