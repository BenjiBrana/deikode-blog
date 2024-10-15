import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import des icônes

export default function TaskList({ tasks, deleteTask, showTaskDetails, editTask, toggleTaskCompletion }) {
  return (
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
                    <TouchableOpacity onPress={() => toggleTaskCompletion(index)}>
                    <MaterialIcons
                        name={item.completed ? "check-circle" : "radio-button-unchecked"}
                        size={24}
                        color={item.completed ? "green" : "gray"}
                        />
                    </TouchableOpacity>
                    {/* Icône pour modifier */}
                    <TouchableOpacity onPress={() => editTask(index)}>
                    <MaterialIcons name="edit" size={24} color="blue" />
                    </TouchableOpacity>
                    {/* Icône pour supprimer */}
                    <TouchableOpacity onPress={() => deleteTask(index)}>
                    <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      )}
    />
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
  containBloc:{
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
});
