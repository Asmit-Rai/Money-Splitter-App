import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Avatar, List, Divider, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";

const GroupDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { groupDetails } = route.params;
  const [expenses, setExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(
        `https://money-splitter-backend.onrender.com/api/users/${userId}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`User with ID ${userId} not found`);
          return "Unknown";
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const user = await response.json();
      return user.email;
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "Unknown";
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `https://money-splitter-backend.onrender.com/api/expenses/show-data`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const groupExpenses = data.expenses.filter(
        (expense) => String(expense.group) === String(groupDetails._id)
      );

      const expensesWithPayerNames = await Promise.all(
        groupExpenses.map(async (expense) => {
          const payerName = await fetchUserName(expense.payer);
          return { ...expense, payerName };
        })
      );

      setExpenses(expensesWithPayerNames);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    if (groupDetails) {
      fetchExpenses();
    }
  }, [groupDetails]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchExpenses().then(() => setRefreshing(false));
  };

  const handleLongPress = (expense) => {
    setSelectedExpense(expense);
    setModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedExpense) {
      try {
        const response = await fetch(
          `https://money-splitter-backend.onrender.com/api/expenses/${selectedExpense._id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete expense");
        }
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== selectedExpense._id)
        );
        setModalVisible(false);
        Alert.alert("Success", "Expense deleted successfully");
      } catch (error) {
        console.error("Error deleting expense:", error);
        Alert.alert("Error", "Failed to delete expense");
      }
    }
  };

  const handlePress = (expense) => {
    navigation.navigate("GroupExpenseSummaryScreen", {
      expense: expense,
      groupName: groupDetails.groupName,
      participants: groupDetails.participants,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Card style={styles.groupCard}>
        <View style={styles.groupHeader}>
          <Image
            source={{
              uri: groupDetails.groupImage || "https://via.placeholder.com/150",
            }}
            style={styles.groupImage}
          />
          <View style={styles.groupHeaderText}>
            <Text style={styles.groupName}>{groupDetails.groupName}</Text>
          </View>
        </View>
        <Button
          mode="contained"
          style={styles.scanButton}
          onPress={() =>
            navigation.navigate("QRScanner", {
              participants: groupDetails.participants,
              currentGroupId: groupDetails._id,
            })
          }
        >
          Pay
        </Button>
      </Card>

      <List.Section>
        {expenses.length > 0 ? (
          expenses.map((expense) => {
            const expenseDate = new Date(
              expense.createdAt
            ).toLocaleDateString();

            return (
              <React.Fragment key={expense._id}>
                <TouchableOpacity
                  onPress={() => handlePress(expense)}
                  onLongPress={() => handleLongPress(expense)}
                  activeOpacity={0.7}
                >
                  <List.Item
                    title={expense.expenseName}
                    description={
                      <View>
                        <Text>Paid by: {expense.payerName}</Text>
                        <Text style={styles.expenseDate}>
                          Date: {new Date(expense.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                    }
                    left={(props) => (
                      <Avatar.Icon {...props} icon="currency-usd" />
                    )}
                    right={(props) => (
                      <Text {...props} style={styles.amount}>
                        ₹{expense.amount}
                      </Text>
                    )}
                  />
                </TouchableOpacity>
                <Divider />
              </React.Fragment>
            );
          })
        ) : (
          <Text style={styles.noExpensesText}>
            No expenses found for this group.
          </Text>
        )}
      </List.Section>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Expense</Text>
          <Text style={styles.modalText}>
            Are you sure you want to delete "{selectedExpense?.expenseName}"?
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  groupCard: {
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
  groupImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  groupHeaderText: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  groupName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  scanButton: {
    marginTop: 10,
    width: "100%",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noExpensesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  expenseDate: {
    color: "#888",
    fontSize: 14,
    marginTop: 4,
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

export default GroupDetailScreen;