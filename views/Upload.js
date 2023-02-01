import {Button, Card, Input} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useState, useContext, useCallback} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '../utils/variables';

const Upload = ({navigation}) => {
  const [mediafile, setMediaFile] = useState({});
  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {title: '', description: ''},
    mode: 'onBlur',
  });

  const uploadFile = async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);

    const filename = mediafile.uri.split('/').pop();
    const fileExt = filename.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediafile.type + '/' + fileExt;

    formData.append('file', {
      uri: mediafile.uri,
      name: filename,
      type: mimeType,
    });
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postMedia(formData, token);
      console.log('upload result', result);
      const appTag = {
        file_id: result.file_id,
        tag: appId,
      };
      const tagResult = await postTag(appTag, token);
      Alert.alert('File Uploaded', 'File_id: ' + result.file_id, [
        {
          text: 'Ok',
          onPress: () => {
            console.log('ok pressed');
            setUpdate(!update);
            //reset();
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('file upload failed', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const pickFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log(result);

      if (!result.canceled) {
        setMediaFile(result.assets[0]);
        //validate form
        trigger();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetForm = () => {
    setMediaFile({});
    reset();
  };
  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log('leaving');
        resetForm();
      };
    }, [])
  );
  return (
    <ScrollView>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <Card>
          <Card.Image
            source={{uri: mediafile.uri || 'https://placekitten.com/200/300'}}
            onPress={pickFile}
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'is required',
                minLength: {
                  value: 3,
                  message: 'Title should be atleast 3 characters',
                },
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title && errors.title.message}
              />
            )}
            name="title"
          />
          <Controller
            control={control}
            rules={{
              minLength: {
                value: 5,
                message: 'Description should be atleast 5 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.description && errors.description.message}
              />
            )}
            name="description"
          />

          <Button title="Pick a File" onPress={pickFile} />
          <Button
            disabled={!mediafile.uri || errors.title || errors.description}
            title="Upload"
            onPress={handleSubmit(uploadFile)}
          />
          <Button title={'Reset'} onPress={resetForm} type="outline"></Button>
          {loading && <ActivityIndicator size="large"></ActivityIndicator>}
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
