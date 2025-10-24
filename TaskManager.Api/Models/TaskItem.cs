namespace TaskManager.Api.Models
{
    // This class represents a single To-Do item.
    public class TaskItem
    {
        // 'Guid' (Globally Unique Identifier) is a standard .NET type for unique IDs.
        // { get; set; } is a C# shorthand for a property with a public getter and setter.
        public Guid Id { get; set; } = Guid.NewGuid();

        // The task description, which is a string.
        public string Description { get; set; }

        // A boolean to track if the task is finished.
        public bool IsCompleted { get; set; } = false;
    }
}