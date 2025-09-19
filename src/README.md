# Gallagher Art School - Signup Flow

A beautiful, responsive signup flow for art classes featuring:
- Auto-advancing image carousel
- Multi-step form with progress tracking
- Social authentication options (Google, Apple)
- Mobile-friendly responsive design
- Smooth animations and transitions

## 🚀 Quick Deploy Options

### Option 1: Use the Ready-Made HTML File
The `wordpress-export.html` file is a complete, standalone website that works immediately:

1. **Download** the `wordpress-export.html` file
2. **Upload** to any web hosting service:
   - [Netlify Drop](https://app.netlify.com/drop) - Just drag and drop the HTML file
   - [Surge.sh](https://surge.sh) - Simple command line deployment
   - Your hosting provider's file manager
3. **Done!** Your site is live

### Option 2: Deploy React App (More Advanced)

#### Deploy to Netlify (Recommended)
1. Push this code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy!

#### Deploy to Vercel
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Deploy automatically

#### Deploy to GitHub Pages
1. Push code to GitHub
2. Run: `npm run deploy`
3. Enable GitHub Pages in repository settings
4. Your site will be at: `https://yourusername.github.io/repository-name`

## 📁 What's Included

```
├── App.tsx                     # Main application component
├── components/
│   ├── ImageCarousel.tsx       # Auto-advancing image carousel
│   ├── SignupForm.tsx         # Multi-step signup form
│   └── ui/                    # Pre-built UI components
├── styles/globals.css         # Tailwind styling
├── wordpress-export.html      # Standalone HTML version
└── wordpress-php-integration.php  # WordPress integration
```

## 🎨 For WordPress Users

### Using with Flatsome Theme:
1. Copy the code from `wordpress-php-integration.php` into your theme's `functions.php`
2. Create a new page and use the shortcode: `[gallagher_signup_form]`
3. Customize colors in the CSS to match your theme

### Using the HTML Version:
1. Copy the HTML from `wordpress-export.html`
2. Create a new page template in WordPress
3. Paste the HTML code
4. Customize as needed

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Progressive Form**: 3-step signup with validation and progress tracking
- **Social Login**: Google and Apple authentication buttons
- **Art-Focused**: Tailored specifically for art school enrollment
- **Accessible**: Built with proper ARIA labels and keyboard navigation
- **Fast Loading**: Optimized images and smooth animations

## 🎯 Perfect For

- Art schools and studios
- Creative workshops
- Online course platforms
- Educational institutions
- Creative communities

## 📞 Need Help?

This signup form is ready to use immediately with the HTML file, or can be deployed as a React app for more advanced customization.

For WordPress integration, use the provided PHP code and shortcode system.