import { Circle, CheckCircle, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';

export interface TaskProps {
  task: string;
  id: string;
  isCompleted: boolean;
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (taskId: string, isTaskCompleted: boolean) => void;
}

export function Task({ task, id, onDeleteTask, onCompleteTask }: TaskProps) {
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  function handleCompleteTask() {
    setIsTaskCompleted(!isTaskCompleted)
    onCompleteTask(id, !isTaskCompleted);
  }

  return(
    <li>
      {isTaskCompleted ? (
        <CheckCircle 
          className={styles.check} 
          weight="fill"
          size={32}
          onClick={handleCompleteTask}
        />
      ) : (
        <Circle 
          className={styles.circle} 
          size={32}
          onClick={handleCompleteTask}
        />
      )}
      <span className={isTaskCompleted ? styles.completed : ''}>{task}</span>
        <Trash 
          className={styles.trash} 
          size={32}
          onClick={handleDeleteTask}
        />
    </li>
  )
}