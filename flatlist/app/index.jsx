import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const data = [
  { id: "1", title: "Tâche 1" },
  { id: "2", title: "Tâche 2" },
  { id: "3", title: "Tâche 3" },
  { id: "4", title: "Tâche 4" },
  { id: "5", title: "Tâche 5" },
];

export default function TaskList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
