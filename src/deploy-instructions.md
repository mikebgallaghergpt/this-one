# 🚀 How to Deploy Your Gallagher Art School Website

## ⚡ Instant Deployment (Easiest - 2 minutes)

### Using the HTML File:
1. **Download** the `wordpress-export.html` file from this project
2. **Rename** it to `index.html` 
3. **Upload** to one of these services:

#### Netlify Drop (Easiest)
- Go to [netlify.com/drop](https://app.netlify.com/drop)
- Drag and drop your `index.html` file
- Get instant live website!

#### Surge.sh (Command Line)
```bash
npm install -g surge
surge wordpress-export.html your-domain.surge.sh
```

#### Traditional Web Hosting
- Upload `index.html` to your hosting provider's public folder
- Access via your domain

## 🔧 React App Deployment (More Features)

### 1. GitHub + Netlify (Recommended)
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/gallagher-art-school.git
git push -u origin main

# 2. Connect to Netlify
# - Go to netlify.com
# - Click "New site from Git"
# - Select your repository
# - Build command: npm run build
# - Publish directory: dist
```

### 2. Vercel Deployment
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# Follow prompts - it will auto-detect React and deploy
```

### 3. GitHub Pages
```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Deploy
npm run deploy

# 3. Enable GitHub Pages in your repository settings
```

## 🔗 Custom Domain Setup

### For Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records at your domain provider

### For Vercel:
1. Go to Project settings → Domains
2. Add your domain
3. Configure DNS

## 📧 Form Handling Options

### Option 1: Static Form (No Backend)
The HTML version includes JavaScript that logs form data. You can modify it to:
- Send emails via EmailJS
- Submit to Google Sheets
- Use Formspree for form handling

### Option 2: Add Backend
- Connect to Supabase for user management
- Use Firebase Authentication
- Integrate with your existing WordPress site

## 🎨 Customization

### Colors & Branding:
Edit the CSS variables in the HTML file or `styles/globals.css`:
```css
:root {
  --primary: #your-brand-color;
  --background: #your-background;
}
```

### Images:
Replace the Unsplash URLs with your own images:
```javascript
const slides = [
  {
    image: "your-image-url.jpg",
    title: "Your Title",
    subtitle: "Your Subtitle"
  }
];
```

## 📱 Testing

### Before Going Live:
1. Test on desktop and mobile
2. Verify all form fields work
3. Check image loading
4. Test social login buttons (if implementing)
5. Ensure responsive design works

### Analytics Setup:
Add Google Analytics to track signups:
```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 🆘 Troubleshooting

### Images Not Loading:
- Check image URLs are accessible
- Ensure HTTPS for all external images
- Consider hosting images locally

### Form Not Submitting:
- Check JavaScript console for errors
- Verify all required fields are filled
- Ensure form action is properly configured

### Mobile Issues:
- Test on actual devices
- Check viewport meta tag is present
- Verify touch interactions work

## 🎯 Next Steps After Deployment

1. **Set up form handling** (EmailJS, Formspree, or backend)
2. **Add Google Analytics** for tracking
3. **Configure email notifications** for new signups
4. **Set up SSL certificate** (most platforms do this automatically)
5. **Test everything thoroughly**
6. **Share your new website!**

Your Gallagher Art School signup flow is now ready to collect student enrollments! 🎨