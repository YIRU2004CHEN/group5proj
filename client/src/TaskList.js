import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (taskId, completed) => {
    try {
      await axios.put(`http://localhost:3000/api/tasks/${taskId}`, { completed: !completed });
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, completed: !completed } : task
      ));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-4">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Task List</h1>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li 
            key={task._id} 
            className="bg-white shadow-md rounded-lg p-4 flex items-start justify-between border-l-4 
                      transition duration-200 hover:shadow-lg hover:border-blue-500"
          >
            <div>
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {task.title}
              </h3>
              <p className="text-gray-500">{task.description}</p>
            </div>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => handleCheckboxChange(task._id, task.completed)} 
              className="w-5 h-5 text-blue-500 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;