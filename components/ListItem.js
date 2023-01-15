import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, View,Text,} from 'react-native';
import {uploadsUrl} from '../utils/variables';


const ListItem=({singleMedia, navigation})=>{
  const item = singleMedia;
  return(
  <TouchableOpacity style={styles.row} onPress={()=>{
    navigation.navigate('Single', item );
  }}>
    <View style={styles.box}>
    <Image
      style={styles.image}
      source={{uri: uploadsUrl + item.thumbnails?.w160}}
    ></Image>
    </View>
  <View style={styles.box}>
  <Text style={styles.listTitle}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
  </View>
</TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#800080',
    marginBottom: 20,

  },
  box: {
    flex: 1,
    padding: 10,
    paddingTop:20,

  },
  image: {
    flex: 1,
    minHeight: 100,
    borderBottomLeftRadius:30,
    borderTopLeftRadius:10,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
    color:'#ffffff'
  },
  description:{
    fontSize:16,
    color:'#ffffff'
  }
});
ListItem.propTypes={
  singleMedia: PropTypes.object,
  navigation :PropTypes.object,
};
export default ListItem;



