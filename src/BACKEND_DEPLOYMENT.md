# 🚀 Backend Deployment Guide

Your Gallagher Art School app is currently running in **Demo Mode** because the Supabase backend is not deployed. Here's how to get it fully functional:

## 🎯 Current Status

- ✅ **Frontend**: Fully functional with demo mode
- ✅ **Backend Code**: Complete and ready to deploy  
- ❌ **Backend Deployment**: Needs to be deployed to Supabase

## 📋 Quick Setup (5 minutes)

### Step 1: Deploy to Supabase
The backend code is already written in `/supabase/functions/server/index.tsx`. You need to deploy it:

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**
   ```bash
   supabase login
   ```

3. **Link your project** (use the project ID from `/utils/supabase/info.tsx`)
   ```bash
   supabase link --project-ref fndzjzcugohhsdoatjlu
   ```

4. **Deploy the edge function**
   ```bash
   supabase functions deploy server
   ```

### Step 2: Verify Deployment
After deployment, your app will automatically switch from demo mode to live mode!

Test the health endpoint:
```
https://fndzjzcugohhsdoatjlu.supabase.co/functions/v1/make-server-9c2430a9/health
```

## 🔧 Alternative: Run Locally

If you want to develop locally:

```bash
# Start Supabase locally
supabase start

# Deploy function locally  
supabase functions serve server

# Update the projectId in /utils/supabase/info.tsx to your local URL
```

## 🎨 What Happens After Deployment

### ✨ Full Features Unlocked
- **Real user accounts** instead of demo data
- **Persistent data storage** in Supabase
- **Admin dashboard** with live student data
- **Newsletter management** with real subscribers
- **CSV exports** of actual enrollment data
- **Secure authentication** with password hashing

### 📊 Backend API Endpoints
Once deployed, these endpoints will be live:

```
POST /signup          → Create student accounts
POST /login           → User authentication  
GET  /profile         → User profile management
PUT  /profile         → Profile updates
GET  /students/by-interest/:interest → Admin analytics
GET  /newsletter/subscribers         → Newsletter management
GET  /health          → System health check
```

## 🚨 Demo Mode Limitations

Currently running with these limitations:
- Data stored only in browser localStorage
- No real user authentication
- Data lost when browser cache is cleared
- No cross-device synchronization
- Limited to demonstration purposes

## 🔍 Troubleshooting

### "Project not found" error
- Verify your project ID in `/utils/supabase/info.tsx`
- Make sure you're logged into the correct Supabase account

### "Function deployment failed"
- Check that you have the correct permissions
- Verify your Supabase project is active
- Try deploying with: `supabase functions deploy server --debug`

### "Cannot connect to function"
- Wait 2-3 minutes after deployment
- Check function logs: `supabase functions logs server`
- Verify environment variables are set

## 📞 Need Help?

1. **Check function logs**:
   ```bash
   supabase functions logs server
   ```

2. **Test the deployment**:
   Visit the health endpoint in your browser

3. **Verify in Supabase Dashboard**:
   - Go to Functions tab
   - Ensure "server" function is listed and active

## 🎯 Success!

Once deployed, your signup form will show "Connected" status and the admin dashboard will load real data instead of demo data.

The entire system is production-ready and will handle student enrollments, admin management, and newsletter subscriptions automatically! 🎨✨