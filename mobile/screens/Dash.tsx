import React from 'react';
import {useEffect} from 'react';
import {Text, View} from 'react-native';

export const Dash = ({navigation, route}) => {
  useEffect(() => {
    if (!route.params.username) {
      navigation.navigate('Login');
    }
  }, [route]);
  console.log('hello');
  return (
    <View>
      <Text>Welcome to the Dash page {route.params.username}</Text>
    </View>
  );
};
