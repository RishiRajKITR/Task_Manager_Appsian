import axios from 'axios';
import { TaskItem } from '../types/TaskItem';

// ⚠️ IMPORTANT: Change this port if your backend runs on a different port
const API_BASE_URL = 'http://localhost:5007/api/tasks';

// This object contains all functions to interact with the backend
export const taskService = {
  
  // 📥 GET all tasks from backend
  getAllTasks: async (): Promise<TaskItem[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data; // Returns array of tasks
  },

  // ➕ ADD a new task
  addTask: async (description: string): Promise<TaskItem> => {
    const response = await axios.post(API_BASE_URL, { 
      description: description 
    });
    return response.data; // Returns the newly created task
  },

  // ✏️ UPDATE a task (toggle completion or change description)
  updateTask: async (id: string, task: TaskItem): Promise<void> => {
    await axios.put(`${API_BASE_URL}/${id}`, task);
    // No return value needed (backend returns 204 No Content)
  },

  // ❌ DELETE a task
  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
    // No return value needed (backend returns 204 No Content)
  }
};