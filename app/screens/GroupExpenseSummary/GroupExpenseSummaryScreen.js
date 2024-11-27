import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Divider } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const ExpenseDetailsScreen = () => {
  const route = useRoute();
  const { expense, groupName, participants } = route.params;

  if (!expense) {
    return <Text>Error: Expense details not found.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{expense.expenseName}</Text>
      <Text style={styles.groupName}>Group: {groupName}</Text>
      <Text style={styles.amount}>Total Amount: ₹{expense.amount}</Text>
      <Text style={styles.paidBy}>Paid By: {expense.payerName}</Text>
      <Text style={styles.date}>
        Date: {new Date(expense.createdAt).toLocaleDateString()}
      </Text>
      <Divider style={styles.divider} />

      <Text style={styles.participantsTitle}>Split Details:</Text>
      {expense.splitDetails.map((split, index) => (
        <List.Item
          key={index}
          title={`${participants.find((p) => p._id === split.participant)?.name || 'Unknown'}`}
          description={`Owed Amount: ₹${split.owedAmount}`}
          left={(props) => <List.Icon {...props} icon="account-circle" />}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  groupName: {
    fontSize: 18,
    marginBottom: 4,
    color: '#555',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  paidBy: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  date: {
    fontSize: 16,
    marginBottom: 12,
    color: '#555',
  },
  divider: {
    marginVertical: 16,
  },
  participantsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ExpenseDetailsScreen;