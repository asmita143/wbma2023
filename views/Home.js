import {Platform, StyleSheet, SafeAreaView, ImageBackground,Text,View} from 'react-native';
import List from '../components/List'
import PropTypes from 'prop-types';
import * as Icon from 'react-native-feather';

const Home=({navigation})=>{
  return (
    <>
      <SafeAreaView style={styles.container}>
       <View style={styles.bg}>
       <ImageBackground
       source={require('../assets/Cute_dog_small.jpg')}
       style={styles.bgImage}
        >
       </ImageBackground>
       <Text style={styles.bgText}>Puppies are cutest!!</Text>
       <Icon.Menu style={styles.menuIcon}/>

       </View>
        <List navigation={navigation} />
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  bg: {
    paddingBottom: 20,
  },
  bgImage: {
    height: 250,
    width: '100%',
    borderBottomRightRadius:40,

  },
  bgText: {
    color: 'white',
    position: 'absolute',
    bottom: 40,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: 20,
    padding:10,
  },
  menuIcon: {
    color:'white',
    top:10,
    left:15,
    position:'absolute',
  }
});
Home.propTypes={
  navigation:PropTypes.object,
}

export default Home;
