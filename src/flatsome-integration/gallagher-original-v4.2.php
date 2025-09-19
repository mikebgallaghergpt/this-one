<?php
/**
 * Plugin Name: Gallagher Art School Signup Form - Original Layout v4.2.0
 * Plugin URI: https://gallagherartschool.com
 * Description: Complete signup form for Gallagher Art School with original compact layout, multi-step form, social login, image carousel, and Supabase backend integration. Version 4.2.0 restores the original design to match Figma screenshots exactly.
 * Version: 4.2.0
 * Author: Gallagher Art School
 * Author URI: https://gallagherartschool.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('GALLAGHER_ORIGINAL_VERSION', '4.2.0');
define('GALLAGHER_ORIGINAL_PLUGIN_URL', plugin_dir_url(__FILE__));
define('GALLAGHER_ORIGINAL_PLUGIN_PATH', plugin_dir_path(__FILE__));

class GallagherArtSchoolOriginal {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('gallagher_signup_form', array($this, 'signup_form_shortcode'));
        add_shortcode('gallagher_signup_original', array($this, 'signup_form_shortcode')); // Alternative shortcode
        
        // AJAX handlers
        add_action('wp_ajax_gallagher_submit_form', array($this, 'handle_form_submission'));
        add_action('wp_ajax_nopriv_gallagher_submit_form', array($this, 'handle_form_submission'));
        
        // Admin menu
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Settings
        add_action('admin_init', array($this, 'admin_init'));
    }
    
    public function init() {
        // Plugin initialization
        load_plugin_textdomain('gallagher-art-school', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function enqueue_scripts() {
        // Only load on pages with the shortcode or if force load is enabled
        global $post;
        if ((is_a($post, 'WP_Post') && (has_shortcode($post->post_content, 'gallagher_signup_form') || has_shortcode($post->post_content, 'gallagher_signup_original'))) || 
            get_option('gallagher_force_load_assets', false)) {
            
            // Enqueue CSS
            wp_enqueue_style(
                'gallagher-original-styles',
                GALLAGHER_ORIGINAL_PLUGIN_URL . 'gallagher-original-v4.2.css',
                array(),
                GALLAGHER_ORIGINAL_VERSION
            );
            
            // Enqueue JavaScript
            wp_enqueue_script(
                'gallagher-original-script',
                GALLAGHER_ORIGINAL_PLUGIN_URL . 'gallagher-original-v4.2.js',
                array('jquery'),
                GALLAGHER_ORIGINAL_VERSION,
                true
            );
            
            // Localize script with AJAX URL and nonce
            wp_localize_script('gallagher-original-script', 'gallagher_ajax', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('gallagher_nonce'),
                'supabase_project_id' => get_option('gallagher_supabase_project_id', ''),
                'supabase_anon_key' => get_option('gallagher_supabase_anon_key', ''),
                'demo_mode' => get_option('gallagher_demo_mode', true),
                'version' => GALLAGHER_ORIGINAL_VERSION
            ));
        }
    }
    
    public function signup_form_shortcode($atts) {
        $atts = shortcode_atts(array(
            'style' => 'original', // original, minimal, compact
            'show_carousel' => 'true',
            'show_social_login' => 'true',
            'theme' => 'default', // default, dark, light
            'container_class' => '',
        ), $atts, 'gallagher_signup_form');
        
        // Start output buffering
        ob_start();
        
        // Get plugin settings
        $demo_mode = get_option('gallagher_demo_mode', true);
        $project_id = get_option('gallagher_supabase_project_id', '');
        $anon_key = get_option('gallagher_supabase_anon_key', '');
        
        // Container classes
        $container_classes = 'gallagher-signup-container ' . $atts['container_class'];
        if ($atts['theme'] !== 'default') {
            $container_classes .= ' gallagher-theme-' . $atts['theme'];
        }
        ?>
        
        <!-- Gallagher Art School Signup Form v4.2.0 - Original Layout -->
        <div class="<?php echo esc_attr($container_classes); ?>" id="gallagher-signup-<?php echo uniqid(); ?>">
            
            <?php if ($demo_mode && empty($project_id)): ?>
            <!-- Demo Mode Banner -->
            <div class="gallagher-demo-banner">
                <div class="gallagher-alert gallagher-alert-info">
                    <span class="gallagher-alert-icon">ℹ️</span>
                    <div class="gallagher-alert-content">
                        <strong>Demo Mode</strong> - Configure your Supabase credentials in the plugin settings for full functionality.
                        <a href="<?php echo admin_url('admin.php?page=gallagher-settings'); ?>" class="gallagher-alert-link">Settings</a>
                    </div>
                </div>
            </div>
            <?php endif; ?>
            
            <?php if ($atts['show_carousel'] === 'true'): ?>
            <!-- Left Panel - Image Carousel -->
            <div class="gallagher-carousel-section">
                <div class="gallagher-image-carousel" id="gallagher-carousel">
                    <!-- Carousel slides will be loaded by JavaScript -->
                    <div class="gallagher-carousel-loading">
                        <div class="gallagher-spinner"></div>
                        <p>Loading gallery...</p>
                    </div>
                </div>
                
                <!-- Carousel Content Overlay -->
                <div class="gallagher-carousel-overlay">
                    <div class="gallagher-carousel-content">
                        <h1 class="gallagher-carousel-title">Gallagher Art School</h1>
                        <p class="gallagher-carousel-subtitle">Expert instruction from an MFA Yale graduate</p>
                        <div class="gallagher-carousel-slide-content">
                            <h2 class="gallagher-slide-title">Master the Art of Drawing</h2>
                            <p class="gallagher-slide-description">From beginner sketches to advanced techniques</p>
                        </div>
                    </div>
                    
                    <!-- Carousel Controls -->
                    <div class="gallagher-carousel-controls">
                        <button class="gallagher-carousel-btn gallagher-carousel-prev" aria-label="Previous slide">‹</button>
                        <button class="gallagher-carousel-btn gallagher-carousel-next" aria-label="Next slide">›</button>
                        <button class="gallagher-carousel-btn gallagher-carousel-play-pause" aria-label="Play/Pause">⏸️</button>
                    </div>
                    
                    <!-- Carousel Indicators -->
                    <div class="gallagher-carousel-indicators">
                        <!-- Indicators will be populated by JavaScript -->
                    </div>
                    
                    <!-- Progress Bar -->
                    <div class="gallagher-carousel-progress">
                        <div class="gallagher-carousel-progress-bar"></div>
                    </div>
                </div>
            </div>
            <?php endif; ?>
            
            <!-- Right Panel - Signup Form (Original Layout) -->
            <div class="gallagher-form-section">
                <div class="gallagher-original-card">
                    
                    <!-- Form Header -->
                    <div class="gallagher-form-header">
                        <!-- Progress Icons -->
                        <div class="gallagher-progress-icons">
                            <div class="gallagher-progress-step">
                                <div class="gallagher-progress-icon active" data-step="personal">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>
                                <div class="gallagher-progress-line"></div>
                            </div>
                            <div class="gallagher-progress-step">
                                <div class="gallagher-progress-icon inactive" data-step="preferences">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                </div>
                                <div class="gallagher-progress-line"></div>
                            </div>
                            <div class="gallagher-progress-step">
                                <div class="gallagher-progress-icon inactive" data-step="account">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <h2 class="gallagher-form-title">Join Gallagher Art School</h2>
                        <p class="gallagher-form-description">Tell us about yourself</p>
                        
                        <!-- Progress Bar -->
                        <div class="gallagher-progress-bar">
                            <div class="gallagher-progress-fill" style="width: 33.33%;"></div>
                        </div>
                    </div>
                    
                    <!-- Error/Success Messages -->
                    <div class="gallagher-messages" style="display: none;">
                        <div class="gallagher-alert gallagher-alert-error" style="display: none;">
                            <span class="gallagher-alert-icon">⚠️</span>
                            <span class="gallagher-error-message"></span>
                        </div>
                        <div class="gallagher-alert gallagher-alert-success" style="display: none;">
                            <span class="gallagher-alert-icon">✅</span>
                            <span class="gallagher-success-message"></span>
                        </div>
                    </div>
                    
                    <!-- Signup Form -->
                    <form id="gallagher-signup-form" class="gallagher-form">
                        
                        <?php if ($atts['show_social_login'] === 'true'): ?>
                        <!-- Social Login Section (Step 1 only) -->
                        <div class="gallagher-social-section" data-step="personal">
                            <button type="button" class="gallagher-social-btn gallagher-google-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span>Google</span>
                            </button>
                            
                            <button type="button" class="gallagher-social-btn gallagher-apple-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                                <span>Apple</span>
                            </button>
                            
                            <div class="gallagher-separator">
                                <span class="gallagher-separator-text">Or continue with email</span>
                            </div>
                        </div>
                        <?php endif; ?>
                        
                        <!-- Step 1: Personal Information -->
                        <div class="gallagher-form-step" data-step="personal">
                            <div class="gallagher-form-grid two-columns">
                                <div class="gallagher-form-group">
                                    <label for="firstName" class="gallagher-form-label">First Name *</label>
                                    <input type="text" id="firstName" name="firstName" required class="gallagher-form-input" placeholder="John">
                                </div>
                                <div class="gallagher-form-group">
                                    <label for="lastName" class="gallagher-form-label">Last Name *</label>
                                    <input type="text" id="lastName" name="lastName" required class="gallagher-form-input" placeholder="Doe">
                                </div>
                            </div>
                            <div class="gallagher-form-group">
                                <label for="email" class="gallagher-form-label">Email *</label>
                                <input type="email" id="email" name="email" required class="gallagher-form-input" placeholder="john@example.com">
                            </div>
                            <div class="gallagher-form-group">
                                <label for="phone" class="gallagher-form-label">Phone Number</label>
                                <input type="tel" id="phone" name="phone" class="gallagher-form-input" placeholder="(555) 123-4567">
                            </div>
                            <div class="gallagher-form-group">
                                <label for="birthDate" class="gallagher-form-label">Birth Date</label>
                                <input type="date" id="birthDate" name="birthDate" class="gallagher-form-input">
                            </div>
                        </div>
                        
                        <!-- Step 2: Art Preferences -->
                        <div class="gallagher-form-step" data-step="preferences" style="display: none;">
                            <div class="gallagher-form-group">
                                <label for="experience" class="gallagher-form-label">Art Experience Level *</label>
                                <div class="gallagher-custom-select">
                                    <select id="experience" name="experience" required>
                                        <option value="" disabled selected>Select your experience level</option>
                                        <option value="beginner">Complete Beginner</option>
                                        <option value="some">Some Experience</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                        <option value="professional">Professional</option>
                                    </select>
                                    <span class="gallagher-select-chevron">▼</span>
                                </div>
                            </div>
                            
                            <div class="gallagher-form-group">
                                <label for="hearAboutUs" class="gallagher-form-label">How did you hear about us? *</label>
                                <div class="gallagher-custom-select">
                                    <select id="hearAboutUs" name="hearAboutUs" required>
                                        <option value="" disabled selected>Select how you heard about us</option>
                                        <option value="google">Google Search</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="friend">Friend/Family</option>
                                        <option value="flyer">Flyer/Advertisement</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <span class="gallagher-select-chevron">▼</span>
                                </div>
                            </div>
                            
                            <div class="gallagher-form-group" id="hearAboutUsOtherGroup" style="display: none;">
                                <label for="hearAboutUsOther" class="gallagher-form-label">Please specify</label>
                                <input type="text" id="hearAboutUsOther" name="hearAboutUsOther" class="gallagher-form-input" placeholder="How did you hear about us?">
                            </div>
                            
                            <div class="gallagher-form-group">
                                <label class="gallagher-form-label">Areas of Interest (select all that apply)</label>
                                <div class="gallagher-interests-grid">
                                    <label class="gallagher-original-checkbox">
                                        <input type="checkbox" name="interests[]" value="Drawing">
                                        <div class="gallagher-checkbox-box">
                                            <span class="gallagher-checkbox-check">✓</span>
                                        </div>
                                        <span>Drawing</span>
                                    </label>
                                    <label class="gallagher-original-checkbox">
                                        <input type="checkbox" name="interests[]" value="Painting">
                                        <div class="gallagher-checkbox-box">
                                            <span class="gallagher-checkbox-check">✓</span>
                                        </div>
                                        <span>Painting</span>
                                    </label>
                                    <label class="gallagher-original-checkbox">
                                        <input type="checkbox" name="interests[]" value="Digital Art">
                                        <div class="gallagher-checkbox-box">
                                            <span class="gallagher-checkbox-check">✓</span>
                                        </div>
                                        <span>Digital Art</span>
                                    </label>
                                    <label class="gallagher-original-checkbox">
                                        <input type="checkbox" name="interests[]" value="Sculpture">
                                        <div class="gallagher-checkbox-box">
                                            <span class="gallagher-checkbox-check">✓</span>
                                        </div>
                                        <span>Sculpture</span>
                                    </label>
                                    <label class="gallagher-original-checkbox">
                                        <input type="checkbox" name="interests[]" value="Mixed Media">
                                        <div class="gallagher-checkbox-box">
                                            <span class="gallagher-checkbox-check">✓</span>
                                        </div>
                                        <span>Mixed Media</span>
                                    </label>
                                    <label class="gallagher-original-checkbox">
                                        <input type="checkbox" name="interests[]" value="Color Theory">
                                        <div class="gallagher-checkbox-box">
                                            <span class="gallagher-checkbox-check">✓</span>
                                        </div>
                                        <span>Color Theory</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Step 3: Create Account -->
                        <div class="gallagher-form-step" data-step="account" style="display: none;">
                            <div class="gallagher-form-group">
                                <label for="password" class="gallagher-form-label">Password *</label>
                                <input type="password" id="password" name="password" required class="gallagher-form-input" placeholder="Enter your password">
                            </div>
                            
                            <div class="gallagher-form-group">
                                <label for="confirmPassword" class="gallagher-form-label">Confirm Password *</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required class="gallagher-form-input" placeholder="Confirm your password">
                            </div>
                            
                            <div class="gallagher-form-group">
                                <label class="gallagher-original-checkbox">
                                    <input type="checkbox" name="newsletter" value="1">
                                    <div class="gallagher-checkbox-box">
                                        <span class="gallagher-checkbox-check">✓</span>
                                    </div>
                                    <span>Subscribe to our newsletter for art tips and class updates</span>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Navigation Buttons -->
                        <div class="gallagher-form-navigation">
                            <button type="button" class="gallagher-btn gallagher-btn-outline" id="gallagher-prev-btn" style="display: none;">
                                <span>‹</span>
                                <span>Back</span>
                            </button>
                            
                            <button type="button" class="gallagher-btn gallagher-btn-primary" id="gallagher-next-btn">
                                <span>Next</span>
                                <span>›</span>
                            </button>
                            
                            <button type="submit" class="gallagher-btn gallagher-btn-primary" id="gallagher-submit-btn" style="display: none;">
                                <span>Create Account</span>
                                <span>✓</span>
                            </button>
                        </div>
                        
                        <!-- Loading State -->
                        <div class="gallagher-form-loading" style="display: none;">
                            <div class="gallagher-spinner"></div>
                            <span>Creating your account...</span>
                        </div>
                        
                    </form>
                    
                    <!-- Sign in link -->
                    <div class="gallagher-signin-link">
                        <p>Already have an account? <button type="button" class="gallagher-link-btn">Sign in</button></p>
                    </div>
                    
                </div>
            </div>
            
        </div>
        
        <!-- Success Modal -->
        <div class="gallagher-modal" id="gallagher-success-modal" style="display: none;">
            <div class="gallagher-modal-content">
                <div class="gallagher-modal-header">
                    <h3>Welcome to Gallagher Art School!</h3>
                    <button type="button" class="gallagher-modal-close">×</button>
                </div>
                <div class="gallagher-modal-body">
                    <div class="gallagher-success-icon">✅</div>
                    <p>Your account has been created successfully.</p>
                    <div class="gallagher-modal-actions">
                        <button type="button" class="gallagher-btn gallagher-btn-primary" onclick="location.reload();">Continue</button>
                    </div>
                </div>
            </div>
        </div>
        
        <?php
        return ob_get_clean();
    }
    
    public function handle_form_submission() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'gallagher_nonce')) {
            wp_die('Security check failed');
        }
        
        // Get form data
        $firstName = sanitize_text_field($_POST['firstName']);
        $lastName = sanitize_text_field($_POST['lastName']);
        $email = sanitize_email($_POST['email']);
        $phone = sanitize_text_field($_POST['phone']);
        $birthDate = sanitize_text_field($_POST['birthDate']);
        $experience = sanitize_text_field($_POST['experience']);
        $interests = isset($_POST['interests']) ? array_map('sanitize_text_field', $_POST['interests']) : array();
        $hearAboutUs = sanitize_text_field($_POST['hearAboutUs']);
        $hearAboutUsOther = sanitize_text_field($_POST['hearAboutUsOther']);
        $newsletter = isset($_POST['newsletter']) ? true : false;
        
        // Demo mode - store in WordPress database
        $demo_mode = get_option('gallagher_demo_mode', true);
        $project_id = get_option('gallagher_supabase_project_id', '');
        
        if ($demo_mode || empty($project_id)) {
            // Store in WordPress database
            $user_data = array(
                'firstName' => $firstName,
                'lastName' => $lastName,
                'email' => $email,
                'phone' => $phone,
                'birthDate' => $birthDate,
                'experience' => $experience,
                'interests' => $interests,
                'hearAboutUs' => $hearAboutUs,
                'hearAboutUsOther' => $hearAboutUsOther,
                'newsletter' => $newsletter,
                'createdAt' => current_time('mysql'),
                'source' => 'wordpress_demo'
            );
            
            // Store user data
            $user_id = wp_insert_post(array(
                'post_type' => 'gallagher_student',
                'post_status' => 'publish',
                'post_title' => $firstName . ' ' . $lastName,
                'meta_input' => $user_data
            ));
            
            if ($user_id) {
                wp_send_json_success(array(
                    'message' => 'Account created successfully (Demo Mode)',
                    'userId' => $user_id,
                    'demoMode' => true
                ));
            } else {
                wp_send_json_error(array(
                    'message' => 'Failed to create account'
                ));
            }
        } else {
            // Forward to Supabase backend
            $supabase_url = 'https://' . $project_id . '.supabase.co/functions/v1/make-server-9c2430a9/signup';
            $anon_key = get_option('gallagher_supabase_anon_key', '');
            
            $response = wp_remote_post($supabase_url, array(
                'headers' => array(
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . $anon_key
                ),
                'body' => json_encode(array(
                    'firstName' => $firstName,
                    'lastName' => $lastName,
                    'email' => $email,
                    'phone' => $phone,
                    'birthDate' => $birthDate,
                    'experience' => $experience,
                    'interests' => $interests,
                    'hearAboutUs' => $hearAboutUs,
                    'hearAboutUsOther' => $hearAboutUsOther,
                    'newsletter' => $newsletter,
                    'source' => 'wordpress'
                )),
                'timeout' => 30
            ));
            
            if (is_wp_error($response)) {
                wp_send_json_error(array(
                    'message' => 'Failed to connect to backend: ' . $response->get_error_message()
                ));
            }
            
            $body = wp_remote_retrieve_body($response);
            $data = json_decode($body, true);
            
            if (wp_remote_retrieve_response_code($response) === 200) {
                wp_send_json_success($data);
            } else {
                wp_send_json_error(array(
                    'message' => isset($data['error']) ? $data['error'] : 'Unknown error occurred'
                ));
            }
        }
    }
    
    public function add_admin_menu() {
        add_options_page(
            'Gallagher Art School Settings',
            'Gallagher Art School',
            'manage_options',
            'gallagher-settings',
            array($this, 'admin_page')
        );
    }
    
    public function admin_init() {
        register_setting('gallagher_settings', 'gallagher_supabase_project_id');
        register_setting('gallagher_settings', 'gallagher_supabase_anon_key');
        register_setting('gallagher_settings', 'gallagher_demo_mode');
        register_setting('gallagher_settings', 'gallagher_force_load_assets');
        
        // Register custom post type for demo mode
        $this->register_student_post_type();
    }
    
    public function register_student_post_type() {
        register_post_type('gallagher_student', array(
            'labels' => array(
                'name' => 'Students',
                'singular_name' => 'Student'
            ),
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => 'options-general.php',
            'capability_type' => 'post',
            'supports' => array('title', 'custom-fields')
        ));
    }
    
    public function admin_page() {
        if (isset($_POST['submit'])) {
            update_option('gallagher_supabase_project_id', sanitize_text_field($_POST['supabase_project_id']));
            update_option('gallagher_supabase_anon_key', sanitize_text_field($_POST['supabase_anon_key']));
            update_option('gallagher_demo_mode', isset($_POST['demo_mode']));
            update_option('gallagher_force_load_assets', isset($_POST['force_load_assets']));
            echo '<div class="notice notice-success"><p>Settings saved successfully!</p></div>';
        }
        
        $project_id = get_option('gallagher_supabase_project_id', '');
        $anon_key = get_option('gallagher_supabase_anon_key', '');
        $demo_mode = get_option('gallagher_demo_mode', true);
        $force_load = get_option('gallagher_force_load_assets', false);
        ?>
        <div class="wrap">
            <h1>Gallagher Art School Settings</h1>
            <p><strong>Version:</strong> <?php echo GALLAGHER_ORIGINAL_VERSION; ?> (Original Layout)</p>
            
            <form method="post" action="">
                <table class="form-table">
                    <tr>
                        <th scope="row">Supabase Project ID</th>
                        <td>
                            <input type="text" name="supabase_project_id" value="<?php echo esc_attr($project_id); ?>" class="regular-text" />
                            <p class="description">Your Supabase project ID (leave empty for demo mode)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Supabase Anon Key</th>
                        <td>
                            <input type="text" name="supabase_anon_key" value="<?php echo esc_attr($anon_key); ?>" class="regular-text" />
                            <p class="description">Your Supabase anonymous key</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Demo Mode</th>
                        <td>
                            <label>
                                <input type="checkbox" name="demo_mode" <?php checked($demo_mode); ?> />
                                Enable demo mode (stores data locally in WordPress)
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Force Load Assets</th>
                        <td>
                            <label>
                                <input type="checkbox" name="force_load_assets" <?php checked($force_load); ?> />
                                Load CSS/JS on all pages (useful for dynamic content)
                            </label>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(); ?>
            </form>
            
            <h2>Usage</h2>
            <p>Use the shortcode <code>[gallagher_signup_form]</code> or <code>[gallagher_signup_original]</code> to display the signup form.</p>
            
            <h3>Shortcode Parameters:</h3>
            <ul>
                <li><code>show_carousel="true/false"</code> - Show/hide image carousel (default: true)</li>
                <li><code>show_social_login="true/false"</code> - Show/hide social login buttons (default: true)</li>
                <li><code>theme="default/dark/light"</code> - Color theme (default: default)</li>
                <li><code>container_class="custom-class"</code> - Add custom CSS classes</li>
            </ul>
            
            <h3>Examples:</h3>
            <p><code>[gallagher_signup_form show_carousel="false" theme="dark"]</code></p>
            <p><code>[gallagher_signup_original show_social_login="false" container_class="my-custom-class"]</code></p>
        </div>
        <?php
    }
}

// Initialize the plugin
new GallagherArtSchoolOriginal();