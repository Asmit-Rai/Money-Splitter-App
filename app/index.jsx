import {View ,Text} from 'react-native';
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';


const index = ()=>
{
    return (
        <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
   
    );
};
export default index;