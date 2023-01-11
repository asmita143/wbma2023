import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, } from 'react-native';
import ListItem from './ListItem';


const List = () => {
  const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const [mediaArray,setMediaArray] =  useState([]);

   const loadMedia = async () => {
     const response = await fetch(url);
     const json = await response.json();

     setMediaArray(json);
     console.log('List, MediaArray ',mediaArray);
   };

   useEffect(() => {
    loadMedia();
   },[])

  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item}/>}

    />
  );
};
export default List;
