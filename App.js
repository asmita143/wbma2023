import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, SafeAreaView} from 'react-native';
import Navigator from './navigators/navigator';


const App = () => {
  return (
    <>
    <Navigator/>
      <StatusBar style="auto"/>
    </>
  );
};
export default App;



