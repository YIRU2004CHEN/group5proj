import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const[tasks, setTasks] = useState([]);

  useEffect(()=>
  {
    fetchTasks();
  }, []);

  const fetchTasks = async() =>{
    const response = await axios.get('http://localhost:3000/api/tasks');
    setTasks(response.data);
  };
  
  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <input type="checkbox" checked={task.completed} readOnly />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;