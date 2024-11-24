import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import { Avatar, Text } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import Modal from "react-native-modal";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        setUsername(user.email);
        await AsyncStorage.setItem("email", user.email);
      }
    };
  
    fetchEmail();
  }, []);
  

  const fetchData = async () => {
    setLoading(true);
    try {
      const email = await AsyncStorage.getItem("email"); // Use AsyncStorage to retrieve the email
      const response = await axios.get(
        `https://money-splitter-backend.onrender.com/api/groups/show-groups?email=${email}`
      );
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch groups. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const totalMembers = (groupId) => {
    const group = groups.find((group) => group._id === groupId);
    return group?.participants?.length || 0;
  };

  const totalExpense = (groupId) => {
    const group = groups.find((group) => group._id === groupId);
    return group?.totalExpense || 0;
  };

  const deleteGroup = async (groupId) => {
    try {
      await axios.delete(
        `https://money-splitter-backend.onrender.com/api/groups/${groupId}`
      );
      setGroups((prevGroups) =>
      prevGroups.filter((group) => group._id.toString() !== groupId.toString())

      );
      setModalVisible(false);
      Alert.alert("Success", "Group deleted successfully");
    } catch (error) {
      console.error("Error deleting group:", error);
      Alert.alert("Error", "Failed to delete group.");
    }
  };

  const handleLongPress = (group) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedGroup) {
      deleteGroup(selectedGroup._id);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item._id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Avatar.Image
              size={40}
              source={require("@/assets/images/userProfile.png")}
              style={styles.avatar}
            />
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.groupTitle}>My Groups</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No groups found.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupContainer}
            onPress={() =>
              navigation.navigate("GroupDetail", {
                groupDetails: item,
              })
            }
            onLongPress={() => handleLongPress(item)}
          >
            <Avatar.Image
              size={60}
              source={require("@/assets/images/groupImage.png")}
              style={styles.groupAvatar}
            />
            <View style={styles.groupDetails}>
              <Text style={styles.groupName}>{item.groupName}</Text>
              <Text style={styles.groupMembers}>
                Total Participants: {totalMembers(item._id)}
              </Text>
              <Text style={styles.groupExpenses}>
                Total Expenses: ₹{totalExpense(item._id)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Delete Confirmation */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Group</Text>
          <Text style={styles.modalText}>
            Are you sure you want to delete "{selectedGroup?.groupName}"?
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[styles.modalButton, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirmDelete}
              style={[styles.modalButton, styles.deleteButton]}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  avatar: {
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  groupContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  groupAvatar: {
    marginRight: 16,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  groupMembers: {
    fontSize: 16,
  },
  groupExpenses: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DashboardScreen;
