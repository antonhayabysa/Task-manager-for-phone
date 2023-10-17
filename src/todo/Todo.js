import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Todo = ({ title, completed, selected, toggleComplete, toggleSelect }) => {
  return (
    <TouchableOpacity onPress={toggleSelect} style={styles.todoItem}>
      <Text style={completed ? styles.completedText : styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: "none",
  },
  completedText: {
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: "line-through",
  },
});

export default Todo;
