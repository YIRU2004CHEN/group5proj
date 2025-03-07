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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Tech-Themed Logo */}
      <img 
        src="https://source.unsplash.com/100x100/?technology,ai" 
        alt="Tech Logo" 
        className="w-24 h-24 mb-4"
      />

      <h1 className="text-3xl font-bold text-blue-400 mb-6">⚡ Add Your Tech Task</h1>

      <div className="flex flex-col items-center space-y-6">
        {/* Tech Image */}
        <img 
          src="https://source.unsplash.com/200x200/?robot,circuit" 
          alt="Tech Task Illustration" 
          className="w-40 h-40 rounded-full border-4 border-blue-400 shadow-lg"
        />

        <form 
          onSubmit={handleSubmit} 
          className="bg-gray-800 shadow-lg rounded-lg p-6 border border-blue-400 w-full max-w-md text-center"
        >
          {error && <p className="text-red-400 mb-3 text-sm">{error}</p>}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-400 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Enter task details (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-blue-400 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 disabled:bg-gray-400"
          >
            {loading ? "🚀 Processing..." : "Add Tech Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;