import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Avatar, List, Divider, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const GroupDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { groupDetails } = route.params; 
  const [expenses, setExpenses] = useState([]); 
  const [refreshing, setRefreshing] = useState(false);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`https://money-splitter-backend.onrender.com/api/expenses/show-data`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);

      const groupExpenses = data.expenses.filter(
        (expense) => String(expense.group) === String(groupDetails._id)
      );

      console.log('Filtered group expenses:', groupExpenses);
      setExpenses(groupExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    if (groupDetails) {
      fetchExpenses();
    }
  }, [groupDetails]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchExpenses().then(() => setRefreshing(false));
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Group Header */}
      <Card style={styles.groupCard}>
        <View style={styles.groupHeader}>
          <Image
            source={{ uri: groupDetails.groupImage || 'https://via.placeholder.com/150' }}
            style={styles.groupImage}
          />
          <View style={styles.groupHeaderText}>
            <Text style={styles.groupName}>{groupDetails.groupName}</Text>
          </View>
        </View>
        <Button
          mode="contained"
          style={styles.scanButton}
          onPress={() =>
            navigation.navigate('QRScanner', {
              participants: groupDetails.participants,
              currentGroupId: groupDetails._id,
            })
          }
        >
          Pay
        </Button>
      </Card>

      {/* Expenses List */}
      <List.Section>
        {expenses.length > 0 ? (
          expenses.map((expense) => {
            const payerName = expense.payer?.name || 'Unknown';
            const expenseDate = new Date(expense.createdAt).toLocaleDateString();

            return (
              <React.Fragment key={expense._id}>
                <List.Item
                  title={expense.expenseName}
                  description={
                    <View>
                      <Text>Paid by: {payerName}</Text>
                      <Text style={styles.expenseDate}>Date: {expenseDate}</Text>
                    </View>
                  }
                  left={(props) => <Avatar.Icon {...props} icon="currency-usd" />}
                  right={(props) => (
                    <Text {...props} style={styles.amount}>
                      ₹{expense.amount}
                    </Text>
                  )}
                  onPress={() => navigation.navigate('GroupExpenseSummaryScreen', {
                    expenseSummary: expense,
                    groupName: groupDetails.groupName,
                    participants: groupDetails.participants,
                    paymentStatus: expense.paymentStatus || [],
                  })}
                />
                <Divider />
              </React.Fragment>
            );
          })
        ) : (
          <Text style={styles.noExpensesText}>No expenses found for this group.</Text>
        )}
      </List.Section>

      {/* Add Expense Button */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  groupCard: {
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  groupImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  groupHeaderText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scanButton: {
    marginTop: 10,
    width: '100%',
  },
  amount: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addExpenseButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  noExpensesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  expenseDate: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
});

export default GroupDetailScreen;