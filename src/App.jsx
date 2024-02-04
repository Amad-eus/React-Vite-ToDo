import { useState } from "react";
import './App.css'
import Todo from "./components/Todo"
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

function App() {
  const [ToDos, setToDos] = useState([
    { id: 1,
      text: "Criar funcionalidade X no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    { id: 2,
      text: "Ir para a academia", 
      category: "Pessoal", 
      isCompleted: false },
    { id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort]     = useState("Asc");

  const addTodo = (text, category) => {
    const newTodos = [...ToDos,{
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    },];

    setToDos(newTodos);
  }

  const removeTodo = (id) => {
    const newTodos = [...ToDos]
    const filteredTodos = newTodos.filter(todo => todo.id !== id ? todo : null);
    setToDos(filteredTodos)
  }

  const completeTodo = (id) => {
    const newTodos = [...ToDos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo);
    setToDos(newTodos);
  }

  return <div className="app">
    <h1>Lista de Tarefas</h1>
    <Search search={search} setSearch={setSearch}/>
    <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
    <div className="todo-list">
      {ToDos
      .filter((todo) => 
        filter === "All" 
          ? true 
          : filter === "Completed" 
          ? todo.isCompleted 
          : !todo.isCompleted
      )
      .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
      .sort((a,b) => sort === "AtoZ" ? a.text.localeCompare(b.text): b.text.localeCompare(a.text))
      .map((todo) => (
        <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo}/>
      ))}
    </div>
    <TodoForm addTodo={addTodo}/>
  </div>;
}

export default App
