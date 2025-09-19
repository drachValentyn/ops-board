import TaskItem, { TaskItemProps } from './TaskItem';

type TaskListProps = {
  tasks: TaskItemProps[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}

export default TaskList;
