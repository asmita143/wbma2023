import {Button, Card, Input} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {ActivityIndicator, Keyboard, ScrollView, TouchableOpacity, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useState,useContext} from 'react';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const [mediafile, setMediaFile] = useState({});
  const [loading,setLoading]=useState(false);
  const {postMedia}=useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {title: '', description: ''},
  });

  const uploadFile = async (data) => {
   setLoading(true);
    const formData = new FormData();

    formData.append('title',data.title);
    formData.append('description',data.description);

    const filename=mediafile.uri.split('/').pop();
    const fileExt =filename.split('.').pop();
    if(fileExt==='jpg') fileExt='jpeg'
    const mimeType=mediafile.type + '/'+ fileExt;

    formData.append('file',{
      uri: mediafile.uri,
    name:filename,
    type: mimeType,
  });
  try {
    const result=await postMedia(
      formData,
       await AsyncStorage.getItem('userToken'));
    console.log('upload result',result);
    Alert.alert('File Uploaded','File_id: '+result.file_id, [
      {text:'Ok', onPress:()=>{
        console.log('ok pressed')
        setUpdate(!update);
      }}
    ]);
  } catch (error) {
    console.error('file upload failed', error)
    setLoading(false);
  }finally{
    setLoading(false);
  }
  };
  const pickFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setMediaFile(result.assets[0]);
    }
  };
  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
      >
        <Card>
          <Card.Image
            source={{uri: mediafile.uri || 'https://placekitten.com/200/300'}}
          />
          <Controller
            control={control}
            rules={{required: {value: true, message: 'is required'}}}
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
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
          />

          <Button title="Pick a File" onPress={pickFile} />
          <Button disabled={!mediafile.uri} title="Upload" onPress={handleSubmit(uploadFile)} />
          {loading && <ActivityIndicator size='large'></ActivityIndicator>}
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
