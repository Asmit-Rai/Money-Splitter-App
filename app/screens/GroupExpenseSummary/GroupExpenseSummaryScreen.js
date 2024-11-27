import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, List, Divider } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const ExpenseDetailsScreen = () => {
  const route = useRoute();
  const { expense, groupName, participants } = route.params;
  const [expenseDetails, setExpenseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const response = await fetch(`https://money-splitter-backend.onrender.com/api/expenses/${expense._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch expense details.');
        }
        const data = await response.json();
        setExpenseDetails(data.expense); // Ensure you're accessing `data.expense`
      } catch (err) {
        console.error('Error fetching expense details:', err);
        setError('Unable to load expense details.');
      } finally {
        setLoading(false);
      }
    };
  
    if (expense && expense._id) {
      fetchExpenseDetails();
    } else {
      setError('Invalid expense data.');
      setLoading(false);
    }
  }, [expense]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{expense.expenseName}</Text>
      <Text style={styles.groupName}>Group: {groupName}</Text>
      <Text style={styles.amount}>Total Amount: ₹{expense.amount}</Text>
      <Text style={styles.paidBy}>Paid By: {expense.payer}</Text>
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
      <Divider style={styles.divider} />
          <Text style={styles.participantsTitle}>Payment History:</Text>
      {expenseDetails?.paymentHistory && expenseDetails.paymentHistory.length > 0 ? (
        expenseDetails.paymentHistory.map((payment, index) => (
          <View key={index} style={styles.paymentItem}>
            <Text>Participant: {payment.participantName}</Text>
            <Text>Status: {payment.status}</Text>
            <Text>Amount Paid: ₹{payment.amountPaid}</Text>
            <Text>Date: {new Date(payment.date).toLocaleString()}</Text>
            <Divider style={styles.divider} />
          </View>
        ))
      ) : (
        <Text>No payment history available.</Text>
      )}
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
  paymentItem: {
    marginBottom: 8,
  },
});

export default ExpenseDetailsScreen;