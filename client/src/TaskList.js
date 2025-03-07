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

  if (loading) return <p className="text-center text-gray-400 mt-4">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-400 mt-4">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Tech-Themed Logo */}
      <img 
        src="https://source.unsplash.com/100x100/?technology,ai" 
        alt="Tech Logo" 
        className="w-24 h-24 mb-4"
      />

      <h1 className="text-4xl font-bold text-blue-400 mb-6">⚙️ Tech Task List</h1>

      {/* Task List Illustration */}
      <img 
        src="https://source.unsplash.com/200x200/?programming,coding" 
        alt="Task Icon" 
        className="w-40 h-40 mb-6 rounded-full border-4 border-blue-400 shadow-lg"
      />

      <ul className="space-y-4 w-full max-w-lg">
        {tasks.map((task) => (
          <li 
            key={task._id} 
            className={`bg-gray-800 shadow-lg rounded-lg p-4 border-l-4 border-blue-500 transition 
                      duration-200 hover:shadow-xl hover:border-blue-300 flex justify-between items-center`}
          >
            <div>
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-blue-300'}`}>
                {task.title}
              </h3>
              <p className="text-gray-400">{task.description}</p>
            </div>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => handleCheckboxChange(task._id, task.completed)} 
              className="w-6 h-6 text-blue-500 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;