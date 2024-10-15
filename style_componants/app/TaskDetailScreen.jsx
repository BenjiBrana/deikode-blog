import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TaskDetailScreen({ route }) {
  const { taskId } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la Tâche</Text>
      <Text style={styles.subtitle}>ID de la Tâche : {taskId}</Text>
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
  subtitle: {
    fontSize: 18,
    color: 'black',
  },
});
