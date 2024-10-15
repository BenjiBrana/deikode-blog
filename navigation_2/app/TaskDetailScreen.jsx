import React from "react";
import { View, Text } from "react-native";
export default function TaskDetailScreen({ route }) {
  const { taskId } = route.params;
  return (
    <View>
      {" "}
      <Text>Détails de la tâche : {taskId}</Text>{" "}
    </View>
  );
}
