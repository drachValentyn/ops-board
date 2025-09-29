import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import type { TaskItemProps } from "./TaskItem";

const TASK_LIST = "taskList";
const TASKS = "tasks";
const COMPLETED_TASKS = "completedTasks";

type Section = typeof TASK_LIST | typeof TASKS | typeof COMPLETED_TASKS;
type OpenSectionState = Record<Section, boolean>;

type SortType = "date" | "priority";
type SortOrder = "asc" | "desc";

const App = () => {
  const [openSection, setOpenSection] = useState<OpenSectionState>({
    taskList: true,
    tasks: true,
    completedTasks: false,
  });
  const [tasks, setTasks] = useState<TaskItemProps[]>([]);
  const [sortType, setSortType] = useState<SortType>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000)

    return () => clearInterval(timer);
  }, [])

  const toggleOpenSection = (section: Section): void => {
    setOpenSection(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const addTask = (task: TaskItemProps): void => {
    setTasks([...tasks, { ...task }])
  }

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const completeTask = (id: number): void => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task));
  }

  const sortTasks = (tasks: TaskItemProps[]): TaskItemProps[] => {
    const priorityOrder: Record<NonNullable<TaskItemProps['priority']>, number> = {
      high: 3,
      medium: 2,
      low: 1,
    };

    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const aPriority = priorityOrder[a.priority ?? "low"];
        const bPriority = priorityOrder[b.priority ?? "low"];

        return sortOrder === "asc" ? aPriority - bPriority : bPriority - aPriority;
      } else {
        const aDate = a.deadline ? new Date(a.deadline).getTime() : 0;
        const bDate = b.deadline ? new Date(b.deadline).getTime() : 0;

        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }
    });
  }

  const toggleSortOrder = (type: SortType): void => {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  const activeTask = sortTasks(tasks.filter(task => !task.completed));
  const completedTask = sortTasks(tasks.filter(task => task.completed));

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
          <button
            className={`sort-button ${sortType === "date" ? "active" : ""}`}
            onClick={() => toggleSortOrder("date")}>
            By Date {sortType === "date" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            className={`sort-button ${sortType === "priority" ? "active" : ""}`}
            onClick={() => toggleSortOrder("priority")}>
            By Priority {sortType === "priority" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>

        {openSection.tasks &&
          <TaskList
            tasks={activeTask}
            currentTime={currentTime}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        }
      </div>

      <div className="completed-task-container">
        <h2>Completed Tasks</h2>

        <button
          className={`close-button ${(openSection.completedTasks || completedTask.length > 0) ? "open" : ""}`}
          onClick={() => toggleOpenSection(COMPLETED_TASKS)}>
          +
        </button>

        {(openSection.completedTasks || completedTask.length > 0) &&
          <TaskList
            deleteTask={deleteTask}
            tasks={completedTask}
          />
        }
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
