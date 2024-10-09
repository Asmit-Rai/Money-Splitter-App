import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Card, Avatar, List, Divider, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const GroupDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { groupDetails } = route.params;

  console.log(groupDetails);

  return (
    <View style={styles.container}>
      {/* Group Header */}
      <Card style={styles.groupCard}>
        <View style={styles.groupHeader}>
          <Image
            source={{ uri: groupDetails.groupImage }}
            style={styles.groupImage}
          />
          <View style={styles.groupHeaderText}>
            <Text style={styles.groupName}>{groupDetails.groupName}</Text>
          </View>
        </View>
        <Button
          mode="contained"
          style={styles.scanButton}
          onPress={() => navigation.navigate('QRScanner')}
        >
          Scan the QR to send payment
        </Button>
      </Card>

      {/* Expenses List */}
      <List.Section>
    {groupDetails.expenses.map((expense, index) => (
      <React.Fragment key={expense._id}>
        <List.Item
          title={expense.expenseName}
          key={expense._id}
          description={`Paid by ${expense.paidBy}`}
          left={(props) => <Avatar.Icon {...props} icon="currency-usd" />}
          right={(props) => <Text {...props} style={styles.amount}>₹{expense.amount}</Text>}
          onPress={() => navigation.navigate('GroupExpenseSummaryScreen', { 
              expenseSummary: expense, 
              groupName: groupDetails.groupName, 
              participants: groupDetails.participants, 
              paymentStatus: groupDetails.paymentStatus 
          })}
        />
        <Divider />
      </React.Fragment>
    ))}
</List.Section>

      {/* Add Expense Button */}
      <View style={styles.addExpenseButton}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('CreateExpense')}
        >
          Add Expense
        </Button>
      </View>
    </View>
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
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
});

export default GroupDetailScreen;