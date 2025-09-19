# 🚀 Quick Install - Gallagher Art School for Flatsome

## Files to Upload

Upload these **3 files** to `/wp-content/plugins/gallagher-art-school/`:

1. **gallagher-flatsome-optimized.php** - Main plugin file
2. **gallagher-flatsome-styles.css** - Stylesheet  
3. **gallagher-flatsome-script.js** - JavaScript functionality

## Installation Steps

### Step 1: Upload Files
```
/wp-content/plugins/gallagher-art-school/
├── gallagher-flatsome-optimized.php
├── gallagher-flatsome-styles.css
└── gallagher-flatsome-script.js
```

### Step 2: Activate Plugin
1. Go to **WordPress Admin → Plugins**
2. Find "Gallagher Art School - Flatsome Optimized" 
3. Click **Activate**

### Step 3: Configure Settings
1. Go to **Settings → Art School - Flatsome**
2. Add your credentials:
   - **Supabase Project ID**: `your-project-id`
   - **Supabase Anonymous Key**: `your-anon-key`
   - **Postmark API Key**: `your-postmark-key`
3. **Save Changes**

### Step 4: Add to Flatsome Page
1. Create/edit a page in **Flatsome UX Builder**
2. Add a **Row** (set to Full Width, no padding)
3. Add a **Text Element** 
4. Insert: `[gallagher_signup_form]`
5. **Save & Preview**

## ✅ What You'll Get

- **Left Side**: Rotating image carousel with 7 art slides
- **Right Side**: Multi-step signup form
- **Features**: 
  - Auto-advancing slides (4 seconds)
  - Manual navigation (arrows, dots, keyboard)
  - Play/pause control
  - Progress bar
  - Social login (Google/Apple)
  - Form validation
  - Mobile responsive

## 🎯 Shortcode Options

```php
[gallagher_signup_form]                    // Full experience
[gallagher_signup_form form_only="true"]   // Form only
[gallagher_signup_form show_carousel="false"] // No carousel
```

## 🔧 Customization

```php
[gallagher_signup_form 
  school_name="My Art Studio" 
  tagline="Creative excellence since 1995"
  background_image="https://your-image.jpg"]
```

## 🚨 Troubleshooting

**Changes not showing up?** (Most common issue!)
- **Clear ALL caches**: WordPress cache, browser cache, CDN cache
- **Disable cache plugins** temporarily during testing
- **Hard refresh**: Ctrl+F5 (PC) or Cmd+Shift+R (Mac)
- **Check file timestamps**: Ensure files were actually uploaded
- **Test incognito mode**: Rules out browser caching

**Carousel not showing?**
- Clear all caches (see above)
- Check browser console for errors
- Ensure jQuery is loaded

**Form dropdown not visible?**
- Clear caches first
- Check for theme CSS conflicts
- Try in incognito mode

**Form not submitting?**
- Verify Supabase credentials in settings
- Check WordPress error logs

**Form too skinny?** (Fixed in v3.0!)
- Re-upload the updated CSS file
- Clear all caches
- Form now uses 650px max-width with generous padding

## 📱 Mobile Testing

Test on:
- Desktop (side-by-side layout)
- Tablet (stacked layout) 
- Mobile (optimized form)

---

**Ready to go!** Your art school signup form should now be live with the beautiful rotating carousel. 🎨