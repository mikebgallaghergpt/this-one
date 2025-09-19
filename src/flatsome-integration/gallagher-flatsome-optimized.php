<?php
/**
 * Plugin Name: Gallagher Art School - Flatsome Optimized
 * Description: Beautiful art school signup form optimized for Flatsome theme
 * Version: 3.4.0
 * Author: Gallagher Art School
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class GallagherFlatsomeOptimized {
    
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_shortcode('gallagher_signup_form', array($this, 'signup_form_shortcode'));
        add_action('wp_ajax_gallagher_submit_signup', array($this, 'handle_signup_submission'));
        add_action('wp_ajax_nopriv_gallagher_submit_signup', array($this, 'handle_signup_submission'));
    }
    
    public function enqueue_assets() {
        if ($this->should_load_assets()) {
            wp_enqueue_style('gallagher-flatsome', plugin_dir_url(__FILE__) . 'gallagher-flatsome-styles.css', array(), '3.4.0');
            wp_enqueue_script('gallagher-flatsome', plugin_dir_url(__FILE__) . 'gallagher-flatsome-script.js', array('jquery'), '3.4.0', true);
            
            wp_localize_script('gallagher-flatsome', 'gallagherConfig', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('gallagher_signup_nonce'),
                'supabase_project_id' => get_option('gallagher_supabase_project_id', ''),
                'supabase_anon_key' => get_option('gallagher_supabase_anon_key', ''),
                'postmark_api_key' => get_option('gallagher_postmark_api_key', ''),
            ));
        }
    }
    
    private function should_load_assets() {
        global $post;
        
        if (is_admin()) return false;
        
        if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'gallagher_signup_form')) {
            return true;
        }
        
        return false;
    }
    
    public function signup_form_shortcode($atts) {
        $atts = shortcode_atts(array(
            'school_name' => 'Gallagher Art School',
            'tagline' => 'Expert instruction from an MFA Yale graduate',
            'background_image' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            'show_carousel' => 'true',
            'form_only' => 'false',
        ), $atts);
        
        ob_start();
        ?>
        <div class="gallagher-signup-wrapper" data-bg="<?php echo esc_url($atts['background_image']); ?>">
            <?php if ($atts['form_only'] !== 'true'): ?>
            <!-- Full Layout with Carousel -->
            <div class="gallagher-main-layout">
                <?php if ($atts['show_carousel'] === 'true'): ?>
                <!-- Left Panel - Enhanced Image Carousel -->
                <div class="gallagher-carousel-section">
                    <!-- Carousel Images Background -->
                    <div class="gallagher-carousel-images" id="gallagher-carousel-images">
                        <!-- Images will be set via JavaScript -->
                    </div>
                    
                    <!-- Carousel Navigation Controls -->
                    <div class="gallagher-carousel-controls">
                        <button class="gallagher-nav-btn gallagher-prev-btn" id="gallagher-prev-slide" aria-label="Previous slide">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15,18 9,12 15,6"/>
                            </svg>
                        </button>
                        <button class="gallagher-nav-btn gallagher-next-btn" id="gallagher-next-slide" aria-label="Next slide">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9,18 15,12 9,6"/>
                            </svg>
                        </button>
                        <button class="gallagher-play-pause-btn" id="gallagher-play-pause" aria-label="Play/Pause slideshow">
                            <svg class="gallagher-pause-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="6" y="4" width="4" height="16"/>
                                <rect x="14" y="4" width="4" height="16"/>
                            </svg>
                            <svg class="gallagher-play-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                                <polygon points="5,3 19,12 5,21"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Content Overlay -->
                    <div class="gallagher-carousel-content">
                        <h1 class="gallagher-school-title"><?php echo esc_html($atts['school_name']); ?></h1>
                        <p class="gallagher-school-tagline"><?php echo esc_html($atts['tagline']); ?></p>
                        
                        <div class="gallagher-slide-content" id="gallagher-slide-content">
                            <h2 class="gallagher-slide-title">Master the Art of Drawing</h2>
                            <p class="gallagher-slide-subtitle">From beginner sketches to advanced techniques</p>
                            <button class="gallagher-slide-cta" type="button">Start Your Journey</button>
                        </div>
                    </div>
                    
                    <!-- Slide Indicators -->
                    <div class="gallagher-carousel-dots">
                        <button class="gallagher-dot active" data-slide="0" aria-label="Slide 1"></button>
                        <button class="gallagher-dot" data-slide="1" aria-label="Slide 2"></button>
                        <button class="gallagher-dot" data-slide="2" aria-label="Slide 3"></button>
                        <button class="gallagher-dot" data-slide="3" aria-label="Slide 4"></button>
                        <button class="gallagher-dot" data-slide="4" aria-label="Slide 5"></button>
                        <button class="gallagher-dot" data-slide="5" aria-label="Slide 6"></button>
                        <button class="gallagher-dot" data-slide="6" aria-label="Slide 7"></button>
                    </div>
                    
                    <!-- Progress Bar -->
                    <div class="gallagher-carousel-progress">
                        <div class="gallagher-progress-bar-fill" id="gallagher-progress-bar"></div>
                    </div>
                </div>
                <?php endif; ?>
                
                <!-- Right Panel - Signup Form -->
                <div class="gallagher-form-section">
                    <?php $this->render_signup_form($atts); ?>
                </div>
            </div>
            <?php else: ?>
            <!-- Form Only Layout -->
            <div class="gallagher-form-only-layout">
                <?php $this->render_signup_form($atts); ?>
            </div>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }
    
    private function render_signup_form($atts) {
        ?>
        <div class="gallagher-signup-card">
            <!-- Progress Indicators -->
            <div class="gallagher-progress-steps">
                <div class="gallagher-step active" data-step="1">
                    <div class="gallagher-step-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                    </div>
                </div>
                <div class="gallagher-step-line"></div>
                <div class="gallagher-step" data-step="2">
                    <div class="gallagher-step-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                        </svg>
                    </div>
                </div>
                <div class="gallagher-step-line"></div>
                <div class="gallagher-step" data-step="3">
                    <div class="gallagher-step-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </div>
                </div>
            </div>
            
            <!-- Form Header -->
            <div class="gallagher-form-header">
                <h2 class="gallagher-form-title">Join <?php echo esc_html($atts['school_name']); ?></h2>
                <p class="gallagher-form-subtitle" id="gallagher-step-subtitle">Tell us about yourself</p>
            </div>
            
            <!-- Progress Bar -->
            <div class="gallagher-progress-bar">
                <div class="gallagher-progress-fill" style="width: 33.33%"></div>
            </div>
            
            <!-- Messages -->
            <div class="gallagher-message gallagher-error" id="gallagher-error-message" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <span></span>
            </div>
            
            <div class="gallagher-message gallagher-success" id="gallagher-success-message" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
                <span>Welcome to <?php echo esc_html($atts['school_name']); ?>! Check your email for confirmation.</span>
            </div>
            
            <!-- Signup Form -->
            <form id="gallagher-signup-form" class="gallagher-form">
                <!-- Step 1: Personal Info -->
                <div class="gallagher-form-step active" id="gallagher-step-1">
                    <!-- Social Login Buttons -->
                    <div class="gallagher-social-login">
                        <button type="button" class="gallagher-social-btn gallagher-google-btn" onclick="gallagherSocialLogin('google')">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>
                        <button type="button" class="gallagher-social-btn gallagher-apple-btn" onclick="gallagherSocialLogin('apple')">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            Continue with Apple
                        </button>
                    </div>
                    
                    <div class="gallagher-divider">
                        <span>Or continue with email</span>
                    </div>
                    
                    <div class="gallagher-form-row">
                        <div class="gallagher-form-group">
                            <label for="firstName">First Name *</label>
                            <input type="text" id="firstName" name="firstName" required>
                        </div>
                        <div class="gallagher-form-group">
                            <label for="lastName">Last Name *</label>
                            <input type="text" id="lastName" name="lastName" required>
                        </div>
                    </div>
                    
                    <div class="gallagher-form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    
                    <div class="gallagher-form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                </div>
                
                <!-- Step 2: Art Preferences -->
                <div class="gallagher-form-step" id="gallagher-step-2">
                    <div class="gallagher-form-group">
                        <label for="experience">Experience Level *</label>
                        <select id="experience" name="experience" required>
                            <option value="">Select your experience level</option>
                            <option value="beginner">Complete Beginner</option>
                            <option value="some">Some Experience</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="professional">Professional</option>
                        </select>
                    </div>
                    
                    <div class="gallagher-form-group">
                        <label>Areas of Interest (select all that apply)</label>
                        <div class="gallagher-interests-grid">
                            <?php 
                            $interests = array(
                                'drawing' => 'Drawing',
                                'painting' => 'Painting',
                                'digital' => 'Digital Art',
                                'sculpture' => 'Sculpture',
                                'mixed' => 'Mixed Media',
                                'color' => 'Color'
                            );
                            foreach ($interests as $value => $label): ?>
                            <label class="gallagher-checkbox">
                                <input type="checkbox" name="interests[]" value="<?php echo esc_attr($value); ?>">
                                <span class="gallagher-checkmark"></span>
                                <?php echo esc_html($label); ?>
                            </label>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    
                    <div class="gallagher-form-group">
                        <label for="hearAbout">How did you hear about us? *</label>
                        <select id="hearAbout" name="hearAbout" required>
                            <option value="">Please select</option>
                            <option value="google">Google Search</option>
                            <option value="social">Social Media</option>
                            <option value="flyer">Flyer/Postcard</option>
                            <option value="friend">Friend Referral</option>
                            <option value="school">School Referral</option>
                            <option value="event">Community Event</option>
                            <option value="gallery">Gallery/Museum</option>
                            <option value="returning">Returning Student</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="gallagher-form-group" id="gallagher-other-specify" style="display: none;">
                        <label for="hearAboutOther">Please specify *</label>
                        <input type="text" id="hearAboutOther" name="hearAboutOther">
                    </div>
                </div>
                
                <!-- Step 3: Account Creation -->
                <div class="gallagher-form-step" id="gallagher-step-3">
                    <div class="gallagher-form-group">
                        <label for="password">Create Password *</label>
                        <input type="password" id="password" name="password" required>
                        <small>Must be at least 6 characters</small>
                    </div>
                    
                    <div class="gallagher-form-group">
                        <label for="confirmPassword">Confirm Password *</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required>
                    </div>
                    
                    <label class="gallagher-checkbox">
                        <input type="checkbox" name="newsletter" value="1">
                        <span class="gallagher-checkmark"></span>
                        Send me updates about new classes and events
                    </label>
                    
                    <div class="gallagher-terms">
                        <small>By creating an account, you agree to our <a href="#" target="_blank">Terms of Service</a> and <a href="#" target="_blank">Privacy Policy</a>.</small>
                    </div>
                </div>
                
                <!-- Form Navigation -->
                <div class="gallagher-form-nav">
                    <button type="button" class="gallagher-btn gallagher-btn-back" id="gallagher-back-btn" style="display: none;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15,18 9,12 15,6"/>
                        </svg>
                        Back
                    </button>
                    <button type="button" class="gallagher-btn gallagher-btn-primary" id="gallagher-next-btn">
                        Next
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9,18 15,12 9,6"/>
                        </svg>
                    </button>
                </div>
                
                <div class="gallagher-form-footer">
                    Already have an account? <a href="#">Sign in here</a>
                </div>
            </form>
        </div>
        <?php
    }
    
    public function handle_signup_submission() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'gallagher_signup_nonce')) {
            wp_send_json_error('Security verification failed');
            return;
        }
        
        // Process the signup data
        $signup_data = array(
            'firstName' => sanitize_text_field($_POST['firstName']),
            'lastName' => sanitize_text_field($_POST['lastName']),
            'email' => sanitize_email($_POST['email']),
            'phone' => sanitize_text_field($_POST['phone']),
            'experience' => sanitize_text_field($_POST['experience']),
            'interests' => array_map('sanitize_text_field', $_POST['interests']),
            'hearAbout' => sanitize_text_field($_POST['hearAbout']),
            'hearAboutOther' => sanitize_text_field($_POST['hearAboutOther']),
            'password' => $_POST['password'], // Will be hashed by Supabase
            'newsletter' => !empty($_POST['newsletter']),
        );
        
        // Here you would integrate with Supabase to create the user
        // For now, return success
        wp_send_json_success(array(
            'message' => 'Signup successful!',
            'redirect' => home_url('/welcome')
        ));
    }
}

// Initialize the plugin
new GallagherFlatsomeOptimized();

// Admin settings
add_action('admin_menu', 'gallagher_flatsome_admin_menu');

function gallagher_flatsome_admin_menu() {
    add_options_page(
        'Gallagher Art School - Flatsome',
        'Art School - Flatsome',
        'manage_options',
        'gallagher-flatsome-settings',
        'gallagher_flatsome_settings_page'
    );
}

function gallagher_flatsome_settings_page() {
    if (isset($_POST['submit'])) {
        update_option('gallagher_supabase_project_id', sanitize_text_field($_POST['supabase_project_id']));
        update_option('gallagher_supabase_anon_key', sanitize_text_field($_POST['supabase_anon_key']));
        update_option('gallagher_postmark_api_key', sanitize_text_field($_POST['postmark_api_key']));
        echo '<div class="notice notice-success"><p>Settings saved successfully!</p></div>';
    }
    
    $project_id = get_option('gallagher_supabase_project_id', '');
    $anon_key = get_option('gallagher_supabase_anon_key', '');
    $postmark_key = get_option('gallagher_postmark_api_key', '');
    ?>
    <div class="wrap">
        <h1>Gallagher Art School - Flatsome Settings</h1>
        
        <form method="post" action="">
            <h2>Supabase Configuration</h2>
            <table class="form-table">
                <tr>
                    <th scope="row">Supabase Project ID</th>
                    <td>
                        <input type="text" name="supabase_project_id" value="<?php echo esc_attr($project_id); ?>" class="regular-text" />
                        <p class="description">Your Supabase project ID</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Supabase Anonymous Key</th>
                    <td>
                        <input type="text" name="supabase_anon_key" value="<?php echo esc_attr($anon_key); ?>" class="large-text" />
                        <p class="description">Your Supabase anonymous/public key</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Postmark API Key</th>
                    <td>
                        <input type="text" name="postmark_api_key" value="<?php echo esc_attr($postmark_key); ?>" class="large-text" />
                        <p class="description">Your Postmark API key for sending emails</p>
                    </td>
                </tr>
            </table>
            
            <?php submit_button(); ?>
        </form>
        
        <hr>
        
        <h2>Implementation Guide</h2>
        
        <h3>Basic Usage</h3>
        <p>Use this shortcode in any Flatsome page or section:</p>
        <code style="background: #f1f1f1; padding: 10px; display: block; margin: 10px 0;">[gallagher_signup_form]</code>
        
        <h3>Flatsome Integration Options</h3>
        
        <h4>Option 1: Full Section (Recommended)</h4>
        <p>Add a <strong>Row</strong> in UX Builder and use this shortcode in a <strong>Text Box</strong> element:</p>
        <code style="background: #f1f1f1; padding: 10px; display: block; margin: 10px 0;">[gallagher_signup_form]</code>
        
        <h4>Option 2: Form Only (for custom layouts)</h4>
        <p>If you want to create your own background/carousel, use:</p>
        <code style="background: #f1f1f1; padding: 10px; display: block; margin: 10px 0;">[gallagher_signup_form form_only="true"]</code>
        
        <h4>Option 3: No Carousel</h4>
        <p>Just the form with background, no carousel:</p>
        <code style="background: #f1f1f1; padding: 10px; display: block; margin: 10px 0;">[gallagher_signup_form show_carousel="false"]</code>
        
        <h3>Customization Parameters</h3>
        <ul>
            <li><code>school_name</code> - Change the school name (default: "Gallagher Art School")</li>
            <li><code>tagline</code> - Change the tagline (default: "Expert instruction from an MFA Yale graduate")</li>
            <li><code>background_image</code> - Custom background image URL</li>
            <li><code>show_carousel</code> - Show/hide carousel (true/false)</li>
            <li><code>form_only</code> - Show only the form without background (true/false)</li>
        </ul>
        
        <h3>Example with Custom Settings</h3>
        <code style="background: #f1f1f1; padding: 10px; display: block; margin: 10px 0;">[gallagher_signup_form school_name="My Art Studio" tagline="Creative excellence since 1995" background_image="https://your-custom-image.jpg"]</code>
        
        <h3>Flatsome Page Builder Tips</h3>
        <ul>
            <li><strong>Full Width:</strong> Set the Row to "Full Width" for best results</li>
            <li><strong>Remove Padding:</strong> Set Row padding to 0 for edge-to-edge design</li>
            <li><strong>Text Element:</strong> Use a Text element to add the shortcode</li>
            <li><strong>Background:</strong> You can disable the built-in background and use Flatsome's row background instead</li>
        </ul>
    </div>
    <?php
}
?>