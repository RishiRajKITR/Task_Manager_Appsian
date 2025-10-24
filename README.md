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

## 🌐 Live Demo (Bonus Task)

- **Repository**: https://github.com/RishiRajKITR/Task_Manager_Appsian
- **Frontend Deployment**: [Add your Vercel/Netlify URL here after deployment]
- **Backend API**: [Add your Render/Azure URL here after deployment]

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

## 🌐 Deployment (Bonus Task)

### Quick Deployment Guide

#### Frontend - Vercel (Recommended, Free)

1. Install Vercel CLI and deploy:
   ```bash
   npm install -g vercel
   cd task-manager-ui
   vercel --prod
   ```

#### Backend - Render (Recommended, Free)

1. Go to [render.com](https://render.com) and create account
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `TaskManager.Api`
   - **Build Command**: `dotnet publish -c Release -o out`
   - **Start Command**: `dotnet out/TaskManager.Api.dll`
5. Add environment variable: `ASPNETCORE_URLS=http://0.0.0.0:$PORT`

#### Connect Frontend to Backend

After deployment, update `task-manager-ui/src/services/taskService.ts`:
```typescript
const API_BASE_URL = 'https://your-backend.onrender.com/api/tasks';
```

Then redeploy frontend with `vercel --prod`

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
- React 19.2.0
- TypeScript 4.9.5
- Axios 1.12.2 (HTTP client)
- CSS (inline styles)

### Backend
- ASP.NET Core 8.0
- C# 12
- Swagger/OpenAPI
- In-memory database

##  License

This project is created as an assignment submission.

---

**Repository**: https://github.com/RishiRajKITR/Task_Manager_Appsian  
**Date**: October 2025  
**Assignment**: Full-Stack Task Manager Application
