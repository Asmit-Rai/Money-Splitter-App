import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Card, Avatar, List, Divider, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const GroupDetailScreen = () => {
  const navigation = useNavigation();

  // Dummy group data
  const groupData = {
    groupName: 'Trip to Paris',
    groupImage: 'https://example.com/group-image.jpg',
    expenses: [
      { title: 'Hotel Booking', amount: 200, paidBy: 'John' },
      { title: 'Flight Tickets', amount: 500, paidBy: 'Jane' },
      { title: 'Dinner', amount: 100, paidBy: 'Mike' },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Group Header */}
      <Card style={styles.groupCard}>
        <View style={styles.groupHeader}>
          <Image source={{ uri: groupData.groupImage }} style={styles.groupImage} />
          <View style={styles.groupHeaderText}>
            <Text style={styles.groupName}>{groupData.groupName}</Text>
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
        {groupData.expenses.map((expense, index) => (
          <React.Fragment key={index}>
            <List.Item
              title={expense.title}
              description={`Paid by ${expense.paidBy}`}
              left={(props) => <Avatar.Icon {...props} icon="currency-usd" />}
              right={(props) => <Text {...props} style={styles.amount}>${expense.amount}</Text>}
              onPress={() => navigation.navigate('GroupExpenseSummaryScreen', { expense, groupData })}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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