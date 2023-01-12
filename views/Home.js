import {Platform, StyleSheet, SafeAreaView} from 'react-native';
import List from '../components/List'

const Home=()=>{
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List />
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8d8d8',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default Home;
