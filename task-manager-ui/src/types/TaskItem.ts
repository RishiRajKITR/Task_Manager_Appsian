// This interface defines the structure of a Task
// It must match the TaskItem class in your backend
export interface TaskItem {
  id: string;           // Guid from backend becomes string in TypeScript
  description: string;  // The task description
  isCompleted: boolean; // Whether the task is done
}
