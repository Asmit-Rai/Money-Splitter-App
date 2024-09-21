import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';

const ExpenseManageScreen = () => {
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [payer, setPayer] = useState('');
    const [participants, setParticipants] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState<any[]>([]);

    const saveExpense = () => {
        // Logic to save the expense
    };

    const cancelExpense = () => {
        // Logic to cancel the expense
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Expense Name:</Text>
            <TextInput
                style={styles.input}
                value={expenseName}
                onChangeText={setExpenseName}
                placeholder="Enter expense name"
            />

            <Text style={styles.label}>Amount:</Text>
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Payer:</Text>
            <Picker
                selectedValue={payer}
                onValueChange={(itemValue) => setPayer(itemValue)}
                style={styles.picker}
            >
                {/* Add Picker.Item components here for each payer */}
            </Picker>

            <Text style={styles.label}>Participants:</Text>
            <MultiSelect
                items={participants}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedParticipants}
                selectedItems={selectedParticipants}
                selectText="Pick Participants"
                searchInputPlaceholderText="Search Participants..."
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
            />

            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={saveExpense} />
                <Button title="Cancel" onPress={cancelExpense} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 4,
        marginBottom: 16,
    },
    multiSelect: {
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ExpenseManageScreen;