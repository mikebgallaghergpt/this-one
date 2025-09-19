# 📝 SHORTCODE REFERENCE - VERSION 4.0.0

## **✅ SUPPORTED SHORTCODES**

### **Primary Shortcode (Backward Compatible):**
```php
[gallagher_signup_form]
```

### **New Shortcode (v4.0.0):**
```php
[gallagher_rectangular_signup]
```

**Both shortcodes work identically** - use whichever you prefer!

---

## **🎛️ SHORTCODE PARAMETERS**

### **Basic Usage:**
```php
[gallagher_signup_form]
```
Shows the full rectangular signup form with image carousel.

### **Form Only (No Carousel):**
```php
[gallagher_signup_form show_carousel="false"]
```
or
```php
[gallagher_signup_form form_only="true"]
```

### **Custom Width:**
```php
[gallagher_signup_form form_width="narrow"]
```

---

## **📋 PARAMETER REFERENCE**

| Parameter | Options | Default | Description |
|-----------|---------|---------|-------------|
| `show_carousel` | `true`, `false` | `true` | Shows/hides the left image carousel panel |
| `form_only` | `true`, `false` | `false` | Legacy parameter - same as `show_carousel="false"` |
| `carousel` | `true`, `false` | `true` | Legacy parameter - same as `show_carousel` |
| `form_width` | `full`, `narrow` | `full` | Controls the maximum width of the form |

---

## **🏗️ FLATSOME INTEGRATION EXAMPLES**

### **Option 1: Full Section (Recommended)**
1. Add a **Row** in UX Builder
2. Add a **Text Box** element
3. Insert the shortcode:
```php
[gallagher_signup_form]
```

### **Option 2: Form Only (Custom Layout)**
If you want to add your own background/carousel:
```php
[gallagher_signup_form form_only="true"]
```

### **Option 3: Narrow Form**
For smaller sections:
```php
[gallagher_signup_form form_width="narrow"]
```

---

## **📁 FILE LOCATIONS**

### **WordPress Plugin Files (v4.0.0):**
```
/wp-content/plugins/gallagher-art-school/
├── gallagher-rectangular-v4.php     (Main plugin file)
├── gallagher-rectangular-v4.css     (Styles)
└── gallagher-rectangular-v4.js      (JavaScript)
```

### **Required Files to Upload:**
- `gallagher-rectangular-v4.php`
- `gallagher-rectangular-v4.css` 
- `gallagher-rectangular-v4.js`

---

## **🔧 INSTALLATION STEPS**

1. **Upload Files:**
   ```
   Upload the 3 v4.0.0 files to:
   /wp-content/plugins/gallagher-art-school/
   ```

2. **Activate Plugin:**
   ```
   The plugin auto-activates when files are present
   ```

3. **Use Shortcode:**
   ```php
   [gallagher_signup_form]
   ```

4. **Clear Caches:**
   ```
   Clear all WordPress caches
   Hard refresh browser (Ctrl+F5)
   ```

---

## **🎯 VISUAL DIFFERENCES (v4.0.0)**

### **Before (Previous Versions):**
- ❌ Narrow, tall forms
- ❌ No dropdown chevrons  
- ❌ Broken checkboxes with duplicates
- ❌ Limited responsive design

### **After (v4.0.0):**
- ✅ Wide, rectangular forms
- ✅ Clear dropdown chevrons
- ✅ Working checkboxes (no duplicates)
- ✅ Perfect responsive design
- ✅ Better spacing and typography

---

## **🧪 TESTING CHECKLIST**

After installing v4.0.0, verify:

### **Layout:**
- [ ] Form appears wide and rectangular (not narrow)
- [ ] Two-column layout on desktop
- [ ] Single column layout on mobile

### **Functionality:**
- [ ] Dropdowns show chevron arrows
- [ ] Checkboxes work without duplicates
- [ ] Form validation works properly
- [ ] Mobile responsiveness

### **Shortcode:**
- [ ] `[gallagher_signup_form]` works
- [ ] `[gallagher_rectangular_signup]` works
- [ ] `form_only="true"` hides carousel
- [ ] All parameters function correctly

---

## **🐛 TROUBLESHOOTING**

### **Shortcode Not Working:**
1. Verify all 3 v4.0.0 files are uploaded
2. Check WordPress error logs
3. Deactivate conflicting plugins
4. Clear all caches

### **Old Layout Still Showing:**
1. **Hard refresh** with Ctrl+F5
2. Clear WordPress caches
3. Clear browser cache
4. Check if old plugin files are still active

### **Form Still Narrow:**
1. Verify v4.0.0 CSS is loading
2. Check for theme conflicts
3. Use browser dev tools to inspect CSS
4. Try `!important` declarations if needed

---

## **📞 QUICK SUPPORT**

### **Common Issues:**

**Q: Shortcode not rendering**  
**A:** Upload all 3 v4.0.0 files and clear caches

**Q: Form still looks old**  
**A:** Hard refresh (Ctrl+F5) and clear all caches  

**Q: Checkboxes duplicated**  
**A:** Ensure v4.0.0 files are actually loaded, not old versions

**Q: No dropdown chevrons**  
**A:** Check CSS is loading properly in browser dev tools

---

## **✅ SUCCESS INDICATORS**

You'll know v4.0.0 is working when:

✅ **Form is wide and rectangular**  
✅ **Dropdowns have clear chevron arrows**  
✅ **Checkboxes work properly (no duplicates)**  
✅ **Layout is responsive**  
✅ **All form validation works**

---

**The shortcode `[gallagher_signup_form]` is fully supported in v4.0.0 with complete backward compatibility!**