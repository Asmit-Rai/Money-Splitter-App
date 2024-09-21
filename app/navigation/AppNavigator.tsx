import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/Auth/Login'; // Make sure paths are correct
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import GroupDetailScreen from '../screens/GroupDetail/GroupDetail';
import QRScreen from '../screens/QRScanner/QRScreen';
import PaymentIntegrationScreen from '../screens/PaymentIntegration/PaymentIntegrationScreen';
import SplitExpenseScreen from '../screens/SplitExpense/SplitExpenseScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import InviteMemberScreen from '../screens/InviteMember/InviteMemberScreen';
import GroupExpenseSummaryScreen from '../screens/GroupExpenseSummary/GroupExpenseSummaryScreen';
import CreateExpenseScreen from '@/app/screens/CreateExpense/CreateExpenseScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
  
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
        <Stack.Screen name="CreateExpense" component={CreateExpenseScreen} />
        <Stack.Screen name="QRScanner" component={QRScreen} />
        <Stack.Screen name="PaymentIntegration" component={PaymentIntegrationScreen} />
        <Stack.Screen name="SplitExpense" component={SplitExpenseScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="InviteMember" component={InviteMemberScreen} />
        <Stack.Screen name="GroupExpenseSummaryScreen" component={GroupExpenseSummaryScreen} />
      </Stack.Navigator>
  
  );
};

export default AppNavigator;
