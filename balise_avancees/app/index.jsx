import React, { useState } from "react";
import {
  FlatList,
  SectionList,
  Modal,
  View,
  Text,
  Platform,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const animateOpacity = () => {
    opacity.value = withTiming(opacity.value === 1 ? 0 : 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* FlatList */}
      <Text style={styles.title}>FlatList</Text>
      <FlatList
        data={[{ key: "Item 1" }, { key: "Item 2" }]}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />

      {/* SectionList */}
      <Text style={styles.title}>SectionList</Text>
      <SectionList
        sections={[
          { title: "Section 1", data: ["Item A", "Item B"] },
          { title: "Section 2", data: ["Item C", "Item D"] },
        ]}
        renderItem={({ item }) => <Text>{item}</Text>}
        renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal */}
      <Button title="Ouvrir Modal" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalView}>
          <Text>Contenu Modal</Text>
          <Button title="Fermer" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {/* TouchableOpacity */}
      <TouchableOpacity onPress={() => alert("Bouton cliqué !")} style={styles.touchable}>
        <Text style={styles.touchableText}>Bouton TouchableOpacity</Text>
      </TouchableOpacity>

      {/* ActivityIndicator */}
      <ActivityIndicator size="large" color="#00ff00" />

      {/* Animated */}
      <Animated.View style={[styles.animatedBox, animatedStyle]}>
        <Text>Animation Opacité</Text>
      </Animated.View>
      <Button title="Animer" onPress={animateOpacity} />

      {/* TextInput */}
      <TextInput
        style={styles.input}
        placeholder="Tapez ici"
        value={text}
        onChangeText={setText}
      />

      {/* TouchableHighlight */}
      <TouchableHighlight onPress={() => alert("Cliqué")} underlayColor="lightgray">
        <Text style={styles.highlight}>Bouton TouchableHighlight</Text>
      </TouchableHighlight>

      {/* KeyboardAvoidingView */}
      <KeyboardAvoidingView behavior="padding">
        <TextInput style={styles.input} placeholder="Saisir ici (KeyboardAvoiding)" />
      </KeyboardAvoidingView>
      {/* WebView */}
      { 
      Platform.OS === 'web' ? (
      <Text>WebView n'est pas supporté sur cette plateforme</Text> ) : (
            <WebView
              source={{ uri: "https://branabenjamin.fr" }}
              style={{ height: 200, marginVertical: 20 }}
            />
          )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  touchable: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginVertical: 10,
  },
  touchableText: {
    textAlign: "center",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
  },
  animatedBox: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    marginVertical: 10,
  },
  highlight: {
    textAlign: "center",
    padding: 10,
  },
});
