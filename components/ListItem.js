import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, View,Text,} from 'react-native';
import {uploadsUrl} from '../utils/variables';


const ListItem=({singleMedia})=>{
  const item = singleMedia;
  return(
  <TouchableOpacity>
    <Image
      style={{width: 100, height: 100}}
      source={{uri: uploadsUrl + item.thumbnails?.w160}}
    ></Image>
  <View >
    <Text>{item.title}</Text>
    <Text>{item.description}</Text>
  </View>
</TouchableOpacity>
  );
};
ListItem.propTypes={
  singleMedia: PropTypes.object,
};
export default ListItem;



