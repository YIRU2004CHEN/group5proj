import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "react-beautiful-dnd";

const API_URL = "http://localhost:5000/api/tasks";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
      await axios.post(
        API_URL,
        { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTitle("");
      setDescription("");
      setSuccess("Task added successfully!");
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
      setError("Failed to add task. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/${editTaskId}`,
        { title: editTitle, description: editDescription },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setEditTaskId(null);
      setEditTitle("");
      setEditDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...tasks];
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setTasks(reordered);
  };

  return (
    <div style={styles.container}>
      
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

      <h2 style={styles.heading}>📝 Your Tasks</h2>
      {tasks.length === 0 ? (
        <p style={styles.noTasks}>You don't have any tasks yet.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="taskList" direction="vertical">
            {(provided) => (
              <ul
                style={styles.taskList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Draggable
                    draggableId={String(task._id)}
                    index={index}
                    key={task._id}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...styles.card,
                          ...provided.draggableProps.style,
                          width: "100%",
                          maxWidth: "600px",
                          minWidth: "600px",
                          boxSizing: "border-box",
                        }}
                      >
                        {editTaskId === task._id ? (
                          <form onSubmit={handleEditSubmit}>
                            <input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              style={styles.input}
                            />
                            <input
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              style={styles.input}
                            />
                            <button type="submit" style={styles.button}>Save</button>
                          </form>
                        ) : (
                          <>
                            <h3 style={styles.title}>{task.title}</h3>
                            <p style={styles.description}>{task.description}</p>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button
                                onClick={() => handleEdit(task)}
                                style={styles.editButton}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(task._id)}
                                style={styles.deleteButton}
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

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
    border: "1px dashed #ccc",
    cursor: "grab",
    transition: "box-shadow 0.15s ease",
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
  editButton: {
    padding: "6px 12px",
    backgroundColor: "#facc15",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default TaskList;