import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Text, Card, Button } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUsername(user.email);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://192.168.149.155:5000/api/groups/show-groups"
      );
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };

  const totalMembers = (groupId) => {
    const group = groups.find((group) => group._id === groupId);
    return group ? group.participants.length : 0;
  };

  const totalExpense = (groupId) => {
    const group = groups.find((group) => group._id === groupId);
    return group ? group.totalExpense : 0;
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Avatar.Icon size={40} icon="account" style={styles.avatar} />
          <Text style={styles.username}>{username}</Text>
        </View>

        <Text style={styles.group}>My Groups</Text>

        {groups.map((group) => (
                   <TouchableOpacity
            key={group._id}
            style={styles.groupContainer}
            onPress={() => navigation.navigate("GroupDetail", { groupDetails: groups.find((g) => g._id === group._id) })}
          >
            <Avatar.Image
              size={60}
              source={{ uri: "https://via.placeholder.com/50" }}
              style={styles.groupAvatar}
            />

            <View style={styles.groupDetails}>
              <Text style={styles.groupName}>{group.groupName}</Text>
              <Text style={styles.groupMembers}>
                Total Participants : {totalMembers(group._id)}
              </Text>
              <Text style={styles.groupExpenses}>
                Total Expenses: ₹{totalExpense(group._id)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  group: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  groupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  groupAvatar: {
    marginBottom: 30,
  },
  groupDetails: {
    alignItems: "flex-start",
    marginBottom: 10,
    flex: 1,
    marginLeft: 30,
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
});

export default DashboardScreen;
