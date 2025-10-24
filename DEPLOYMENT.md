# 🚀 Deployment Guide (Bonus Task)

This guide explains how to deploy both the frontend and backend of the Task Manager application.

## Option 1: Quick Deployment (Recommended)

### Frontend - Vercel (Free)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy the frontend**:
   ```bash
   cd task-manager-ui
   vercel --prod
   ```

3. Follow the prompts:
   - Login to Vercel
   - Select your project
   - Deploy!

4. **Note the deployment URL** (e.g., `https://your-app.vercel.app`)

### Backend - Render (Free)

1. **Create account** at [render.com](https://render.com)

2. **Push your code to GitHub** (required for Render)

3. **Create a new Web Service**:
   - Connect your GitHub repository
   - Select the `TaskManager.Api` folder
   - Build Command: `dotnet publish -c Release -o out`
   - Start Command: `dotnet out/TaskManager.Api.dll`
   - Environment: `.NET`

4. **Add Environment Variables**:
   - Go to Environment tab
   - Add: `ASPNETCORE_ENVIRONMENT=Production`
   - Add: `ASPNETCORE_URLS=http://0.0.0.0:$PORT`

5. **Update CORS** in `Program.cs`:
   ```csharp
   builder.Services.AddCors(options =>
   {
       options.AddPolicy("AllowReactApp",
           policy => policy.WithOrigins(
               "http://localhost:3000",
               "https://your-app.vercel.app"  // Add your Vercel URL here
           )
           .AllowAnyHeader()
           .AllowAnyMethod());
   });
   ```

6. **Note your API URL** (e.g., `https://your-api.onrender.com`)

### Connect Frontend to Deployed Backend

Update `task-manager-ui/src/services/taskService.ts`:

```typescript
const API_BASE_URL = 'https://your-api.onrender.com/api/tasks';
```

Redeploy frontend:
```bash
cd task-manager-ui
vercel --prod
```

## Option 2: Alternative Deployments

### Frontend Alternatives

#### Netlify
```bash
cd task-manager-ui
npm run build
# Drag and drop the 'build' folder to netlify.com
```

#### GitHub Pages
```bash
cd task-manager-ui
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io/task-manager",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

npm run deploy
```

### Backend Alternatives

#### Azure App Service
```bash
cd TaskManager.Api

# Login to Azure
az login

# Create and deploy
az webapp up --name your-unique-app-name --resource-group TaskManagerRG --runtime "DOTNET:8.0"
```

#### Railway
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Select `TaskManager.Api` folder
4. Deploy automatically

#### Heroku (with Docker)
```dockerfile
# Create Dockerfile in TaskManager.Api/
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /src/out .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet TaskManager.Api.dll
```

```bash
heroku create your-app-name
heroku stack:set container
git push heroku main
```

## 📝 Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] CORS configured correctly
- [ ] API URL updated in frontend
- [ ] Both apps communicate successfully
- [ ] All features working (CRUD operations)
- [ ] Deployment URLs documented in README

## 🔍 Testing Deployed Application

1. Open your deployed frontend URL
2. Try adding a task
3. Check browser console (F12) for any errors
4. Verify all CRUD operations work
5. Test on different browsers/devices

## 🐛 Common Deployment Issues

### Issue: CORS Error
**Solution**: Make sure backend CORS policy includes your frontend URL

### Issue: API not found (404)
**Solution**: Check that API_BASE_URL in taskService.ts matches your deployed backend

### Issue: Backend crashes on startup
**Solution**: Check logs and ensure all dependencies are installed

### Issue: Frontend shows old version
**Solution**: Clear browser cache or hard refresh (Ctrl + Shift + R)

## 📊 Deployment URLs

Once deployed, add your URLs here:

- **Frontend (Live App)**: `https://your-frontend-url.vercel.app`
- **Backend API**: `https://your-backend-url.onrender.com`
- **API Documentation**: `https://your-backend-url.onrender.com/swagger`

---

**Note**: Free tier hosting may have cold starts (first request takes longer). This is normal for free deployments.
