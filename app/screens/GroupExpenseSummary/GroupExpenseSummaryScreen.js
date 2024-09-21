import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Card, Text, List } from 'react-native-paper';

const GroupExpenseSummaryScreen = () => {
    const route = useRoute();
    const { expense, groupData } = route.params;

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        // Fetch participants data here and set it
        // For now, we'll use dummy data
        setParticipants([
            { id: '1', name: 'John' },
            { id: '2', name: 'Jane' },
            { id: '3', name: 'Mike' },
        ]);
    }, []);

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Group Expense Summary" />
                <Card.Content>
                    <Text style={styles.label}>Group Name: {groupData.groupName}</Text>
                    <Text style={styles.label}>Expense Name: {expense.title}</Text>
                    <Text style={styles.label}>Amount: ${expense.amount}</Text>
                    <Text style={styles.label}>Paid By: {expense.paidBy}</Text>
                    <Text style={styles.label}>Participants:</Text>
                    {participants.map((participant) => (
                        <List.Item
                            key={participant.id}
                            title={participant.name}
                            left={() => <List.Icon icon="account" />}
                            style={styles.participant}
                        />
                    ))}
                </Card.Content>
            </Card>
        </View>
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
    participant: {
        marginLeft: 16,
    },
});

export default GroupExpenseSummaryScreen;