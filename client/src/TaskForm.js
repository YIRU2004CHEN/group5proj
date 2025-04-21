import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(API_URL, { title, description }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTitle("");
      setDescription("");
      setSuccess("Task added successfully!");
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
      setError("Failed to add task. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Add Task Form */}
      <h2 style={styles.heading}>Add New Task</h2>
      <form onSubmit={handleAddTask} style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Task</button>
        {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "8px" }}>{success}</p>}
      </form>

      {/* Task List */}
      <h2 style={styles.heading}>📝 Your Tasks</h2>
      {tasks.length === 0 ? (
        <p style={styles.noTasks}>You don't have any tasks yet.</p>
      ) : (
        <ul style={styles.taskList}>
          {tasks.map((task) => (
            <li key={task._id} style={styles.card}>
              <h3 style={styles.title}>{task.title}</h3>
              <p style={styles.description}>{task.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 💅 Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#111827",
  },
  noTasks: {
    textAlign: "center",
    color: "#6b7280",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  card: {
    backgroundColor: "#fff",
    padding: "16px",
    marginBottom: "12px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "18px",
    margin: 0,
    color: "#111827",
  },
  description: {
    marginTop: "8px",
    color: "#4b5563",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default TaskList;
