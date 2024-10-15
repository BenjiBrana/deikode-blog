import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import * as Notifications from 'expo-notifications';

// Demander les permissions de notification
async function requestPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission de notification non accordée');
    }
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

// Fonction pour planifier les notifications
async function scheduleDailyNotifications(tasks) {
  const taskTitles = tasks.map(task => task.title).join(', ');

  // Notification pour 7h du matin
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Tâches du matin",
      body: `Voici les tâches à faire : ${taskTitles}`,
    },
    trigger: {
      hour: 7,
      minute: 0,
      repeats: true,
    },
  });

  // Notification pour 13h30 de l'après-midi
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Tâches de l'après-midi",
      body: `Voici les tâches à faire : ${taskTitles}`,
    },
    trigger: {
      hour: 13,
      minute: 30,
      repeats: true,
    },
  });
  // Notification pour 17h00 de l'après-midi
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Tâches de la soirée",
      body: `Voici les tâches à faire : ${taskTitles}`,
    },
    trigger: {
      hour: 17,
      minute: 0,
      repeats: true,
    },
  });
}

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
    requestPermissions();  // Demander les permissions de notification
  }, []);

  useEffect(() => {
    // Planifier les notifications avec la liste des tâches
    scheduleDailyNotifications(tasks);
  }, [tasks]);

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
});
