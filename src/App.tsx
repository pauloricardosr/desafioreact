import { useState } from "react";
import { Box, ButtonStyled, SpanStyled } from "./styled";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([
    { text: "Estudar de noite", completed: false },
    { text: "Tirar o lixo", completed: false },
  ]);

  const [editTask, setEditTask] = useState({
    enabled: false,
    task: "",
  });


  const handleRegister = () => {
    if (!input) {
      alert("Preencha o nome da sua tarefa!");
      return;
    }

    if (editTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks((tarefas) => [...tarefas, { text: input, completed: false }]);
    setInput("");
  };

  const handleDelete = (itemText: string) => {
    const removeTask = tasks.filter((task) => task.text !== itemText);
    setTasks(removeTask);
  };

  //TODO: Tornar para arrow function
  function handleSaveEdit() {
    const allTasks = tasks.map((task) =>
      task.text === editTask.task ? { ...task, text: input } : task
    );
    setTasks(allTasks);
    setEditTask({ enabled: false, task: "" });
    setInput("");
  }

  //TODO: Tornar para arrow function
  function handleEdit(itemText: string) {
    setInput(itemText);
    setEditTask({ enabled: true, task: itemText });
    
  }

  //TODO: Tornar para arrow function
  function toggleTaskCompletion(itemText: string) {
    setTasks(
      tasks.map((task) =>
        task.text === itemText ? { ...task, completed: !task.completed } : task
      )
    );
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
        <Box key={item.text}>
          <SpanStyled
            onClick={() => toggleTaskCompletion(item.text)}
            style={{
              textDecoration: item.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {item.text}
          </SpanStyled>
          <ButtonStyled onClick={() => handleEdit(item.text)}>
            Editar
          </ButtonStyled>
          <ButtonStyled exclude={true} onClick={() => handleDelete(item.text)}>
            Excluir
          </ButtonStyled>
        </Box>
      ))}
    </div>
  );
}
