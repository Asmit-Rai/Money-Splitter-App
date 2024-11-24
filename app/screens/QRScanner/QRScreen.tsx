import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, Button, TextInput, List, Checkbox } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

type Participant = {
  name: string;
};

type QRScreenRouteProp = RouteProp<{ QRScanner: { participants: Participant[] } }, 'QRScanner'>;

const QRScreen = () => {
  const route = useRoute<QRScreenRouteProp>();
  const { participants } = route.params;

  const [billAmount, setBillAmount] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [splitAmount, setSplitAmount] = useState('');
  const [checked, setChecked] = useState(true);
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({});
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (billAmount) {
      initializePaymentSheet();
    }
  }, [billAmount]);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`https://money-splitter-backend.onrender.com/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ billAmount: parseFloat(billAmount) * 100 }), // Convert to smallest currency unit
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    } else {
      console.error("Error initializing payment sheet:", error);
    }
  };

  const openPaymentSheet = async () => {
    if (!loading) return;
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error: ${error.message}`);
    } else {
      Alert.alert('Success', 'Your payment is confirmed!');
    }
  };

  const calculateSplit = () => {
    const amount = parseFloat(billAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Bill Amount', 'Please enter a valid bill amount.');
      return;
    }

    if (participants.length === 0) {
      Alert.alert('No Participants', 'There are no participants to split the bill.');
      return;
    }

    if (checked) {
      const perPerson = (amount / participants.length).toFixed(2);
      setSplitAmount(perPerson);

      const equalAmounts: { [key: string]: string } = {};
      participants.forEach((participant) => {
        equalAmounts[participant.name] = perPerson;
      });
      setAmounts(equalAmounts);
    } else {
      const totalEntered = Object.values(amounts).reduce(
        (sum, val) => sum + parseFloat(val || '0'),
        0
      );

      if (isNaN(totalEntered) || totalEntered <= 0) {
        Alert.alert('Invalid Amounts', 'Please enter valid amounts for participants.');
        return;
      }

      if (totalEntered !== amount) {
        Alert.alert(
          'Amounts Mismatch',
          `The total of individual amounts (${totalEntered.toFixed(
            2
          )}) does not equal the bill amount (${amount.toFixed(2)}).`
        );
        return;
      }
      setSplitAmount('');
    }
  };

  const confirmSplit = () => {
    if (!expenseName) {
      Alert.alert('Expense Name Required', 'Please enter the expense name.');
      return;
    }

    if (checked) {
      Alert.alert('Split Details', `Each participant needs to pay: ₹${splitAmount}`);
    } else {
      Alert.alert('Split Details', 'Amounts have been set for each participant.');
    }
  };

  const handleAmountChange = (name: string, value: string) => {
    setAmounts({ ...amounts, [name]: value });
  };

  return (
    <StripeProvider publishableKey='pk_test_51QIsU3EbklFJ2mKnHm8ptUIow6AueGIYorOvFKJRAzzfZk7AHYCqAqGMZ2tx1vlUe8nDCltXQUIQPIA8mcLBLdt100oydNPXKQ'>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          mode="outlined"
          label="Enter Expense Name"
          value={expenseName}
          onChangeText={setExpenseName}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Enter Bill Amount"
          keyboardType="numeric"
          value={billAmount}
          onChangeText={setBillAmount}
          style={styles.input}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
          />
          <Text style={{ fontSize: 16, marginLeft: 8, marginTop: 8 }}>
            Split Money Equally
          </Text>
        </View>

        {!checked && (
          <List.Section>
            {participants.map((participant, index) => (
              <View key={index} style={styles.participantRow}>
                <List.Item
                  title={participant.name}
                  left={() => <List.Icon icon="account" />}
                  style={{ flex: 1 }}
                />
                <TextInput
                  mode="outlined"
                  label="Amount"
                  keyboardType="numeric"
                  value={amounts[participant.name] || ''}
                  onChangeText={(value) => handleAmountChange(participant.name, value)}
                  style={styles.amountInput}
                />
              </View>
            ))}
          </List.Section>
        )}

        {checked && splitAmount ? (
          <Text style={styles.splitText}>
            Each participant needs to pay: ₹ {splitAmount}
          </Text>
        ) : null}

        <Button mode="contained" onPress={calculateSplit} style={styles.button}>
          {checked ? 'Calculate Equal Split' : 'Validate Amounts'}
        </Button>

        <Button mode="contained" onPress={confirmSplit} style={styles.button}>
          Confirm
        </Button>

        <Button
          mode="contained"
          onPress={openPaymentSheet}
          style={styles.button}
          disabled={!loading}
        >
          Checkout
        </Button>
      </ScrollView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amountInput: {
    flex: 1,
    marginLeft: 10,
  },
  splitText: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default QRScreen;