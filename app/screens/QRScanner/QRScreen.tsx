import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Text, Button, TextInput, List, Card } from 'react-native-paper';

const QRScreen = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [participants, setParticipants] = useState<{ name: string }[]>([]);
  const [billAmount, setBillAmount] = useState('');
  const [splitAmount, setSplitAmount] = useState('');

  const handleBarCodeRead = ({ data }: { data: string }) => {
    setScannedData(data);
  };

  const addParticipant = (name: string) => {
    setParticipants([...participants, { name }]);
  };

  const calculateSplit = () => {
    const amount = parseFloat(billAmount);
    if (amount && participants.length > 0) {
      setSplitAmount((amount / participants.length).toFixed(2));
    }
  };

  const confirmSplit = () => {
    // Handle confirmation logic here
    alert(`Each participant needs to pay: $${splitAmount}`);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.cameraCard}>
        <RNCamera
          style={styles.camera}
          onBarCodeRead={handleBarCodeRead}
        >
          <Text style={styles.cameraText}>Scan QR Code</Text>
        </RNCamera>
      </Card>
      <Text>Scanned Data: {scannedData}</Text>
      <TextInput
        mode="outlined"
        label="Enter Bill Amount"
        keyboardType="numeric"
        value={billAmount}
        onChangeText={setBillAmount}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Add Participant"
        onSubmitEditing={(event) => addParticipant(event.nativeEvent.text)}
        style={styles.input}
      />
      <List.Section>
        {participants.map((participant, index) => (
          <List.Item
            key={index}
            title={participant.name}
            left={() => <List.Icon icon="account" />}
          />
        ))}
      </List.Section>
      <Button mode="contained" onPress={calculateSplit} style={styles.button}>
        Split Bill
      </Button>
      <Text>Each participant needs to pay: ${splitAmount}</Text>
      <Button mode="contained" onPress={confirmSplit} style={styles.button}>
        Confirm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cameraCard: {
    marginBottom: 16,
    width: '100%',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
  },
});

export default QRScreen;