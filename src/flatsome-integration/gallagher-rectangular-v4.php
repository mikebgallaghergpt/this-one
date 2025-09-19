<?php
/*
Plugin Name: Gallagher Art School - Rectangular Signup v4.0.0
Description: Complete rebuild with rectangular layout, proper dropdowns with chevrons, and working checkboxes
Version: 4.0.0
Author: Gallagher Art School
*/

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class GallagherRectangularSignupV4 {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        // Support both old and new shortcode names for backward compatibility
        add_shortcode('gallagher_signup_form', array($this, 'render_signup_form'));
        add_shortcode('gallagher_rectangular_signup', array($this, 'render_signup_form'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_action('wp_ajax_gallagher_signup', array($this, 'handle_signup'));
        add_action('wp_ajax_nopriv_gallagher_signup', array($this, 'handle_signup'));
    }
    
    public function init() {
        // Plugin initialization
    }
    
    public function enqueue_assets() {
        $post_content = get_post()->post_content ?? '';
        if (is_page() || is_single() || 
            has_shortcode($post_content, 'gallagher_signup_form') || 
            has_shortcode($post_content, 'gallagher_rectangular_signup')) {
            
            wp_enqueue_style('gallagher-rectangular-v4', plugin_dir_url(__FILE__) . 'gallagher-rectangular-v4.css', array(), '4.0.0');
            wp_enqueue_script('gallagher-rectangular-v4', plugin_dir_url(__FILE__) . 'gallagher-rectangular-v4.js', array('jquery'), '4.0.0', true);
            
            wp_localize_script('gallagher-rectangular-v4', 'gallagher_config', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('gallagher_signup_nonce'),
                'supabase_project_id' => defined('GALLAGHER_SUPABASE_PROJECT_ID') ? GALLAGHER_SUPABASE_PROJECT_ID : '',
                'supabase_anon_key' => defined('GALLAGHER_SUPABASE_ANON_KEY') ? GALLAGHER_SUPABASE_ANON_KEY : ''
            ));
        }
    }
    
    public function render_signup_form($atts) {
        $atts = shortcode_atts(array(
            'show_carousel' => 'true',
            'form_width' => 'full',
            'form_only' => 'false',
            'carousel' => 'true',
        ), $atts);
        
        // Handle legacy attributes
        if ($atts['form_only'] === 'true') {
            $atts['show_carousel'] = 'false';
        }
        if ($atts['carousel'] === 'false') {
            $atts['show_carousel'] = 'false';
        }
        
        ob_start();
        ?>
        <div class="gallagher-rectangular-wrapper" data-version="4.0.0">
            <?php if ($atts['show_carousel'] === 'true'): ?>
            <div class="gallagher-rectangular-layout">
                <!-- Left Panel - Image Carousel -->
                <div class="gallagher-carousel-section">
                    <div class="gallagher-carousel-container">
                        <div class="gallagher-carousel-images" id="carousel-images">
                            <div class="gallagher-image-slide active" style="background-image: url('https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');"></div>
                            <div class="gallagher-image-slide" style="background-image: url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');"></div>
                            <div class="gallagher-image-slide" style="background-image: url('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');"></div>
                        </div>
                        
                        <div class="gallagher-carousel-content">
                            <div class="gallagher-school-info">
                                <h1 class="gallagher-school-title">Gallagher Art School</h1>
                                <p class="gallagher-school-tagline">Unleash Your Creative Potential</p>
                            </div>
                            
                            <div class="gallagher-slide-content" id="slide-content">
                                <div class="gallagher-slide active">
                                    <h2 class="gallagher-slide-title">Professional Art Classes</h2>
                                    <p class="gallagher-slide-subtitle">Learn from experienced instructors with MFA credentials from Yale</p>
                                </div>
                                <div class="gallagher-slide">
                                    <h2 class="gallagher-slide-title">All Skill Levels Welcome</h2>
                                    <p class="gallagher-slide-subtitle">From complete beginners to advanced artists looking to refine their technique</p>
                                </div>
                                <div class="gallagher-slide">
                                    <h2 class="gallagher-slide-title">Diverse Art Forms</h2>
                                    <p class="gallagher-slide-subtitle">Explore drawing, painting, digital art, sculpture, and mixed media</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="gallagher-carousel-progress">
                            <div class="gallagher-progress-bar-fill" id="progress-fill"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Panel - Rectangular Signup Form -->
                <div class="gallagher-form-section">
            <?php else: ?>
            <div class="gallagher-form-only-layout">
            <?php endif; ?>
                    
                    <div class="gallagher-rectangular-card">
                        <!-- Progress Steps -->
                        <div class="gallagher-progress-steps">
                            <div class="gallagher-step active" data-step="1">
                                <div class="gallagher-step-circle">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="gallagher-step-line"></div>
                            <div class="gallagher-step" data-step="2">
                                <div class="gallagher-step-circle">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="gallagher-step-line"></div>
                            <div class="gallagher-step" data-step="3">
                                <div class="gallagher-step-circle">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Form Header -->
                        <div class="gallagher-form-header">
                            <h2 class="gallagher-form-title">Join Gallagher Art School</h2>
                            <p class="gallagher-form-subtitle" id="step-description">Tell us about yourself</p>
                        </div>
                        
                        <!-- Progress Bar -->
                        <div class="gallagher-progress-bar">
                            <div class="gallagher-progress-fill" style="width: 33.33%"></div>
                        </div>
                        
                        <!-- Error/Success Messages -->
                        <div id="gallagher-messages"></div>
                        
                        <!-- Social Login (Step 1 only) -->
                        <div class="gallagher-social-login" id="social-login">
                            <button type="button" class="gallagher-social-btn gallagher-google-btn" onclick="gallagherSocialLogin('google')">
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>
                            
                            <button type="button" class="gallagher-social-btn gallagher-apple-btn" onclick="gallagherSocialLogin('apple')">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                                Continue with Apple
                            </button>
                            
                            <div class="gallagher-divider">
                                <span>Or continue with email</span>
                            </div>
                        </div>
                        
                        <!-- Main Form -->
                        <form id="gallagher-rectangular-form" class="gallagher-form">
                            <!-- Step 1: Personal Information -->
                            <div class="gallagher-form-step active" data-step="1">
                                <div class="gallagher-rectangular-grid">
                                    <div class="gallagher-form-column">
                                        <div class="gallagher-form-group">
                                            <label for="firstName">First Name *</label>
                                            <input type="text" id="firstName" name="firstName" required placeholder="John">
                                        </div>
                                        <div class="gallagher-form-group">
                                            <label for="email">Email Address *</label>
                                            <input type="email" id="email" name="email" required placeholder="john@example.com">
                                        </div>
                                    </div>
                                    <div class="gallagher-form-column">
                                        <div class="gallagher-form-group">
                                            <label for="lastName">Last Name *</label>
                                            <input type="text" id="lastName" name="lastName" required placeholder="Doe">
                                        </div>
                                        <div class="gallagher-form-group">
                                            <label for="phone">Phone Number</label>
                                            <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Step 2: Preferences -->
                            <div class="gallagher-form-step" data-step="2">
                                <div class="gallagher-rectangular-grid">
                                    <div class="gallagher-form-column">
                                        <div class="gallagher-form-group">
                                            <label for="experience">Experience Level *</label>
                                            <div class="gallagher-custom-select">
                                                <select id="experience" name="experience" required>
                                                    <option value="" disabled selected>Select your experience level</option>
                                                    <option value="beginner">Complete Beginner</option>
                                                    <option value="some">Some Experience</option>
                                                    <option value="intermediate">Intermediate</option>
                                                    <option value="advanced">Advanced</option>
                                                    <option value="professional">Professional</option>
                                                </select>
                                                <svg class="gallagher-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <polyline points="6,9 12,15 18,9"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        <div class="gallagher-form-group">
                                            <label for="hearAbout">How did you hear about us? *</label>
                                            <div class="gallagher-custom-select">
                                                <select id="hearAbout" name="hearAbout" required>
                                                    <option value="" disabled selected>Select how you heard about us</option>
                                                    <option value="google">Google Search</option>
                                                    <option value="facebook">Facebook</option>
                                                    <option value="instagram">Instagram</option>
                                                    <option value="friend">Friend/Family</option>
                                                    <option value="flyer">Flyer/Advertisement</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                <svg class="gallagher-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <polyline points="6,9 12,15 18,9"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        <div class="gallagher-form-group" id="other-specify" style="display: none;">
                                            <label for="hearAboutOther">Please specify</label>
                                            <input type="text" id="hearAboutOther" name="hearAboutOther" placeholder="How did you hear about us?">
                                        </div>
                                    </div>
                                    
                                    <div class="gallagher-form-column">
                                        <div class="gallagher-form-group">
                                            <label>Areas of Interest (select all that apply)</label>
                                            <div class="gallagher-rectangular-interests">
                                                <div class="gallagher-rectangular-checkbox">
                                                    <input type="checkbox" id="interest-drawing" name="interests[]" value="Drawing">
                                                    <div class="gallagher-checkbox-box">
                                                        <svg class="gallagher-checkbox-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                            <polyline points="20,6 9,17 4,12"></polyline>
                                                        </svg>
                                                    </div>
                                                    <label for="interest-drawing">Drawing</label>
                                                </div>
                                                
                                                <div class="gallagher-rectangular-checkbox">
                                                    <input type="checkbox" id="interest-painting" name="interests[]" value="Painting">
                                                    <div class="gallagher-checkbox-box">
                                                        <svg class="gallagher-checkbox-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                            <polyline points="20,6 9,17 4,12"></polyline>
                                                        </svg>
                                                    </div>
                                                    <label for="interest-painting">Painting</label>
                                                </div>
                                                
                                                <div class="gallagher-rectangular-checkbox">
                                                    <input type="checkbox" id="interest-digital" name="interests[]" value="Digital Art">
                                                    <div class="gallagher-checkbox-box">
                                                        <svg class="gallagher-checkbox-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                            <polyline points="20,6 9,17 4,12"></polyline>
                                                        </svg>
                                                    </div>
                                                    <label for="interest-digital">Digital Art</label>
                                                </div>
                                                
                                                <div class="gallagher-rectangular-checkbox">
                                                    <input type="checkbox" id="interest-sculpture" name="interests[]" value="Sculpture">
                                                    <div class="gallagher-checkbox-box">
                                                        <svg class="gallagher-checkbox-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                            <polyline points="20,6 9,17 4,12"></polyline>
                                                        </svg>
                                                    </div>
                                                    <label for="interest-sculpture">Sculpture</label>
                                                </div>
                                                
                                                <div class="gallagher-rectangular-checkbox">
                                                    <input type="checkbox" id="interest-mixed" name="interests[]" value="Mixed Media">
                                                    <div class="gallagher-checkbox-box">
                                                        <svg class="gallagher-checkbox-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                            <polyline points="20,6 9,17 4,12"></polyline>
                                                        </svg>
                                                    </div>
                                                    <label for="interest-mixed">Mixed Media</label>
                                                </div>
                                                
                                                <div class="gallagher-rectangular-checkbox">
                                                    <input type="checkbox" id="interest-color" name="interests[]" value="Color Theory">
                                                    <div class="gallagher-checkbox-box">
                                                        <svg class="gallagher-checkbox-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                            <polyline points="20,6 9,17 4,12"></polyline>
                                                        </svg>
                                                    </div>
                                                    <label for="interest-color">Color Theory</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Step 3: Account Setup -->
                            <div class="gallagher-form-step" data-step="3">
                                <div class="gallagher-rectangular-grid">
                                    <div class="gallagher-form-column">
                                        <div class="gallagher-form-group">
                                            <label for="password">Password *</label>
                                            <input type="password" id="password" name="password" required placeholder="Enter your password">
                                        </div>
                                        
                                        <div class="gallagher-form-group">
                                            <div class="gallagher-rectangular-checkbox">
                                                <input type="checkbox" id="newsletter" name="newsletter" value="1">
                                                <div class="gallagher-checkbox-box">
                                                    <svg class="gallagher-checkbox-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                        <polyline points="20,6 9,17 4,12"></polyline>
                                                    </svg>
                                                </div>
                                                <label for="newsletter">Subscribe to our newsletter for art tips and class updates</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="gallagher-form-column">
                                        <div class="gallagher-form-group">
                                            <label for="confirmPassword">Confirm Password *</label>
                                            <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirm your password">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Navigation Buttons -->
                            <div class="gallagher-form-nav">
                                <button type="button" class="gallagher-btn gallagher-btn-back" id="prev-btn" onclick="gallagherPrevStep()" style="display: none;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="15,18 9,12 15,6"></polyline>
                                    </svg>
                                    Back
                                </button>
                                
                                <button type="button" class="gallagher-btn gallagher-btn-primary" id="next-btn" onclick="gallagherNextStep()">
                                    Next
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="9,18 15,12 9,6"></polyline>
                                    </svg>
                                </button>
                                
                                <button type="submit" class="gallagher-btn gallagher-btn-primary" id="submit-btn" style="display: none;">
                                    <span id="submit-text">Create Account</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="submit-icon">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                                    </svg>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="loading-icon" style="display: none;" class="animate-spin">
                                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    
            <?php if ($atts['show_carousel'] === 'true'): ?>
                </div>
            </div>
            <?php else: ?>
            </div>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function handle_signup() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'gallagher_signup_nonce')) {
            wp_die('Security check failed');
        }
        
        // Handle form submission
        $response = array(
            'success' => true,
            'message' => 'Account created successfully!',
            'demo_mode' => true
        );
        
        wp_send_json($response);
    }
}

// Initialize the plugin
new GallagherRectangularSignupV4();