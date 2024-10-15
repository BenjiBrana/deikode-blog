import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function TaskListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue dans mon App!</Text>
      <Text style={styles.subtitle}>Liste de tâches</Text>
      <Button
        title="Voir Détails de la Tâche"
        onPress={() => navigation.navigate("TaskDetails", { taskId: 1 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});
