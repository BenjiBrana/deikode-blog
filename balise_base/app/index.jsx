import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue dans React Native !</Text>
      <Image
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        style={styles.image}
      />
      <Button title="Cliquez ici" onPress={() => alert("Bouton cliqué !")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, marginBottom: 20 },
  image: { width: 50, height: 50, marginBottom: 20 },
});