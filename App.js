import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/navigator';


const App = () => {
  return (
    <MainProvider>
    <StatusBar backgroundColor="#4169e1" style="dark-content" />
      <Navigator />
    </MainProvider>
  );
};
export default App;



