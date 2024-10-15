import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./WelcomeScreen";
import TaskListScreen from "./TaskListScreen";
import TaskDetailScreen from "./TaskDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: "Accueil" }} />
      <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: "Liste des Tâches" }} />
      <Stack.Screen name="TaskDetails" component={TaskDetailScreen} options={{ title: "Détails de la Tâche" }} />
    </Stack.Navigator>
  );
}
