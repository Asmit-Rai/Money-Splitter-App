import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Modal, Portal, Text, Provider as PaperProvider, List } from 'react-native-paper';
import axios from 'axios';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [visible, setVisible] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [members, setMembers] = useState([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleCreateGroup = async () => {
    if (!groupName) {
      Alert.alert('Validation Error', 'Group name is required!', [{ text: 'OK' }]);
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.149.155:5000/api/groups/add-groups', {
        groupName,
        participants: members.map(member => ({ name: member.name, email: member.email })),
      });
  
      Alert.alert('Success', `Group '${response.data.group.groupName}' created successfully!`, [{ text: 'OK' }]);
      setGroupName('');
      setMembers([]);
    } catch (error) {
      console.error('Error creating group:', error);
      Alert.alert('Error', 'Failed to create group. Please try again.', [{ text: 'OK' }]);
    }
  };
  

  const handleAddMember = () => {
    if (!memberName || !memberEmail) {
      Alert.alert('Validation Error', 'Both name and email are required!', [{ text: 'OK' }]);
      return;
    }

    const newMember = { name: memberName, email: memberEmail };
    setMembers([...members, newMember]);
    setMemberName('');
    setMemberEmail('');
    hideModal();
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          mode="outlined"
          style={styles.input}
          label="Group Name"
          value={groupName}
          onChangeText={setGroupName}
        />

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Member</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Member Name"
              value={memberName}
              onChangeText={setMemberName}
            />
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Member Email"
              value={memberEmail}
              onChangeText={setMemberEmail}
            />
            <Button mode="contained" onPress={handleAddMember} style={styles.modalButton}>
              Add Member
            </Button>
          </Modal>
        </Portal>

        <Button mode="contained" onPress={showModal} style={styles.addButton}>
          Add Members
        </Button>

        {members.length > 0 && (
          <View style={styles.memberList}>
            <Text style={styles.memberListTitle}>Members:</Text>
            {members.map((member, index) => (
              <List.Item
                key={index}
                title={member.name}
                description={member.email}
                left={() => <List.Icon icon="account" />}
              />
            ))}
          </View>
        )}

        <Button icon="account-group" mode="contained" onPress={handleCreateGroup} style={styles.createButton}>
          Create Group
        </Button>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  addButton: {
    marginVertical: 20,
  },
  createButton: {
    marginTop: 30,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 20,
  },
  memberList: {
    marginTop: 20,
  },
  memberListTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CreateGroup;
