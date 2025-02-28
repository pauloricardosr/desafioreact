import { useState } from 'react';
import './App.css';

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(
    [
      { text: "Estudar de noite", completed: false },
      { text: "Tirar o lixo", completed: false }
    ]
  );
  
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  });

  function handleRegister() {
    if (!input) {
      alert("Preencha o nome da sua tarefa!");
      return;
    }

    if (editTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks(tarefas => [...tarefas, { text: input, completed: false }]);
    setInput("");
  }

  function handleDelete(itemText) {
    const removeTask = tasks.filter(task => task.text !== itemText);
    setTasks(removeTask);
  }

  function handleSaveEdit() {
    const allTasks = tasks.map(task => 
      task.text === editTask.task ? { ...task, text: input } : task
    );
    setTasks(allTasks);
    setEditTask({ enabled: false, task: '' });
    setInput("");
  }

  function handleEdit(itemText) {
    setInput(itemText);
    setEditTask({ enabled: true, task: itemText });
  }

  function toggleTaskCompletion(itemText) {
    setTasks(tasks.map(task => 
      task.text === itemText ? { ...task, completed: !task.completed } : task
    ));
  }

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <input
        placeholder="Digite o nome da tarefa..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleRegister}>
        {editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}
      </button>

      <hr />

      {tasks.map((item) => (
        <section key={item.text}>
          <span 
            onClick={() => toggleTaskCompletion(item.text)}
            style={{ textDecoration: item.completed ? "line-through" : "none", cursor: "pointer" }}
          >
            {item.text}
          </span>
          <button className='button' onClick={() => handleEdit(item.text)}>Editar</button>
          <button className='button' onClick={() => handleDelete(item.text)}>Excluir</button>
        </section>
      ))}
    </div>
  );
}
