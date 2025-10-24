import React, { useState, useEffect } from 'react';
import { TaskItem } from '../types/TaskItem';
import { taskService } from '../services/taskService';

type FilterType = 'all' | 'active' | 'completed';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // ----------------------------------------------------------------
  // EFFECT HOOKS - Run code at specific times
  // ----------------------------------------------------------------
  
  // 🔄 Load tasks when component first renders
  useEffect(() => {
    loadTasksFromAPI();
    loadTasksFromLocalStorage(); // Fallback if API fails
  }, []); // Empty array = run only once when component mounts

  // 💾 Save to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]); // Run whenever 'tasks' changes

  // ----------------------------------------------------------------
  // FUNCTIONS - Handle user actions
  // ----------------------------------------------------------------

  /**
   * 📥 Load tasks from the backend API
   */
  const loadTasksFromAPI = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks from server');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 💾 Load tasks from browser's localStorage (backup)
   */
  const loadTasksFromLocalStorage = () => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        const parsedTasks = JSON.parse(saved);
        setTasks(parsedTasks);
      } catch (err) {
        console.error('Error parsing localStorage:', err);
      }
    }
  };

  /**
   * ➕ Add a new task
   * @param e - Form submit event
   */
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh on form submit
    
    // Validation: Don't add empty tasks
    if (!newTaskDescription.trim()) {
      setError('Task description cannot be empty');
      return;
    }

    try {
      setError('');
      // Call the API to create the task
      const newTask = await taskService.addTask(newTaskDescription);
      
      // Add the new task to the UI
      setTasks([...tasks, newTask]); // ...tasks = spread operator (copy existing tasks)
      
      // Clear the input field
      setNewTaskDescription('');
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task');
    }
  };

  /**
   * ✅ Toggle task completion status
   * @param task - The task to toggle
   */
  const handleToggleComplete = async (task: TaskItem) => {
    try {
      setError('');
      // Create updated task with flipped completion status
      const updatedTask = { 
        ...task, 
        isCompleted: !task.isCompleted 
      };
      
      // Send update to backend
      await taskService.updateTask(task.id, updatedTask);
      
      // Update the UI
      setTasks(tasks.map(t => 
        t.id === task.id ? updatedTask : t
      ));
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task');
    }
  };

  /**
   * ❌ Delete a task
   * @param id - The ID of the task to delete
   */
  const handleDeleteTask = async (id: string) => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setError('');
      // Delete from backend
      await taskService.deleteTask(id);
      
      // Remove from UI
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
    }
  };

  // ----------------------------------------------------------------
  // FILTERING - Show only tasks matching the selected filter
  // ----------------------------------------------------------------
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true; // 'all' shows everything
  });

  // ----------------------------------------------------------------
  // RENDER - The UI/HTML that users see
  // ----------------------------------------------------------------
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Task Manager</h1>

      {/* Error message */}
      {error && (
        <div style={styles.error}>
          ⚠️ {error}
        </div>
      )}

      {/* ➕ ADD TASK FORM */}
      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Enter a new task..."
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Add Task
        </button>
      </form>

      {/* 🔍 FILTER BUTTONS */}
      <div style={styles.filterContainer}>
        <button 
          onClick={() => setFilter('all')} 
          style={{
            ...styles.filterButton,
            ...(filter === 'all' ? styles.filterButtonActive : {})
          }}
        >
          All ({tasks.length})
        </button>
        <button 
          onClick={() => setFilter('active')} 
          style={{
            ...styles.filterButton,
            ...(filter === 'active' ? styles.filterButtonActive : {})
          }}
        >
          Active ({tasks.filter(t => !t.isCompleted).length})
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          style={{
            ...styles.filterButton,
            ...(filter === 'completed' ? styles.filterButtonActive : {})
          }}
        >
          Completed ({tasks.filter(t => t.isCompleted).length})
        </button>
      </div>

      {/* 📋 TASK LIST */}
      {loading ? (
        <p style={styles.loading}>Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p style={styles.emptyState}>
          {filter === 'all' 
            ? 'No tasks yet. Add one above!' 
            : `No ${filter} tasks.`}
        </p>
      ) : (
        <ul style={styles.taskList}>
          {filteredTasks.map(task => (
            <li key={task.id} style={styles.taskItem}>
              {/* Checkbox to toggle completion */}
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggleComplete(task)}
                style={styles.checkbox}
              />
              
              {/* Task description */}
              <span style={{
                ...styles.taskDescription,
                ...(task.isCompleted ? styles.taskCompleted : {})
              }}>
                {task.description}
              </span>
              
              {/* Delete button */}
              <button
                onClick={() => handleDeleteTask(task.id)}
                style={styles.deleteButton}
              >
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Task count */}
      <div style={styles.footer}>
        {tasks.filter(t => !t.isCompleted).length} task(s) remaining
      </div>
    </div>
  );
};

// ----------------------------------------------------------------
// STYLES - Inline CSS (you can use external CSS files too)
// ----------------------------------------------------------------
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center' as const,
    color: '#333',
    marginBottom: '20px'
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    textAlign: 'center' as const
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '4px',
    outline: 'none'
  },
  addButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold' as const
  },
  filterContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center'
  },
  filterButton: {
    padding: '8px 16px',
    border: '2px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
    color: 'white',
    borderColor: '#2196F3'
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px',
    backgroundColor: 'white',
    marginBottom: '10px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  taskDescription: {
    flex: 1,
    fontSize: '16px',
    color: '#333'
  },
  taskCompleted: {
    textDecoration: 'line-through',
    color: '#999'
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  loading: {
    textAlign: 'center' as const,
    color: '#666',
    padding: '20px'
  },
  emptyState: {
    textAlign: 'center' as const,
    color: '#999',
    padding: '40px',
    fontSize: '18px'
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center' as const,
    color: '#666',
    fontSize: '14px'
  }
};

export default TaskManager;