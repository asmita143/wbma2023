
import {FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';
import { useMedia } from '../hooks/ApiHooks';

const List = () => {
  const {mediaArray} = useMedia();
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};
export default List;
