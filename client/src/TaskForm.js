import React, { useState } from'react';
import axios from'axios';

const TaskForm = () => {
  const [title, setTitle] =useState('');
  const [description, setDescription]=useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newTask = {title,description };
    await axios.post('http://localhost:3000/api/tasks', newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;