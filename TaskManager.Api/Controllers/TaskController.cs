using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Models;

// The [ApiController] attribute enables API-specific behaviors like automatic HTTP 400 responses.
[ApiController] 
// [Route] defines the base URL for all actions in this controller.
// [controller] is a placeholder that will be replaced by the controller's name ("Tasks").
[Route("api/[controller]")] // This means the base route is /api/tasks
public class TasksController : ControllerBase
{
    // ----------------------------------------------------------------
    // IN-MEMORY DATA STORE
    // This static list will hold all our TaskItems for the duration the API is running.
    // It's "in-memory," so the data will be lost when the application stops.
    private static readonly List<TaskItem> _tasks = new List<TaskItem>
    {
        // Pre-populate with a couple of tasks for testing
        new TaskItem { Description = "Learn .NET Web API basics", IsCompleted = true },
        new TaskItem { Description = "Implement all required endpoints", IsCompleted = false }
    };
    // ----------------------------------------------------------------

    // ----------------------------------------------------------------
    // 1. GET /api/tasks (Display a list of tasks)
    // ----------------------------------------------------------------
    [HttpGet] // Maps this method to the HTTP GET verb at the base route /api/tasks
    public ActionResult<IEnumerable<TaskItem>> GetTasks()
    {
        // Returns an HTTP 200 OK response with the list of tasks in the body.
        return Ok(_tasks);
    }

    // ----------------------------------------------------------------
    // 2. POST /api/tasks (Add a new task with a description)
    // ----------------------------------------------------------------
    [HttpPost] // Maps this method to the HTTP POST verb at /api/tasks
    // [FromBody] tells the framework to try and deserialize the JSON in the request body 
    // into a new TaskItem object.
    public ActionResult<TaskItem> AddTask([FromBody] TaskItem newTask)
    {
        // 1. Validate the input (basic check)
        if (string.IsNullOrWhiteSpace(newTask.Description))
        {
            return BadRequest("Task description is required.");
        }

        // 2. Clear any user-provided Id (we want to generate our own)
        newTask.Id = Guid.NewGuid(); 
        newTask.IsCompleted = false; // New tasks are always uncompleted

        // 3. Add the task to the in-memory list
        _tasks.Add(newTask);

        // 4. Return an HTTP 201 Created response.
        // It's best practice to return the created resource and a link to it.
        return CreatedAtAction(nameof(GetTasks), new { id = newTask.Id }, newTask);
    }

    // ----------------------------------------------------------------
    // 3. PUT /api/tasks/{id} (Mark a task as completed or uncompleted)
    // We only need to update IsCompleted, but a full PUT is required.
    // ----------------------------------------------------------------
    [HttpPut("{id}")] // Maps to HTTP PUT verb and expects an ID in the URL, e.g., /api/tasks/GUID
    public ActionResult UpdateTask(Guid id, [FromBody] TaskItem updatedTask)
    {
        // 1. Find the task in the list by its ID
        var taskToUpdate = _tasks.FirstOrDefault(t => t.Id == id);

        // 2. Handle the case where the task doesn't exist
        if (taskToUpdate == null)
        {
            return NotFound(); // Returns HTTP 404 Not Found
        }
        
        // 3. Update the required properties
        // We ensure the original Id is kept, but update the Description and IsCompleted status.
        taskToUpdate.Description = updatedTask.Description;
        taskToUpdate.IsCompleted = updatedTask.IsCompleted;
        
        // 4. Return HTTP 204 No Content (standard for a successful update with no body)
        return NoContent(); 
    }

    // ----------------------------------------------------------------
    // 4. DELETE /api/tasks/{id} (Delete a task)
    // ----------------------------------------------------------------
    [HttpDelete("{id}")] // Maps to HTTP DELETE verb and expects an ID in the URL
    public ActionResult DeleteTask(Guid id)
    {
        // 1. Find the task in the list by its ID
        var taskToDelete = _tasks.FirstOrDefault(t => t.Id == id);

        // 2. Handle the case where the task doesn't exist
        if (taskToDelete == null)
        {
            return NotFound(); // Returns HTTP 404 Not Found
        }

        // 3. Remove the task from the list
        _tasks.Remove(taskToDelete);

        // 4. Return HTTP 204 No Content (standard for a successful deletion)
        return NoContent();
    }
}