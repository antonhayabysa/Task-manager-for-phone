import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList } from "react-native";
import Todo from "./src/todo/Todo";
import styles from "./styles";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        return response.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => console.error("Ошибка: ", error.message));
  }, []);

  const addTodo = () => {
    const newTodo = {
      title: input,
      completed: false,
      id: Date.now(),
      selected: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id && !todo.completed ? { ...todo, completed: true } : todo
      )
    );
  };

  const toggleSelect = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const completeSelected = () => {
    setTodos(
      todos.map((todo) => {
        if (!todo.completed) {
          return { ...todo, completed: true, selected: false };
        }
        return todo;
      })
    );
  };

  const undoSelected = () => {
    setTodos(
      todos.map((todo) => {
        if (todo.completed) {
          return { ...todo, completed: false, selected: false };
        }
        return todo;
      })
    );
  };

  const filteredTodos =
    search.length >= 3
      ? todos.filter((todo) => todo.title.includes(search))
      : todos;

  return (
    <View style={styles.appContainer}>
      <View style={styles.leftColumn}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Add TODO"
          />
          <Button title="Add" onPress={addTodo} />
        </View>
        <FlatList
          data={filteredTodos.filter((todo) => !todo.completed)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Todo
              title={item.title}
              completed={item.completed}
              selected={item.selected}
              toggleComplete={() => toggleComplete(item.id)}
              toggleSelect={() => toggleSelect(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
        <Button title="COMPLETE" onPress={completeSelected} />
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
          />
        </View>
        <FlatList
          data={filteredTodos.filter((todo) => todo.completed)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Todo
              title={item.title}
              completed={item.completed}
              selected={item.selected}
              toggleComplete={() => toggleComplete(item.id)}
              toggleSelect={() => toggleSelect(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
        <Button title="UNDO" onPress={undoSelected} />
      </View>
    </View>
  );
};

export default App;
