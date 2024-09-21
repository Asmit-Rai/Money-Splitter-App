import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Text, Card, Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Avatar.Icon size={40} icon="account" style={styles.avatar} />
          <Text style={styles.username}>Username</Text>
        </View>

        {/* Groups Title */}
        <Text style={styles.group}>My Groups</Text>

        {/* Group Container */}
        <TouchableOpacity
          style={styles.groupContainer}
          onPress={() => navigation.navigate('GroupDetail')}
        >
          <Avatar.Image
            size={60}
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.groupAvatar}
          />
          <View style={styles.groupDetails}>
            <Text style={styles.groupName}>Group Name</Text>
            <Text style={styles.groupMembers}>Members: 5</Text>
            <Text style={styles.groupExpenses}>Total Expenses: $200</Text>
          </View>
        </TouchableOpacity>
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
    paddingBottom: 80, // Add padding to avoid content being hidden behind the button
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