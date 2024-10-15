import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Import des icônes

export default function TaskForm({ addTask, editMode, taskToEdit }) {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Travail'); // Par défaut

  useEffect(() => {
    if (editMode && taskToEdit) {
      setTask(taskToEdit.title);
      setCategory(taskToEdit.category);
    } else {
      setTask('');
      setCategory('Travail');
    }
  }, [editMode, taskToEdit]);

  const handleAddTask = () => {
    if (task.trim()) {
      addTask({ title: task, category, completed: false });
      setTask('');
      setCategory('Travail');
    }
  };

  return (
    <View>
      {/* Input pour la tâche */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={editMode ? "Modifier la tâche" : "Nouvelle tâche"}
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.iconButton}>
          <MaterialIcons name="check" size={30} color="green" />
        </TouchableOpacity>
      </View>

      {/* Sélection de la catégorie */}
      <View style={styles.categoryIcons}>
        {/* Icône pour la catégorie "Travail" */}
        <TouchableOpacity onPress={() => setCategory('Travail')} style={styles.iconWrapper}>
          <MaterialIcons name="work" size={30} color={category === 'Travail' ? 'blue' : 'gray'} />
        </TouchableOpacity>
        {/* Icône pour la catégorie "Personnel" */}
        <TouchableOpacity onPress={() => setCategory('Personnel')} style={styles.iconWrapper}>
          <FontAwesome name="user" size={30} color={category === 'Personnel' ? 'blue' : 'gray'} />
        </TouchableOpacity>
        {/* Icône pour la catégorie "Études" */}
        <TouchableOpacity onPress={() => setCategory('Étude')} style={styles.iconWrapper}>
          <MaterialIcons name="school" size={30} color={category === 'Étude' ? 'blue' : 'gray'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
