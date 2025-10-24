# 📤 GitHub Submission Guide

Follow these steps to submit your assignment on GitHub.

## Step 1: Initialize Git Repository

```bash
cd c:\Users\hp\Desktop\Appsian\TaskManager

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Task Manager Full Stack Application"
```

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and login
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `task-manager-fullstack` (or any name you prefer)
   - **Description**: "Full-stack Task Manager with React TypeScript and ASP.NET Core API"
   - **Visibility**: Public (required for most free deployments)
   - **DO NOT** initialize with README (we already have one)
5. Click **"Create repository"**

## Step 3: Push to GitHub

GitHub will show you commands. Use these:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push code
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and repository name.

## Step 4: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files:
   - ✅ README.md
   - ✅ DEPLOYMENT.md
   - ✅ TaskManager.Api/ folder
   - ✅ task-manager-ui/ folder
   - ✅ .gitignore

## Step 5: Complete the Bonus Task (Optional but Recommended)

Follow the `DEPLOYMENT.md` guide to deploy your application and add the live URLs to your README.

### Quick Deployment Steps:

1. **Deploy Backend** (Render - Free):
   - Go to [render.com](https://render.com)
   - Connect GitHub repository
   - Deploy `TaskManager.Api` folder
   - Note the URL

2. **Update Frontend** with backend URL:
   - Edit `task-manager-ui/src/services/taskService.ts`
   - Update `API_BASE_URL` to your Render URL

3. **Deploy Frontend** (Vercel - Free):
   ```bash
   cd task-manager-ui
   npm install -g vercel
   vercel --prod
   ```

4. **Update README** with live URLs:
   ```markdown
   ## 🌐 Live Demo
   
   - **Frontend**: https://your-app.vercel.app
   - **Backend API**: https://your-api.onrender.com
   - **API Docs**: https://your-api.onrender.com/swagger
   ```

5. **Commit and push** the changes:
   ```bash
   git add .
   git commit -m "Add deployment URLs"
   git push
   ```

## Step 6: Submit

Share your GitHub repository URL:
```
https://github.com/YOUR-USERNAME/YOUR-REPO-NAME
```

If you completed the bonus task, also share:
- Frontend live URL
- Backend API URL (optional)

## 📋 Pre-Submission Checklist

- [ ] All code is committed and pushed to GitHub
- [ ] README.md is clear and comprehensive
- [ ] .gitignore excludes node_modules and bin/obj folders
- [ ] Repository is public (not private)
- [ ] Code is well-organized with clear folder structure
- [ ] Both frontend and backend work locally
- [ ] (Bonus) Application is deployed and URLs are added to README

## 🎯 What Evaluators Will Look For

1. **Code Quality**:
   - Clean, readable code
   - Proper TypeScript types
   - Good component structure
   - RESTful API design

2. **Functionality**:
   - All CRUD operations work
   - Task filtering works
   - UI is responsive and user-friendly

3. **Documentation**:
   - Clear README with setup instructions
   - Well-commented code (where necessary)
   - API endpoints documented

4. **Bonus Points**:
   - Live deployment (if completed)
   - Extra features
   - Error handling
   - Loading states

## 🆘 Common Issues

### Issue: Large files rejected
**Solution**: Make sure `.gitignore` is in place before first commit

### Issue: Node_modules pushed to GitHub
**Solution**: 
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```

### Issue: Can't push (authentication failed)
**Solution**: Use GitHub Personal Access Token instead of password
1. GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token with 'repo' permissions
3. Use token as password when pushing

## 📞 Final Checklist

Before submitting, test your GitHub repository:

1. **Clone it in a new location**:
   ```bash
   cd C:\Temp
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   cd YOUR-REPO-NAME
   ```

2. **Follow your own README** to set it up:
   ```bash
   # Backend
   cd TaskManager.Api
   dotnet restore
   dotnet run
   
   # Frontend (new terminal)
   cd task-manager-ui
   npm install
   npm start
   ```

3. **Verify everything works** ✅

Good luck with your submission! 🚀
