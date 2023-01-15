import {StatusBar} from 'expo-status-bar';
import Navigator from './navigators/navigator';


const App = () => {
  return (
    <>
    <StatusBar backgroundColor="#4169e1" style="dark-content" />
      <Navigator />

    </>
  );
};
export default App;



