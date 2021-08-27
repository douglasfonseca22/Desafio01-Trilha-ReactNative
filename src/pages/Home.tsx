import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map(tasks => ({ ...tasks }))

    const foundItem = updateTask.find(item => item.id === id);

    if (!foundItem)
      return;

    foundItem.done = !foundItem.done;
    setTasks(updateTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'

      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updateTask = tasks.filter(task => task.id !== id);
          setTasks(updateTask);
        }
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updateTask = tasks.map(task => ({ ...task }))

    const taskTobeUpdate = updateTask.find(task => task.id === taskId);

    if (!taskTobeUpdate)
      return;

    taskTobeUpdate.title = taskNewTitle;
    setTasks(updateTask);
  }
  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})