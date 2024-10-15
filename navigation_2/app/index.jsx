import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TaskListScreen from "./TaskListScreen";
import TaskDetailScreen from "./TaskDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: "Liste des Tâches" }} />
        <Stack.Screen name="TaskDetails" component={TaskDetailScreen} options={{ title: "Détails de la Tâche" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
