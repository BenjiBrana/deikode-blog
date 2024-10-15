import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
export default function TaskApp() {
  // useState pour gérer les tâches et l'état de chargement
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionCount, setActionCount] = useState(0);
  // Compteur d'actions // useEffect pour récupérer les données de l'API lors du montage
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setTasks(data.slice(0, 5));
        // Récupérer 5 tâches
        setLoading(false);
      } catch (error) {
        console.error("Erreur de récupération des tâches", error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  // Fonction pour ajouter une tâche fictive
  const addTask = () => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: `Nouvelle tâche ${tasks.length + 1}` },
    ]);
    setActionCount(actionCount + 1);
    // Incrémenter le compteur d'actions
  };
  // Affichage pendant le chargement
  if (loading) {
    return;
    <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des tâches</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
      <Button title="Ajouter une tâche" onPress={addTask} />
      <Text style={styles.counter}>Actions effectuées : {actionCount}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  taskItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  counter: { marginTop: 20, fontSize: 18, textAlign: "center" },
});
