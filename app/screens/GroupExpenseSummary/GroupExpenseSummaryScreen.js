import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Card, Text, List } from 'react-native-paper';

const GroupExpenseSummaryScreen = () => {
    const route = useRoute();
    const { expenseSummary, groupName, participants, paymentStatus } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Group Expense Summary" />
                <Card.Content>
                    <Text style={styles.label}>Group Name: {groupName}</Text>
                    <Text style={styles.label}>Expense Name: {expenseSummary.expenseName}</Text>
                    <Text style={styles.label}>Amount: ₹{expenseSummary.amount}</Text>
                    <Text style={styles.label}>Paid By: {expenseSummary.paidBy}</Text>
                    <Text style={styles.label}>Date: {new Date(expenseSummary.date.$date).toLocaleDateString()}</Text>

                    <Text style={styles.subHeading}>Split Details:</Text>
                    {expenseSummary.splitDetails.map((split) => (
                        <Text key={split.participant} style={styles.label}>
                            {split.participant}: Owes ₹{split.owedAmount}
                        </Text>
                    ))}

                    <Text style={styles.subHeading}>Participants:</Text>
                    {participants.map((participant) => (
                        <List.Item
                            key={participant._id.$oid}
                            title={participant.name}
                            description={participant.email}
                            left={() => <List.Icon icon="account" />}
                            style={styles.participant}
                        />
                    ))}

                    <Text style={styles.subHeading}>Payment Status:</Text>
                    {paymentStatus.map((payment, idx) => (
                        <Text key={payment.participant + payment.status + idx} style={styles.label}>
                            {payment.participant}: {payment.status} (₹{payment.amountPaid})
                        </Text>
                    ))}
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
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
        fontWeight: 'bold',
        marginVertical: 8,
    },
    participant: {
        marginLeft: 16,
    },
});

export default GroupExpenseSummaryScreen;
