import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotesApp() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  // Charger les notes depuis AsyncStorage au démarrage
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes !== null) {
          setNotes(JSON.parse(storedNotes)); // Charger les notes en les parsant
        }
      } catch (error) {
        console.error('Erreur lors du chargement des notes', error);
      }
    };
    loadNotes();
  }, []);

  // Fonction pour sauvegarder une nouvelle note
  const saveNote = async () => {
    if (note.trim().length === 0) {
      Alert.alert('Erreur', 'La note ne peut pas être vide.');
      return;
    }
    const newNotes = [...notes, { id: Date.now().toString(), content: note }]; // Ajouter une note avec un id unique
    setNotes(newNotes);
    setNote(''); // Réinitialiser le champ de saisie
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes)); // Sauvegarder les notes dans AsyncStorage
      Alert.alert('Succès', 'Note enregistrée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des notes', error);
    }
  };

  // Fonction pour supprimer une note
  const deleteNote = async (id) => {
    const filteredNotes = notes.filter((item) => item.id !== id);
    setNotes(filteredNotes);
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes)); // Mettre à jour AsyncStorage
      Alert.alert('Succès', 'Note supprimée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression de la note', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Tapez votre note"
      />
      <Button title="Sauvegarder la note" onPress={saveNote} />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.content}</Text>
            <Button title="Supprimer" onPress={() => deleteNote(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  noteItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteText: {
    fontSize: 16,
    color: 'black',
  },
});
