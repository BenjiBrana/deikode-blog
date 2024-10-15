import React from "react";
import { Button, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Écran d'accueil
function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Écran d'accueil</Text>
            <Button title="Aller aux Détails" onPress={() => navigation.navigate('Details')} />
        </View>
    );
}

// Écran de détails
function DetailsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Détails de l'écran</Text>
        </View>
    );
}

const Stack = createStackNavigator();

// Application principale avec navigation
export default function App() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}
