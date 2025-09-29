
export const LOW_PRIORITY = "low";
export const MEDIUM_PRIORITY = "medium";
export const HIGH_PRIORITY = "high";

export type TaskItemProps = {
  id: number;
  title: string;
  priority: typeof LOW_PRIORITY | typeof MEDIUM_PRIORITY | typeof HIGH_PRIORITY;
  deadline: string;
  completed: boolean;
}

type TaskItemComponentProps = {
  task: TaskItemProps;
  isOverdue: boolean;
  deleteTask: (id: TaskItemProps["id"]) => void;
  completeTask?: ((id: TaskItemProps["id"]) => void) | undefined;
};

const TaskItem: React.FC<TaskItemComponentProps> = ({ task, isOverdue, deleteTask, completeTask }) => {
  const { title, priority, deadline, completed } = task;

  return (
    <li className={`task-item ${priority} ${isOverdue && !completed ? "overdue" : ""}`}>
      <div className="task-info">
        <div>{title}: <strong>{priority}</strong></div>
        <div className="task-deadline">
          Due: {new Date(deadline).toLocaleDateString()}
        </div>
      </div>

      <div className="task-buttons">
        {(!completed && completeTask) && (
          <button className="complete-button" onClick={() => completeTask(task.id)}>Complete</button>
        )}
        <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </li>
  )
}

export default TaskItem;
