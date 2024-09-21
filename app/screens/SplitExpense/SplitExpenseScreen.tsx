import React, { useState } from 'react';

interface Participant {
    id: number;
    name: string;
    amount: number;
}

const SplitExpenseScreen: React.FC = () => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [splitDetails, setSplitDetails] = useState<string>('');

    const handleAddParticipant = () => {
        const newParticipant: Participant = {
            id: participants.length + 1,
            name: '',
            amount: 0,
        };
        setParticipants([...participants, newParticipant]);
    };

    const handleParticipantNameChange = (id: number, name: string) => {
        const updatedParticipants = participants.map((participant) =>
            participant.id === id ? { ...participant, name } : participant
        );
        setParticipants(updatedParticipants);
    };

    const handleParticipantAmountChange = (id: number, amount: number) => {
        const updatedParticipants = participants.map((participant) =>
            participant.id === id ? { ...participant, amount } : participant
        );
        setParticipants(updatedParticipants);
    };

    const handleSplitExpense = () => {
        // Calculate split details here
        // Update splitDetails state
    };

    return (
        <div>
            <h1>Split Expense</h1>
            <button onClick={handleAddParticipant}>Add Participant</button>
            {participants.map((participant) => (
                <div key={participant.id}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={participant.name}
                            onChange={(e) => handleParticipantNameChange(participant.id, e.target.value)}
                        />
                        amount:
                         <input
                        type="number"
                        value={participant.amount}
                        onChange={(e) => handleParticipantAmountChange(participant.id, parseInt(e.target.value))}
                    />
                    </label>

        
                </div>
            ))}
            <button onClick={handleSplitExpense}>Split Expense</button>
            <div>{splitDetails}</div>
        </div>
    );
};

export default SplitExpenseScreen;