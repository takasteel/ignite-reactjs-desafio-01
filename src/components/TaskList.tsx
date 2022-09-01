import styles from './TaskList.module.css';
import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import imgClipboard from '../assets/Clipboard.svg';
import { Task, TaskProps } from './Task';


interface Task extends TaskProps {
  isCompleted: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState([] as Task[])
  const [taskContent, setTaskContent] = useState('')
  const [completedTasks, setCompletedTasks] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()
    setTasks([{
      id: uuidv4(),
      task: taskContent,
      isCompleted: false,
      onDeleteTask,
      onCompleteTask,
    }, ...tasks])
    setTaskContent('')
  }

  function handleChangeNewTask(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setTaskContent(event.target.value)
  }

  function onCompleteTask(taskId: string, isTaskCompleted: boolean) {
    const tasksCopy = tasks;
    const completedTaskIndex = tasksCopy.findIndex(task => {
      return task.id === taskId
    })
    tasksCopy[completedTaskIndex].isCompleted = isTaskCompleted;
    setCompletedTasks(tasksCopy.filter(task => {
      return task.isCompleted !== false
    }).length)
    setTasks(tasksCopy.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))) 
    console.log(tasks)
  }

  function onDeleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskId
    })
    setTasks(tasksWithoutDeletedOne)

    if (tasksWithoutDeletedOne.filter(task => {
      return task.isCompleted !== false
    }).length !== completedTasks) {
      setCompletedTasks((prevState) => prevState - 1)
    }
  }

  function handleInvalidTask(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  const isTaskEmpty = taskContent.length === 0;

  return(
    <main className={styles.container}>
      <form onSubmit={handleCreateNewTask}>
        <textarea 
          value={taskContent}
          placeholder='Adicione uma nova tarefa' 
          onChange={handleChangeNewTask}
          onInvalid={handleInvalidTask}
          required
        />
        <button disabled={isTaskEmpty} type='submit'>
          <span>Criar</span>
          <PlusCircle size={20}/>
        </button>
      </form>
      
      <div className={styles.status}>
        <div className={styles.createdTasks}>
          <span>Tarefas criadas</span>
          <div>
            <span>{tasks.length}</span>
          </div>
        </div>
        <div className={styles.finishedTasks}>
          <span>Concluídas</span>
          <div>
            {tasks.length === 0 ? (
              <span>{tasks.length}</span>
            ) : (
              <span>{completedTasks} de {tasks.length}</span>
            )}
          </div>
        </div>
      </div>
      {tasks.length === 0 ? (
        <div className={styles.emptyList}>
          <img src={imgClipboard} alt="" />
          <p>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      ) : (
        <ul>
          {tasks.map(task => {
            return(
              <Task key={task.id} id={task.id} task={task.task} isCompleted onCompleteTask={onCompleteTask} onDeleteTask={onDeleteTask} />
            )
          })}
        </ul>
      )}

    </main>
  )
}