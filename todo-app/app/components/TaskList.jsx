import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import des icônes

export default function TaskList({ tasks, deleteTask, showTaskDetails, editTask, toggleTaskCompletion }) {
  const [modalVisible, setModalVisible] = useState(false);  // Gérer la visibilité du modal
  const [taskIndexToDelete, setTaskIndexToDelete] = useState(null);  // Gérer l'index de la tâche à supprimer

  // Fonction pour afficher le modal et stocker l'index de la tâche à supprimer
  const confirmDeleteTask = (index) => {
    console.log("Tentative de suppression de la tâche à l'index :", index);  // Log l'index de la tâche
    setTaskIndexToDelete(index);
    setModalVisible(true);
  };

  // Fonction pour confirmer la suppression
  const handleDeleteTask = () => {
    if (taskIndexToDelete !== null) {
      console.log("Suppression de la tâche à l'index :", taskIndexToDelete);  // Log l'index de la tâche supprimée
      deleteTask(taskIndexToDelete);
      setModalVisible(false);
      setTaskIndexToDelete(null);  // Réinitialiser après la suppression
    }
  };

  return (
    <View>
      {/* Modal pour confirmer la suppression */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => setModalVisible(false)}  // Fermer le modal lorsqu'on appuie en dehors
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Es-tu sûr de vouloir supprimer cette tâche ?</Text>
            <View style={styles.modalButtons}>
              {/* Bouton Annuler */}
              <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </Pressable>
              <View style={styles.gap}></View> 
              {/* Ajoute un espacement entre les boutons */}
              {/* Bouton Confirmer */}
              <Pressable onPress={handleDeleteTask} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirmer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.task}>
            <Text
              onPress={() => showTaskDetails(item)}
              style={item.completed ? styles.completedTask : styles.normalTask}
            >
              {item.title}
            </Text>
            <View style={styles.containBloc}>
              <Text style={styles.category}>Catégorie: {item.category}</Text>
              <View style={styles.icons}>
                {/* Icône pour marquer comme fait/non fait */}
                <Pressable onPress={() => toggleTaskCompletion(index)}>
                  <MaterialIcons
                    name={item.completed ? "check-circle" : "radio-button-unchecked"}
                    size={24}
                    color={item.completed ? "green" : "gray"}
                  />
                </Pressable>
                {/* Icône pour modifier */}
                <Pressable onPress={() => editTask(index)}>
                  <MaterialIcons name="edit" size={24} color="blue" />
                </Pressable>
                {/* Icône pour suppression avec confirmation */}
                <Pressable onPress={() => confirmDeleteTask(index)}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: 'column',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  normalTask: {
    fontSize: 18,
    textDecorationLine: 'none',
    textAlign: 'center',
  },
  completedTask: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    textAlign: 'center',
  },
  category: {
    fontStyle: 'italic',
  },
  containBloc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100, // Ajustement de la taille pour mieux agencer les icônes
    marginTop: 10,
  },
  // Styles pour le modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent pour fond du modal
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    alignItems: 'center',
  },
  gap: {
    width: 20,  // Espace entre les deux boutons
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
