import { useState } from "react"
import { LOW_PRIORITY, MEDIUM_PRIORITY, HIGH_PRIORITY } from "./TaskItem"
import type { TaskItemProps } from "./TaskItem";

type TaskFormProps = {
  addTask: (task: TaskItemProps) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState<typeof LOW_PRIORITY | typeof MEDIUM_PRIORITY | typeof HIGH_PRIORITY>(LOW_PRIORITY);
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() && deadline) {
      addTask({
        id: Date.now(),
        title,
        priority,
        deadline,
        completed: false
      });
    }

    // Clear form
    setTitle("");
    setPriority(LOW_PRIORITY);
    setDeadline("");
  }

  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required />
      <select value={priority} onChange={(e) => setPriority(e.target.value as typeof LOW_PRIORITY | typeof MEDIUM_PRIORITY | typeof HIGH_PRIORITY)}>
        <option value={HIGH_PRIORITY}>High</option>
        <option value={MEDIUM_PRIORITY}>Medium</option>
        <option value={LOW_PRIORITY}>Low</option>
      </select>
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
