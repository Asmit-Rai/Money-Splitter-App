import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginScreen from '../screens/Auth/Login'; 
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import GroupDetailScreen from '../screens/GroupDetail/GroupDetail';
import QRScreen from '../screens/QRScanner/QRScreen';
import GroupExpenseSummaryScreen from '../screens/GroupExpenseSummary/GroupExpenseSummaryScreen';
import CreateGroup from '../screens/CreateGroup/CreateGroup'; 
import SignUp from '../screens/Auth/SignUp'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'view-dashboard'; 
          
          if (route.name === 'Dashboard') {
            iconName = 'view-dashboard';
          } else if (route.name === 'Create Group') {
            iconName = 'account-group';
          } else if (route.name === 'Invite Members') {
            iconName = 'account-plus';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }
          
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#663399',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Prevents header duplication
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Create Group" component={CreateGroup} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Money Splitter" component={TabNavigator} />
      <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
      <Stack.Screen name="GroupExpenseSummaryScreen" component={GroupExpenseSummaryScreen} />
      <Stack.Screen name="QRScanner" component={QRScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
