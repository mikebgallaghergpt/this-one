# 🎨 Gallagher Art School WordPress Plugin - Implementation Reference

## Project Overview
I'm implementing a WordPress plugin for an art school signup system that was originally built in React. The plugin needs to work with the Flatsome WordPress theme and integrate with Supabase for backend data storage.

## Current Project Structure
```
├── App.tsx (React main component)
├── components/
│   ├── AdminDashboard.tsx
│   ├── ImageCarousel.tsx 
│   ├── SignupForm.tsx
│   └── ui/ (shadcn components)
├── flatsome-integration/ (WordPress Plugin Files)
│   ├── gallagher-art-school-plugin.php
│   ├── assets/
│   │   ├── gallagher-script.js
│   │   └── gallagher-styles.css
│   └── FLATSOME_SETUP_INSTRUCTIONS.md
├── supabase/functions/server/ (Backend API)
└── styles/globals.css (Tailwind v4 styling)
```

## Key Features Implemented
- ✅ Multi-step signup form (Personal Info → Art Preferences → Account Creation)
- ✅ Auto-advancing image carousel showcasing art classes
- ✅ Admin dashboard for managing student enrollments  
- ✅ Supabase backend integration for data storage
- ✅ Mobile-responsive design optimized for Flatsome theme
- ✅ Social login options (Google/Apple)
- ✅ Newsletter subscription management
- ✅ CSV export functionality

## WordPress Plugin Structure Created
**Main Plugin File:** `gallagher-art-school-plugin.php`
- WordPress plugin header and initialization
- Shortcode: `[gallagher_signup]` for displaying the form
- Settings page for Supabase configuration
- Asset enqueueing (CSS/JS only loads when shortcode is present)

**CSS File:** `assets/gallagher-styles.css`
- Complete styling converted from Tailwind to vanilla CSS
- Flatsome theme compatibility
- Mobile-responsive breakpoints
- All form states and animations

**JavaScript File:** `assets/gallagher-script.js`
- Multi-step form functionality converted from React
- Carousel auto-advance logic
- Supabase API integration
- Admin dashboard functionality
- Form validation and submission

## Current React Components (for reference)

### App.tsx Structure:
```tsx
export default function App() {
  const [currentView, setCurrentView] = useState<'signup' | 'admin'>('signup');
  
  // Toggle between signup form and admin dashboard
  // Background image with overlay
  // Left panel: ImageCarousel
  // Right panel: SignupForm
  // Admin access button
}
```

### SignupForm Component Features:
- 3-step wizard: Personal Info → Preferences → Account
- Form validation with real-time feedback
- Social login buttons (Google/Apple)
- Progress indicators and step navigation
- Supabase user creation on submission

### ImageCarousel Component:
- Auto-advancing slides every 4 seconds
- 4 slides showcasing different art programs
- Smooth transitions and indicator dots
- Responsive design

### AdminDashboard Component:
- Student enrollment statistics
- Students grouped by art interest
- Newsletter subscriber management
- CSV export functionality
- Data fetching from Supabase API

## Supabase Backend Integration
- **Database:** Uses key-value store for flexibility
- **Authentication:** Custom signup endpoint creates users
- **API Endpoints:**
  - `/make-server-9c2430a9/signup` - Creates new student accounts
  - `/make-server-9c2430a9/students/by-interest/{interest}` - Gets students by art interest
  - `/make-server-9c2430a9/newsletter/subscribers` - Gets newsletter subscribers

## WordPress Plugin Implementation Challenges I Need Help With:

### 1. **Plugin Installation & Activation**
- Proper WordPress plugin structure and headers
- Asset enqueueing best practices
- Shortcode registration and output

### 2. **Flatsome Theme Integration**
- CSS conflicts and specificity issues
- Mobile responsiveness within Flatsome containers
- UX Builder compatibility

### 3. **JavaScript Functionality**
- Converting React state management to vanilla JS
- Form validation and multi-step navigation
- AJAX calls to Supabase from WordPress frontend

### 4. **Supabase Configuration**
- Securely storing API keys in WordPress
- Handling CORS issues
- Error handling and user feedback

### 5. **Admin Dashboard Integration**
- WordPress admin menu integration
- Settings page for Supabase credentials
- Admin-only functionality within the shortcode

## Plugin File Locations
```
flatsome-integration/
├── gallagher-art-school-plugin.php (Main plugin file)
├── assets/
│   ├── gallagher-script.js (JavaScript functionality)
│   └── gallagher-styles.css (CSS styling)
└── FLATSOME_SETUP_INSTRUCTIONS.md (Installation guide)
```

## Plugin Usage Examples:
```php
// Basic usage
[gallagher_signup]

// With custom parameters  
[gallagher_signup school_name="My Art Studio" tagline="Creative excellence since 1995" admin_button="false" background_image="https://example.com/custom-bg.jpg"]
```

## Current Design System (Tailwind v4)
- Base font size: 14px
- Color scheme: Purple/blue gradient background
- Responsive breakpoints for mobile/desktop
- Consistent spacing and typography
- Card-based layout with backdrop blur effects

## Specific Help Areas:
1. **WordPress plugin installation troubleshooting**
2. **Flatsome theme CSS conflicts resolution**
3. **JavaScript form validation optimization**
4. **Supabase API integration debugging**
5. **Mobile responsiveness improvements**
6. **Security best practices for API keys**
7. **Asset loading optimization**
8. **Cross-browser compatibility**

## Error Scenarios to Debug:
- Plugin activates but shortcode doesn't display
- CSS conflicts with Flatsome theme
- JavaScript errors in browser console
- Supabase API connection failures
- Form submission not working
- Admin dashboard not loading data
- Mobile layout breaking

The plugin is nearly complete but I need assistance with troubleshooting installation, theme integration, and optimization for production use.

---

**Additional Context:**
- Using WordPress with Flatsome theme
- Supabase project already configured
- Plugin files are ready to upload
- Need production-ready deployment guidance