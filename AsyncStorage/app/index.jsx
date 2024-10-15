import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');

  useEffect(() => {
    loadNote(); // Charger la note stockée au démarrage
  }, []);

  // Fonction pour sauvegarder la note dans AsyncStorage
  const saveNote = async () => {
    try {
      await AsyncStorage.setItem('note', note);
      setSavedNote(note); // Met à jour la note affichée
      alert('Note enregistrée !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la note', error);
    }
  };

  // Fonction pour charger la note depuis AsyncStorage
  const loadNote = async () => {
    try {
      const loadedNote = await AsyncStorage.getItem('note');
      if (loadedNote !== null) {
        setSavedNote(loadedNote);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la note', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Écris ta note ici..."
      />
      <Button title="Enregistrer la note" onPress={saveNote} />
      <Text style={styles.savedNote}>Note enregistrée : {savedNote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  savedNote: {
    marginTop: 20,
    fontSize: 16,
  },
});
