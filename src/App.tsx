import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import type { TaskItemProps } from "./TaskItem";

const TASK_LIST = "taskList";
const TASKS = "tasks";
const COMPLETED_TASKS = "completedTasks";

type Section = typeof TASK_LIST | typeof TASKS | typeof COMPLETED_TASKS;
type OpenSectionState = Record<Section, boolean>;

const App = () => {
  const [openSection, setOpenSection] = useState<OpenSectionState>({
    taskList: true,
    tasks: true,
    completedTasks: false,
  });
  const [tasks, setTasks] = useState<TaskItemProps[]>([]);

  const toggleOpenSection = (section: Section) => {
    setOpenSection(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const addTask = (task: TaskItemProps) => {
    setTasks([...tasks, { ...task }])
  }

  const activeTask = tasks.filter(task => !task.completed);
  const completedTask = tasks.filter(task => task.completed);

  return (
    <div className="app">
      <div className="task-container">

        <h1>Task List</h1>

        <button
          className={`close-button ${openSection.taskList ? "open" : ""}`}
          onClick={() => toggleOpenSection(TASK_LIST)}>
          +
        </button>

        {openSection.taskList && <TaskForm addTask={addTask} />}

      </div>
      <div className="task-container">
        <h2>Tasks</h2>

        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleOpenSection(TASKS)}>
          +
        </button>

        <div className="sort-controls">
          <button className="sort-button">
            By Date
          </button>
          <button className="sort-button">
            By Priority
          </button>
        </div>

        {openSection.tasks && <TaskList tasks={activeTask} />}
      </div>
      <div className="completed-task-container">
        <h2>Completed Tasks</h2>

        <button
          className={`close-button ${openSection.completedTasks ? "open" : ""}`}
          onClick={() => toggleOpenSection(COMPLETED_TASKS)}>
          +
        </button>

        {openSection.completedTasks && <TaskList tasks={completedTask} />}
      </div>

      <footer className="footer">
        <p>
          Technologies and React concepts used: React, JSX, props, useState, component composition,
          conditional rendering, array methods (map, filter), event handling.
        </p>
      </footer>
    </div>
  );
}

export default App;
