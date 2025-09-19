
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
};

const TaskItem: React.FC<TaskItemComponentProps> = ({ task }) => {
  const { title, priority, deadline, completed } = task;

  return (
    <li className={`task-item ${priority}`}>
      <div className="task-info">
        <div>{title}: <strong>{priority}</strong></div>
        <div className="task-deadline">
          Due: {new Date(deadline).toLocaleDateString()}
        </div>
      </div>

      <div className="task-buttons">
        {completed ?
          <button className="complete-button">Complete</button> :
          ""
        }
        <button className="delete-button">Delete</button>
      </div>
    </li>
  )
}

export default TaskItem;
