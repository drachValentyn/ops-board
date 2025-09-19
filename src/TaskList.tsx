import TaskItem, { TaskItemProps } from './TaskItem';

type TaskListProps = {
  tasks: TaskItemProps[];
  deleteTask: (id: TaskItemProps["id"]) => void;
  completeTask?: (id: TaskItemProps["id"]) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, completeTask }) => {
  if (tasks.length === 0) return <p>No tasks</p>;

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      ))}
    </ul>
  )
}

export default TaskList;
