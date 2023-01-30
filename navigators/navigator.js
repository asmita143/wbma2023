import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Single from '../views/Single';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContext';
import Upload from '../views/Upload';
import {Icon} from '@rneui/themed';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen=()=>{
   return(
    <Tab.Navigator >
        <Tab.Screen name="Home" component={Home} options={{tabBarIcon:(color)=> <Icon name="home" color={color}/>}}/>
        <Tab.Screen name="Upload" component={Upload} options={{tabBarIcon:()=> <Icon name="cloud-upload"/>}}/>
        <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon:()=> <Icon name="person"/>}} />

      </Tab.Navigator>
   )
}
const StackScreen = () => {
  useContext(MainContext);
  const {isLoggedIn}=useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Single" component={Single} />
        </>
      ) : (
        <Stack.Screen name="LogIn" component={Login}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
