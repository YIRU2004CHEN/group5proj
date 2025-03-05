import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const App = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
