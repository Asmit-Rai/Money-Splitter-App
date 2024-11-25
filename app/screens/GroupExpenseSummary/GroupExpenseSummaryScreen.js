import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Card, Text, List } from "react-native-paper";

const GroupExpenseSummaryScreen = () => {
  const route = useRoute();
  const { expenseSummary, groupName, participants } = route.params;
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [splitDetails, setSplitDetails] = useState([]);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(
          `https://money-splitter-backend.onrender.com/api/expenses/${expenseSummary.paymentIntentId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched payment status:", data);

        setPaymentStatus(data.paymentStatus || []);
        setSplitDetails(data.splitDetails || []);
      } catch (error) {
        console.error("Error fetching payment status:", error.message);
      }
    };

    if (expenseSummary?.paymentIntentId) {
      fetchPaymentStatus();
    }
  }, [expenseSummary.paymentIntentId]);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Group Expense Summary" />
        <Card.Content>
          <Text style={styles.label}>Group Name: {groupName}</Text>
          <Text style={styles.label}>
            Expense Name: {expenseSummary.expenseName}
          </Text>
          <Text style={styles.label}>Amount: ₹{expenseSummary.amount}</Text>
          <Text style={styles.label}>
            Paid By: {expenseSummary.payer?.name || "Unknown"}
          </Text>
          <Text style={styles.label}>
            Date: {new Date(expenseSummary.createdAt).toLocaleDateString()}
          </Text>

          <Text style={styles.subHeading}>Split Details:</Text>
          {splitDetails.length > 0 ? (
            splitDetails.map((split, idx) => (
              <Text key={idx} style={styles.label}>
                {split.participant}: Owes ₹{split.owedAmount}
              </Text>
            ))
          ) : (
            <Text style={styles.label}>No split details available.</Text>
          )}

          <Text style={styles.subHeading}>Participants:</Text>
          {participants.map((participant) => {
            const payment = paymentStatus.find(
              (p) => p.participant === participant.name
            );
            const hasPaid = payment ? payment.status === "succeeded" : false;

            return (
              <List.Item
                key={participant._id}
                title={participant.name}
                description={`${participant.email} - ${
                  hasPaid ? "Has Paid" : "Has Not Paid"
                }`}
                left={() => <List.Icon icon="account" />}
                style={styles.participant}
              />
            );
          })}

          <Text style={styles.subHeading}>Payment Status:</Text>
          {paymentStatus.length > 0 ? (
            paymentStatus.map((payment, idx) => (
              <Text
                key={payment.participant + payment.status + idx}
                style={styles.label}
              >
                {payment.participant}: {payment.status} (₹{payment.amountPaid})
              </Text>
            ))
          ) : (
            <Text style={styles.label}>No payment status available.</Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    margin: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  participant: {
    marginLeft: 16,
  },
});

export default GroupExpenseSummaryScreen;
