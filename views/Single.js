import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const Single = ({route}) => {
  const{title,description, filename, time_added:timeAdded}= route.params;
  return (
    <SafeAreaView style={styles.container}>

      <Image style={styles.image} source={{uri: uploadsUrl + filename}}/>
      <View style={styles.titleView}>
      <Text style={styles.title}>{title}</Text>
      </View>
      <Text>uploaded at :{new Date(timeAdded).toLocaleString('fi-FI')}</Text>
      <Text>{description}</Text>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

    paddingTop: 10,
  },
  image:{
    width:'100%',
    height:'50%',
  },
  title:{
    fontSize:25,
  },
  titleView: {
    backgroundColor:'pink',
    top:0,
  }
});
Single.propTypes={
   route: PropTypes.object,
}

export default Single;
