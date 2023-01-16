import React, {useContext} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const Login = ({navigation}) => {
  const {setIsLoggedIn}=useContext(MainContext);
  const logIn = () => {
    console.log('Login Button pressed');
    setIsLoggedIn(true);
  };
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
