# Gallagher Art School - Flatsome Implementation Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Install the Plugin
1. Upload the **gallagher-flatsome-optimized.php** file to your `/wp-content/plugins/gallagher-art-school/` directory
2. Upload **gallagher-flatsome-styles.css** and **gallagher-flatsome-script.js** to `/wp-content/plugins/gallagher-art-school/`
3. Activate the plugin in WordPress Admin → Plugins

### Step 2: Configure Settings
1. Go to **Settings → Art School - Flatsome** in WordPress Admin
2. Enter your Supabase credentials:
   - **Supabase Project ID**: Your project ID from Supabase dashboard
   - **Supabase Anonymous Key**: Your public key from Supabase dashboard  
   - **Postmark API Key**: Your Postmark key for sending emails
3. Save settings

### Step 3: Create Your Page in Flatsome
1. Create a new page or edit existing one
2. Open **UX Builder**
3. Add a **Row** element
4. Set Row to **Full Width** and **No Padding**
5. Add a **Text** element inside the row
6. Insert this shortcode in the Text element:
   ```
   [gallagher_signup_form]
   ```
7. **Save and Preview**

**You're done!** Your beautiful art school signup form is now live.

---

## 🎨 Customization Options

### Basic Shortcode Parameters

```php
[gallagher_signup_form school_name="My Art Studio" tagline="Creative excellence since 1995"]
```

**Available Parameters:**
- `school_name` - Your school name (default: "Gallagher Art School")
- `tagline` - Your tagline (default: "Expert instruction from an MFA Yale graduate")  
- `background_image` - Custom background image URL
- `show_carousel` - Show/hide carousel (true/false)
- `form_only` - Show only form without background (true/false)

### Layout Variations

**Option 1: Full Experience (Recommended)**
```php
[gallagher_signup_form]
```
- Complete layout with carousel and form
- Perfect for landing pages

**Option 2: Form Only**
```php
[gallagher_signup_form form_only="true"]
```
- Just the signup form
- Great for embedding in custom sections

**Option 3: No Carousel**
```php
[gallagher_signup_form show_carousel="false"]
```
- Background and form, no carousel
- Good for simpler layouts

---

## 🔧 Advanced Flatsome Integration

### Method 1: Full-Width Hero Section
1. **Add Row**: Set to Full Width, no padding
2. **Background**: Can use Flatsome's row background or plugin's built-in
3. **Text Element**: Add shortcode `[gallagher_signup_form]`

### Method 2: Custom Layout with Flatsome Elements
```php
[gallagher_signup_form form_only="true" show_carousel="false"]
```

Then create your own background using:
- Flatsome's **Background Video** or **Image** on the row
- Custom **Text Box** elements for marketing copy
- **Button** elements for additional CTAs

### Method 3: Multi-Section Page
```php
<!-- Hero Section -->
[gallagher_signup_form show_carousel="false"]

<!-- Features Section (using Flatsome elements) -->
[featured_box]

<!-- Testimonials Section -->
[testimonial_slider]
```

---

## 📱 Responsive Behavior

The form automatically adapts:
- **Desktop**: Side-by-side carousel and form
- **Tablet**: Stacked layout with compressed carousel  
- **Mobile**: Vertical stack, optimized form fields

### Mobile Optimization Tips
- Test on actual devices
- Ensure Flatsome's mobile settings don't conflict
- Consider using `form_only="true"` for mobile-first designs

---

## 🎯 Flatsome-Specific Styling Tips

### Removing Conflicts
The plugin automatically handles most Flatsome conflicts, but if needed:

```css
/* Custom CSS in Flatsome Theme Options */
.gallagher-signup-wrapper .button {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
    color: white !important;
}
```

### Matching Your Theme Colors
```css
/* Add to Flatsome Custom CSS */
.gallagher-btn-primary {
    background: var(--primary-color) !important;
}

.gallagher-progress-fill {
    background: var(--primary-color) !important;
}
```

### Typography Matching
```css
/* Match Flatsome fonts */
.gallagher-signup-card {
    font-family: var(--body-font) !important;
}

.gallagher-form-title {
    font-family: var(--heading-font) !important;
}
```

---

## 🔗 Integration with Flatsome Features

### Page Builder Compatibility
- ✅ Works in UX Builder
- ✅ Compatible with Flatsome sections
- ✅ Responsive preview works
- ✅ Can be combined with other Flatsome elements

### Theme Features
- ✅ Custom fonts from Flatsome
- ✅ Color schemes  
- ✅ Mobile breakpoints
- ✅ Page loading animations

### E-commerce Integration
If you have WooCommerce, you can link successful signups:
```php
// Add to functions.php
add_action('gallagher_signup_success', function($user_data) {
    // Create WooCommerce customer
    // Add to specific user roles
    // Trigger welcome emails
});
```

---

## 🚨 Troubleshooting

### Form Not Showing
1. Check if plugin is activated
2. Verify shortcode spelling: `[gallagher_signup_form]`
3. Ensure you're using a Text element in UX Builder

### Styling Issues
1. Clear all caches (Flatsome + any cache plugins)
2. Check for CSS conflicts in browser inspector
3. Try adding `!important` to custom styles

### Mobile Display Problems
1. Test in Flatsome's mobile preview
2. Check if row padding is set to 0
3. Verify responsive settings in UX Builder

### Background Not Showing
1. Check if image URL is accessible
2. Try using Flatsome's row background instead
3. Verify CSS isn't being overridden

### JavaScript Errors
1. Check browser console for errors
2. Ensure jQuery is loaded
3. Verify no conflicts with other plugins

---

## 💡 Pro Tips

### Performance Optimization
- The CSS/JS only loads on pages with the shortcode
- Use a CDN for your background images
- Optimize images (WebP format recommended)

### SEO Best Practices
- Add proper page titles and meta descriptions
- Use schema markup for your art school
- Optimize images with alt tags

### Conversion Optimization
- A/B test different taglines using the `tagline` parameter
- Try different background images
- Test form-only vs full layout versions

### Backup Strategy
- Always backup before plugin updates
- Test on staging site first
- Keep screenshots of your working version

---

## 📞 Support

### Common Questions

**Q: Can I use this with other page builders?**
A: It's optimized for Flatsome but should work with any page builder that supports shortcodes.

**Q: How do I customize the carousel slides?**
A: The slides are defined in the JavaScript. You can modify the `slides` array in `gallagher-flatsome-script.js`.

**Q: Can I add more form fields?**
A: Yes, modify the PHP file to add fields, then update the JavaScript validation accordingly.

**Q: How do I style it to match my brand?**
A: Use Flatsome's Custom CSS section to override colors, fonts, and spacing.

### Getting Help
1. Check browser console for JavaScript errors
2. Verify all files uploaded correctly
3. Test with default Flatsome theme first
4. Check WordPress error logs

---

## 🎉 Next Steps

Once your form is live:

1. **Test thoroughly** on all devices
2. **Monitor signups** in your Supabase dashboard  
3. **Customize styling** to match your brand
4. **Add tracking** (Google Analytics, Facebook Pixel)
5. **Set up email automation** with your email service

Your art school signup form is now ready to convert visitors into students! 🎨

---

*Need help? The form is designed to work out-of-the-box with Flatsome, but every site is unique. Test thoroughly and adjust as needed for your specific setup.*