import { useState } from "react";
import { useReducer } from "react";



export const TaskList = () => {
const [newTaskText, setNewTaskText] = useState('');
const [TaskChange, setTaskChange] = useState(' |Не выполнена');
const initialState = [];
const [tasks, dispatch] = useReducer(taskReducer, initialState);

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { text: action.text, id: Date.now() }];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.id);
    default:
      return state;
  }
}

function addTask(text) {
    dispatch({ type: 'ADD_TASK', text });
  }
  
  function deleteTask(id) {
    dispatch({ type: 'DELETE_TASK', id });
  }
function acceptTask() { 
    setTaskChange(' |Выполнена');
}



    return (
        <div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.text}
                        {TaskChange}
                        <button onClick={() => deleteTask(task.id)}>Удалить</button>
                        <button onClick={acceptTask}>Выполнить</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
            />
            <button onClick={() => addTask(newTaskText)}>Добавить задачу</button>
        </div>
    )

}