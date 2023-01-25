import React, {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uploadsUrl} from '../utils/variables';
import {useTag} from '../hooks/ApiHooks';
import {useState} from 'react';
import {useEffect} from 'react';
import {Card,ListItem, Icon,Button} from '@rneui/themed';


const Profile = () => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(avatarArray.pop().filename);
      console.log('user avatar', avatar);
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };
  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <Card>
      <Card.Title>{user.username}</Card.Title>
      <Card.Image source={{uri: uploadsUrl + avatar}} />
      <ListItem>
        <Icon name="email"></Icon>
        <ListItem.Title>{user.email}</ListItem.Title>
      </ListItem>
      <ListItem>
        <ListItem.Title>Full name:{user.full_name}</ListItem.Title>
        </ListItem>
      <Button
        title="Logout!"
        buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
              containerStyle={{
                marginHorizontal: 50,
                marginVertical: 10,
              }}
        onPress={async () => {
          setUser({});
          setIsLoggedIn(false);
          try {
            await AsyncStorage.clear();
          } catch (error) {
            console.error('Clearing asyncstorage failed', error);
          }
        }}
      />
    </Card>
  );
};

export default Profile;
