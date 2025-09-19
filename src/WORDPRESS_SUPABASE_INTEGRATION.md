# WordPress Supabase Integration Guide

## How It Works

Your WordPress plugin is already set up to automatically load Supabase credentials from your WordPress admin settings. Here's how it works:

## 1. WordPress Admin Settings

In your WordPress admin, you'll find **"Art School Settings"** under the **Settings** menu. This page has two fields:

- **Supabase Project ID**: Your project ID (e.g., `fndzjzcugohhsdoatjlu`)
- **Supabase Anonymous Key**: Your public anonymous key (the long JWT token)

## 2. Automatic Loading

The WordPress plugin automatically:

1. **Saves settings** when you update them in the admin
2. **Loads credentials** on every page that uses the `[gallagher_signup]` shortcode
3. **Passes them to JavaScript** via the `gallagher_config` object

## 3. Dynamic Credential Usage

Both your WordPress plugin (vanilla JS) and React app now check for dynamic credentials:

```javascript
// WordPress plugin uses:
const projectId = gallagher_config.supabase_project_id;
const anonKey = gallagher_config.supabase_anon_key;

// React app checks for WordPress credentials first:
const wpProjectId = window.gallagher_config?.supabase_project_id;
const wpAnonKey = window.gallagher_config?.supabase_anon_key;
const activeProjectId = wpProjectId || fallbackProjectId;
const activeAnonKey = wpAnonKey || fallbackAnonKey;
```

## 4. Where to Enter Your Credentials

### For WordPress (Recommended):
1. Go to **WordPress Admin** → **Settings** → **Art School Settings**
2. Enter your **Supabase Project ID**
3. Enter your **Supabase Anonymous Key**
4. Click **Save Changes**

### For React Development:
Edit `/utils/supabase/info.tsx` with your credentials for testing

## 5. Getting Your Supabase Credentials

From your Supabase Dashboard:

1. **Project ID**: In your project URL: `https://[PROJECT-ID].supabase.co`
2. **Anonymous Key**: 
   - Go to **Settings** → **API** 
   - Copy the **anon/public key** (starts with `eyJ...`)

## 6. Backend Environment Variables

Your backend server also needs these environment variables:

- **SUPABASE_URL**: `https://[PROJECT-ID].supabase.co`
- **SUPABASE_SERVICE_ROLE_KEY**: Your private service role key (different from anon key)

## 7. Verification

The app will automatically:
- ✅ **Show "Connected"** if your backend is accessible
- ℹ️ **Show "Demo Mode"** if backend is unavailable (uses local storage)
- ❌ **Show configuration errors** if credentials are missing

## 8. Shortcode Usage

Use in any WordPress post/page:

```
[gallagher_signup]
```

With custom options:
```
[gallagher_signup school_name="My Art Studio" tagline="Creative excellence since 1995"]
```

## Troubleshooting

### "Supabase configuration is missing"
- Check that your WordPress admin settings are saved
- Verify the credentials are correct
- Clear any browser cache

### "Backend Unavailable" 
- Your Supabase edge function isn't deployed
- Check the backend deployment guide
- The app will run in demo mode using localStorage

### Plugin Not Loading Credentials
- Ensure the shortcode `[gallagher_signup]` is present on the page
- Check that JavaScript is enabled
- Verify the plugin is activated in WordPress

## Security Notes

- ✅ **Anonymous key** is safe for frontend use
- ❌ **Service role key** must NEVER be exposed to frontend
- 🔒 **WordPress admin settings** are only accessible to administrators