import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function TaskListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste de tâches</Text>
      <Button
        title="Voir les Détails de la Tâche"
        onPress={() => navigation.navigate("TaskDetails", { taskId: 1 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
});
