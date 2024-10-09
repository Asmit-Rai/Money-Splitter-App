import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginScreen from '../screens/Auth/Login'; 
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import GroupDetailScreen from '../screens/GroupDetail/GroupDetail';
import QRScreen from '../screens/QRScanner/QRScreen';
import PaymentIntegrationScreen from '../screens/PaymentIntegration/PaymentIntegrationScreen';
import SplitExpenseScreen from '../screens/SplitExpense/SplitExpenseScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import InviteMemberScreen from '../screens/InviteMember/InviteMemberScreen';
import GroupExpenseSummaryScreen from '../screens/GroupExpenseSummary/GroupExpenseSummaryScreen';
import CreateExpenseScreen from '../screens/CreateExpense/CreateExpenseScreen'; 
import CreateGroupScreen from '../screens/CreateExpense/CreateExpenseScreen'; 
import InviteMembersScreen from '../screens/InviteMember/InviteMemberScreen'; 
import CreateGroup from "@/app/screens/CreateGroup/CreateGroup"
import SignUp from '@/app/screens/Auth/SignUp';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: 'view-dashboard' | 'account-group' | 'account-plus' | 'cog' = 'view-dashboard';
          
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
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Create Group" component={CreateGroup} />
      <Tab.Screen name="Invite Members" component={InviteMembersScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="Money Splitter" component={TabNavigator} />
      <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
      <Stack.Screen name="CreateExpense" component={CreateExpenseScreen} />
      <Stack.Screen name="QRScanner" component={QRScreen} />
      <Stack.Screen name="PaymentIntegration" component={PaymentIntegrationScreen} />
      <Stack.Screen name="SplitExpense" component={SplitExpenseScreen} />
      <Stack.Screen name="InviteMember" component={InviteMemberScreen} />
      <Stack.Screen name="GroupExpenseSummaryScreen" component={GroupExpenseSummaryScreen} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator;