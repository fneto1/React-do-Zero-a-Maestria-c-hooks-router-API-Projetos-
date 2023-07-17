import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./TaskForm.module.css";

//interfaces
import { ITask } from "../interfaces/Task";

//o que recebo de app.tsx
type Props = {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>; // a ? torna o envio opcional
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number): void;
};

//função comoponente de form
const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleUpdate) {
      handleUpdate(id, title, difficulty);
    } else {
      const id = Math.floor(Math.random() * 1000);

      const newTask: ITask = { id, title, difficulty };

      setTaskList!([...taskList, newTask]); //a ! garante que a função será executada

      setTitle("");
      setDifficulty(0);
    }
  };

  /*   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else {
      setDifficulty(parseInt(e.target.value));
    }
  }; */

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Tarefa: </label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
            //console.log(title);
          }}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade: </label>
        <input
          type="text"
          name="difficulty"
          placeholder="Dificuldade da tarefa"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDifficulty(parseInt(e.target.value));
            //console.log(difficulty);
          }}
          value={difficulty}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;
