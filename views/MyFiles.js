import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';


const MyFiles = ({navigation}) => {
  return (
    <List navigation={navigation} myFilesOnly={true}>

    </List>
  )
}
MyFiles.protoTypes={
  navigation: PropTypes.object,
};

export default MyFiles;
