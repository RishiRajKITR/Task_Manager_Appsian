# Task Manager Application

A full-stack Task Manager application built with React (TypeScript) frontend and ASP.NET Core Web API backend.

## 🚀 Features

- ✅ Create, Read, Update, and Delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks by status (All, Active, Completed)
- ✅ Real-time task counter
- ✅ Clean and responsive UI
- ✅ RESTful API backend
- ✅ Persistent storage with in-memory database

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **.NET 8.0 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Git** - [Download here](https://git-scm.com/)

## 🏗️ Project Structure

```
TaskManager/
├── TaskManager.Api/          # ASP.NET Core Web API Backend
│   ├── Controllers/          # API Controllers
│   ├── Models/              # Data Models
│   ├── Program.cs           # Application entry point
│   └── appsettings.json     # Configuration
│
└── task-manager-ui/         # React TypeScript Frontend
    ├── public/              # Static files
    ├── src/
    │   ├── components/      # React components
    │   │   └── TaskManager.tsx
    │   ├── services/        # API service layer
    │   │   └── taskService.ts
    │   ├── types/           # TypeScript interfaces
    │   │   └── TaskItem.ts
    │   ├── App.tsx          # Main App component
    │   └── index.tsx        # Application entry point
    └── package.json         # Dependencies
```

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd TaskManager
```

### 2. Backend Setup (ASP.NET Core API)

```bash
# Navigate to the API folder
cd TaskManager.Api

# Restore dependencies
dotnet restore

# Run the API
dotnet run
```

The API will start on `http://localhost:5007`

You can access the Swagger documentation at: `http://localhost:5007/swagger`

### 3. Frontend Setup (React)

Open a **new terminal** and run:

```bash
# Navigate to the frontend folder
cd task-manager-ui

# Install dependencies
npm install

# Start the development server
npm start
```

The React app will start on `http://localhost:3000` and automatically open in your browser.

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/{id}` | Get a specific task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

## 🧪 Testing the Application

1. **Add a Task**: Type a task description and click "Add Task"
2. **Complete a Task**: Click the checkbox next to a task
3. **Delete a Task**: Click the 🗑️ Delete button
4. **Filter Tasks**: Use the "All", "Active", or "Completed" buttons

## 🌐 Deployment (Bonus)

### Frontend Deployment (Vercel/Netlify)

#### Using Vercel:

1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy:
   ```bash
   cd task-manager-ui
   vercel --prod
   ```

#### Using Netlify:

1. Build the project:
   ```bash
   cd task-manager-ui
   npm run build
   ```
2. Deploy the `build` folder to [netlify.com](https://www.netlify.com/)

### Backend Deployment (Azure/Render)

#### Using Azure:

```bash
cd TaskManager.Api
az webapp up --name your-app-name --resource-group your-rg
```

#### Using Render:

1. Create account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Select "Web Service"
4. Build command: `dotnet publish -c Release -o out`
5. Start command: `dotnet out/TaskManager.Api.dll`

**Important**: After deployment, update the API URL in `task-manager-ui/src/services/taskService.ts`:

```typescript
const API_BASE_URL = 'https://your-deployed-api-url/api/tasks';
```

## 🔧 Configuration

### Backend Port Configuration

Edit `TaskManager.Api/Properties/launchSettings.json` to change the API port:

```json
"applicationUrl": "http://localhost:5007"
```

### Frontend API URL

Edit `task-manager-ui/src/services/taskService.ts`:

```typescript
const API_BASE_URL = 'http://localhost:5007/api/tasks';
```

## 🐛 Troubleshooting

### Port Already in Use

**Backend:**
```bash
# Windows
netstat -ano | findstr :5007
taskkill /PID <PID> /F
```

**Frontend:**
- React will automatically suggest a different port if 3000 is busy

### CORS Issues

The backend is configured to allow requests from `http://localhost:3000`. If you're running on a different port, update `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
                       .AllowAnyHeader()
                       .AllowAnyMethod());
});
```

### TypeScript Errors

Clear the cache and restart:
```bash
cd task-manager-ui
rm -rf node_modules/.cache
npm start
```

## 📦 Technologies Used

### Frontend
- React 19
- TypeScript 4.9
- Axios (HTTP client)
- CSS (inline styles)

### Backend
- ASP.NET Core 8.0
- C# 12
- Swagger/OpenAPI
- In-memory database

## 👨‍💻 Development

### Adding New Features

1. **Add new API endpoint**: Edit `TaskManager.Api/Controllers/TaskController.cs`
2. **Add new frontend feature**: Create components in `task-manager-ui/src/components/`
3. **Update types**: Modify `task-manager-ui/src/types/TaskItem.ts`

### Code Style

- Frontend: Follow React best practices with functional components and hooks
- Backend: Follow C# coding conventions and RESTful API design

## 📝 License

This project is created as an assignment submission.

## 🙋‍♂️ Support

For any issues or questions, please open an issue in the GitHub repository.

---

**Developed by**: [Your Name]  
**Date**: October 2025  
**Assignment**: Full-Stack Task Manager Application
