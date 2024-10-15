import React, { useState, useEffect } from 'react';
import { SafeAreaView, Button, Modal, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [taskIndexToEdit, setTaskIndexToEdit] = useState(null);

  // Charger les tâches depuis AsyncStorage
  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (e) {
      console.error('Erreur lors du chargement des tâches', e);
    }
  };

  // Sauvegarder les tâches dans AsyncStorage
  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Erreur lors de la sauvegarde des tâches', e);
    }
  };

  // Ajouter ou modifier une tâche
  const addTask = (task) => {
    if (editMode) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndexToEdit] = task;
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setEditMode(false);  // Désactiver le mode d'édition
      setTaskIndexToEdit(null);  // Réinitialiser l'index d'édition
    } else {
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  // Supprimer une tâche
  const deleteTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Activer le mode édition et pré-remplir le formulaire
  const editTask = (taskIndex) => {
    setEditMode(true);
    setTaskIndexToEdit(taskIndex);
  };

  // Basculer l'état de complétion d'une tâche
  const toggleTaskCompletion = (taskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Afficher les détails d'une tâche
  const showTaskDetails = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  useEffect(() => {
    loadTasks();  // Charger les tâches au démarrage
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ma liste de tâches</Text>
      <TaskForm addTask={addTask} editMode={editMode} taskToEdit={tasks[taskIndexToEdit]} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        showTaskDetails={showTaskDetails}
        editTask={editTask}
        toggleTaskCompletion={toggleTaskCompletion}
      />

      {selectedTask && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Détails de la tâche :</Text>
            <Text style={styles.modalText}>{selectedTask.title}</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalView: {
    marginTop: '50%',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
  },
});