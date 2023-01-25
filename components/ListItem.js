import PropTypes from 'prop-types';
import {Image, TouchableOpacity} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {ListItem as RNEListItem, Button, Divider, Avatar} from '@rneui/base';

const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  return (
      <RNEListItem bottomDivider>

        <Avatar size="large"source={{uri: uploadsUrl + item.thumbnails?.w160}}></Avatar>
        <RNEListItem.Content>
          <RNEListItem.Title color="red" >{item.title}</RNEListItem.Title>
          <RNEListItem.Subtitle>{item.description}</RNEListItem.Subtitle>
          </RNEListItem.Content>
          <Button
             onPress=
            {() => {
              navigation.navigate('Single', item);
            }}>View
          </Button>

      </RNEListItem>


  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};
export default ListItem;
