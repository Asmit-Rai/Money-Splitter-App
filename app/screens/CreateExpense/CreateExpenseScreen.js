import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Card, List, Avatar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const CreateExpenseScreen = () => {
    const route = useRoute();
    const { expense = {}, groupData = {} } = route.params || {};

    const [expenseName, setExpenseName] = useState(expense.title || '');
    const [amount, setAmount] = useState(expense.amount ? expense.amount.toString() : '');
    const [payer, setPayer] = useState(expense.paidBy || '');
    const [participants, setParticipants] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);

    useEffect(() => {
        // Fetch participants data here and set it
        // For now, we'll use dummy data
        setParticipants([
            { id: '1', name: 'Asmit' },
            { id: '2', name: 'Aryan' },
            { id: '3', name: 'Aman' },
        ]);
    }, []);

    const saveExpense = () => {
        // Logic to save the expense
    };

    const cancelExpense = () => {
        // Logic to cancel the expense
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Title title="Create Expense" />
                    <Card.Content>
                        <Text style={styles.label}>Group Name: {groupData.groupName || 'N/A'}</Text>
                        <TextInput
                            label="Expense Name"
                            value={expenseName}
                            onChangeText={setExpenseName}
                            placeholder="Enter expense name"
                            style={styles.input}
                        />

                        <TextInput
                            label="Amount"
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="Enter amount"
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <Text style={styles.label}>Payer:</Text>
                        <List.Section>
                            {participants.map((participant) => (
                                <List.Item
                                    key={participant.id}
                                    title={participant.name}
                                    left={() => <Avatar.Text size={24} label={participant.name[0]} />}
                                    onPress={() => setPayer(participant.name)}
                                    style={payer === participant.name ? styles.selected : null}
                                />
                            ))}
                        </List.Section>

                        <Text style={styles.label}>Participants:</Text>
                        <List.Section>
                            {participants.map((participant) => (
                                <List.Item
                                    key={participant.id}
                                    title={participant.name}
                                    left={() => <Avatar.Text size={24} label={participant.name[0]} />}
                                    onPress={() => {
                                        if (selectedParticipants.includes(participant.id)) {
                                            setSelectedParticipants(selectedParticipants.filter(id => id !== participant.id));
                                        } else {
                                            setSelectedParticipants([...selectedParticipants, participant.id]);
                                        }
                                    }}
                                    style={selectedParticipants.includes(participant.id) ? styles.selected : null}
                                />
                            ))}
                        </List.Section>

                        <Button mode="contained" onPress={saveExpense} style={styles.button}>
                            Save
                        </Button>

                        <Button mode="outlined" onPress={cancelExpense} style={styles.button}>
                            Cancel
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
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
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    selected: {
        backgroundColor: '#b0b0b0', // Darker grey color
    },
});

export default CreateExpenseScreen;