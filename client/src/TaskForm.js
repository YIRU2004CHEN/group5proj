import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const newTask = { title, description };
      const response = await axios.post('http://localhost:3000/api/tasks', newTask);
      setTitle('');
      setDescription('');

      if (onTaskAdded) {
        onTaskAdded(response.data);
      }
    } catch (err) {
      setError('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Create a New Task</h2>

        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Description</label>
          <textarea
            placeholder="Enter task details (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 disabled:bg-gray-400"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
              Adding...
            </span>
          ) : (
            "Add Task"
          )}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
