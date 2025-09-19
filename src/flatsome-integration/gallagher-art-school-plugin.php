<?php
/**
 * Plugin Name: Gallagher Art School Signup
 * Description: Beautiful multi-step signup form for art school with Supabase backend integration
 * Version: 2.0.0
 * Author: Gallagher Art School
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class GallagherArtSchoolPlugin {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_shortcode('gallagher_signup', array($this, 'signup_shortcode'));
        add_shortcode('gallagher_admin', array($this, 'admin_shortcode'));
        
        // AJAX handlers
        add_action('wp_ajax_gallagher_test_connection', array($this, 'test_supabase_connection'));
        add_action('wp_ajax_nopriv_gallagher_test_connection', array($this, 'test_supabase_connection'));
    }
    
    public function init() {
        // Plugin initialization
    }
    
    public function enqueue_assets() {
        if ($this->should_load_assets()) {
            // Main plugin CSS
            wp_enqueue_style(
                'gallagher-styles',
                plugin_dir_url(__FILE__) . 'assets/gallagher-styles.css',
                array(),
                '2.0.0'
            );
            
            // Main plugin JavaScript
            wp_enqueue_script(
                'gallagher-script',
                plugin_dir_url(__FILE__) . 'assets/gallagher-script.js',
                array('jquery'),
                '2.0.0',
                true
            );
            
            // Localize script for AJAX and Supabase config
            wp_localize_script('gallagher-script', 'gallagher_config', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('gallagher_nonce'),
                'supabase_project_id' => get_option('gallagher_supabase_project_id', ''),
                'supabase_anon_key' => get_option('gallagher_supabase_anon_key', ''),
            ));
        }
    }
    
    private function should_load_assets() {
        global $post;
        
        if (is_admin()) return false;
        
        // Load if shortcode is present
        if (is_a($post, 'WP_Post') && (
            has_shortcode($post->post_content, 'gallagher_signup') ||
            has_shortcode($post->post_content, 'gallagher_admin')
        )) {
            return true;
        }
        
        return false;
    }
    
    public function signup_shortcode($atts) {
        $atts = shortcode_atts(array(
            'admin_button' => 'true',
            'background_image' => 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            'school_name' => 'Gallagher Art School',
            'tagline' => 'Expert instruction from an MFA Yale graduate'
        ), $atts);
        
        ob_start();
        ?>
        <div class="gallagher-signup-container" data-background="<?php echo esc_url($atts['background_image']); ?>">
            <?php if ($atts['admin_button'] === 'true'): ?>
            <div class="gallagher-admin-button">
                <button class="gallagher-btn gallagher-btn-outline" onclick="gallagherShowAdmin()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Admin Dashboard
                </button>
            </div>
            <?php endif; ?>
            
            <div class="gallagher-main-content">
                <!-- Left Panel - Enhanced Image Carousel -->
                <div class="gallagher-carousel-panel">
                    <div class="gallagher-carousel-content">
                        <h1><?php echo esc_html($atts['school_name']); ?></h1>
                        <p class="gallagher-subtitle"><?php echo esc_html($atts['tagline']); ?></p>
                        <div class="gallagher-slide-content">
                            <h2 id="gallagher-slide-title">Master the Art of Drawing</h2>
                            <p id="gallagher-slide-subtitle">From beginner sketches to advanced techniques</p>
                            <button class="gallagher-slide-cta" id="gallagher-slide-cta">Start Drawing</button>
                        </div>
                    </div>
                    
                    <div class="gallagher-carousel-indicators">
                        <button class="gallagher-indicator active" data-slide="0" aria-label="Go to slide 1"></button>
                        <button class="gallagher-indicator" data-slide="1" aria-label="Go to slide 2"></button>
                        <button class="gallagher-indicator" data-slide="2" aria-label="Go to slide 3"></button>
                        <button class="gallagher-indicator" data-slide="3" aria-label="Go to slide 4"></button>
                    </div>
                </div>
                
                <!-- Right Panel - Signup Form -->
                <div class="gallagher-form-panel">
                    <div class="gallagher-signup-form">
                        <!-- Step Indicators -->
                        <div class="gallagher-step-indicators">
                            <div class="gallagher-step-indicator active" data-step="0">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                            </div>
                            <div class="gallagher-step-connector"></div>
                            <div class="gallagher-step-indicator" data-step="1">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="13.5" cy="6.5" r=".5"/>
                                    <circle cx="17.5" cy="10.5" r=".5"/>
                                    <circle cx="8.5" cy="7.5" r=".5"/>
                                    <circle cx="6.5" cy="12.5" r=".5"/>
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                                </svg>
                            </div>
                            <div class="gallagher-step-connector"></div>
                            <div class="gallagher-step-indicator" data-step="2">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                            </div>
                        </div>
                        
                        <div class="gallagher-form-header">
                            <h3>Join <?php echo esc_html($atts['school_name']); ?></h3>
                            <p id="gallagher-step-description">Tell us about yourself</p>
                        </div>
                        
                        <div class="gallagher-progress-bar">
                            <div class="gallagher-progress-fill" style="width: 33%"></div>
                        </div>
                        
                        <!-- Error/Success Messages -->
                        <div class="gallagher-alert gallagher-alert-error" id="gallagher-error" style="display: none;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="15" y1="9" x2="9" y2="15"/>
                                <line x1="9" y1="9" x2="15" y2="15"/>
                            </svg>
                            <span id="gallagher-error-text"></span>
                        </div>
                        
                        <div class="gallagher-alert gallagher-alert-success" id="gallagher-success" style="display: none;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22,4 12,14.01 9,11.01"/>
                            </svg>
                            <span>Account created successfully! Welcome to <?php echo esc_html($atts['school_name']); ?>!</span>
                        </div>
                        
                        <form id="gallagher-signup-form">
                            <!-- Step 1: Personal Info -->
                            <div class="gallagher-form-step" id="gallagher-step-1">
                                <!-- Social Login -->
                                <div class="gallagher-social-buttons">
                                    <button type="button" class="gallagher-social-btn" onclick="gallagherSocialLogin('google')">
                                        <svg width="20" height="20" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                        Google
                                    </button>
                                    <button type="button" class="gallagher-social-btn" onclick="gallagherSocialLogin('apple')">
                                        <svg width="20" height="20" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                        </svg>
                                        Apple
                                    </button>
                                </div>
                                
                                <div class="gallagher-divider">
                                    <span>Or continue with email</span>
                                </div>
                                
                                <div class="gallagher-form-row">
                                    <div class="gallagher-form-group">
                                        <label for="firstName">First Name *</label>
                                        <input type="text" id="firstName" name="firstName" placeholder="John" required>
                                    </div>
                                    <div class="gallagher-form-group">
                                        <label for="lastName">Last Name *</label>
                                        <input type="text" id="lastName" name="lastName" placeholder="Doe" required>
                                    </div>
                                </div>
                                
                                <div class="gallagher-form-group">
                                    <label for="email">Email *</label>
                                    <input type="email" id="email" name="email" placeholder="john@example.com" required>
                                </div>
                                
                                <div class="gallagher-form-group">
                                    <label for="phone">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567">
                                </div>
                                
                                <div class="gallagher-form-group">
                                    <label for="birthDate">Birth Date</label>
                                    <input type="date" id="birthDate" name="birthDate">
                                </div>
                            </div>
                            
                            <!-- Step 2: Art Preferences -->
                            <div class="gallagher-form-step gallagher-hidden" id="gallagher-step-2">
                                <div class="gallagher-form-group">
                                    <label for="experience">Art Experience Level *</label>
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
                                    <div class="gallagher-checkbox-grid">
                                        <?php 
                                        $interests = ['Drawing', 'Painting', 'Digital Art', 'Sculpture', 'Photography', 'Printmaking', 'Mixed Media', 'Ceramics'];
                                        foreach ($interests as $interest): ?>
                                        <div class="gallagher-checkbox-item">
                                            <input type="checkbox" id="interest-<?php echo strtolower($interest); ?>" name="interests" value="<?php echo esc_attr($interest); ?>">
                                            <label for="interest-<?php echo strtolower($interest); ?>"><?php echo esc_html($interest); ?></label>
                                        </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Step 3: Account Creation -->
                            <div class="gallagher-form-step gallagher-hidden" id="gallagher-step-3">
                                <div class="gallagher-form-group">
                                    <label for="password">Password *</label>
                                    <input type="password" id="password" name="password" placeholder="••••••••" required>
                                    <small>Must be at least 6 characters long</small>
                                </div>
                                
                                <div class="gallagher-form-group">
                                    <label for="confirmPassword">Confirm Password *</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••" required>
                                </div>
                                
                                <div class="gallagher-checkbox-item">
                                    <input type="checkbox" id="newsletter" name="newsletter">
                                    <label for="newsletter">I'd like to receive updates about new classes and events</label>
                                </div>
                                
                                <div class="gallagher-terms">
                                    <small>By creating an account, you agree to our Terms of Service and Privacy Policy.</small>
                                </div>
                            </div>
                            
                            <!-- Navigation -->
                            <div class="gallagher-form-navigation">
                                <button type="button" class="gallagher-btn gallagher-btn-secondary" id="gallagher-prev-btn" disabled>
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
                                Already have an account? <a href="#">Sign in</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <!-- Admin Dashboard (Hidden by default) -->
            <div class="gallagher-admin-dashboard gallagher-hidden" id="gallagher-admin-dashboard">
                <div class="gallagher-admin-header">
                    <button class="gallagher-btn gallagher-btn-outline" onclick="gallagherHideAdmin()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15,18 9,12 15,6"/>
                        </svg>
                        Back to Signup
                    </button>
                    <h2>Admin Dashboard</h2>
                    <button class="gallagher-btn gallagher-btn-primary" onclick="gallagherLoadAdminData()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23,4 23,10 17,10"/>
                            <polyline points="1,20 1,14 7,14"/>
                            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                        </svg>
                        Refresh Data
                    </button>
                </div>
                
                <div class="gallagher-admin-stats">
                    <div class="gallagher-stat-card">
                        <h4>Total Enrollments</h4>
                        <div class="gallagher-stat-number" id="gallagher-total-enrollments">0</div>
                        <small>Across all art programs</small>
                    </div>
                    <div class="gallagher-stat-card">
                        <h4>Unique Students</h4>
                        <div class="gallagher-stat-number" id="gallagher-unique-students">0</div>
                        <small>Individual student accounts</small>
                    </div>
                    <div class="gallagher-stat-card">
                        <h4>Newsletter Subscribers</h4>
                        <div class="gallagher-stat-number" id="gallagher-newsletter-count">0</div>
                        <small>Active email subscribers</small>
                    </div>
                </div>
                
                <div class="gallagher-admin-content">
                    <div class="gallagher-admin-tabs">
                        <button class="gallagher-tab-btn active" onclick="gallagherShowTab('interests')">Students by Interest</button>
                        <button class="gallagher-tab-btn" onclick="gallagherShowTab('newsletter')">Newsletter Subscribers</button>
                    </div>
                    
                    <div class="gallagher-tab-content active" id="gallagher-tab-interests">
                        <div class="gallagher-admin-section-header">
                            <h3>Students by Art Interest</h3>
                            <button class="gallagher-btn gallagher-btn-outline" onclick="gallagherExportCSV('students')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7,10 12,15 17,10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                Export CSV
                            </button>
                        </div>
                        <div class="gallagher-interests-grid" id="gallagher-interests-data">
                            <!-- Data will be loaded here -->
                        </div>
                    </div>
                    
                    <div class="gallagher-tab-content" id="gallagher-tab-newsletter">
                        <div class="gallagher-admin-section-header">
                            <h3>Newsletter Subscribers</h3>
                            <button class="gallagher-btn gallagher-btn-outline" onclick="gallagherExportCSV('newsletter')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7,10 12,15 17,10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                Export CSV
                            </button>
                        </div>
                        <div class="gallagher-newsletter-list" id="gallagher-newsletter-data">
                            <!-- Data will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function admin_shortcode($atts) {
        return '<div id="gallagher-admin-only">[gallagher_admin] - Admin dashboard only view</div>';
    }
    
    public function test_supabase_connection() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'gallagher_nonce')) {
            wp_die('Security check failed');
        }
        
        wp_send_json_success(array('message' => 'Connection test endpoint ready'));
    }
}

// Initialize the plugin
new GallagherArtSchoolPlugin();

// Add admin menu for plugin settings
add_action('admin_menu', 'gallagher_admin_menu');

function gallagher_admin_menu() {
    add_options_page(
        'Gallagher Art School Settings',
        'Art School Settings',
        'manage_options',
        'gallagher-settings',
        'gallagher_settings_page'
    );
}

function gallagher_settings_page() {
    if (isset($_POST['submit'])) {
        update_option('gallagher_supabase_project_id', sanitize_text_field($_POST['supabase_project_id']));
        update_option('gallagher_supabase_anon_key', sanitize_text_field($_POST['supabase_anon_key']));
        echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
    }
    
    $project_id = get_option('gallagher_supabase_project_id', '');
    $anon_key = get_option('gallagher_supabase_anon_key', '');
    ?>
    <div class="wrap">
        <h1>Gallagher Art School Settings</h1>
        <form method="post" action="">
            <table class="form-table">
                <tr>
                    <th scope="row">Supabase Project ID</th>
                    <td>
                        <input type="text" name="supabase_project_id" value="<?php echo esc_attr($project_id); ?>" class="regular-text" />
                        <p class="description">Your Supabase project ID (from your Supabase dashboard)</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Supabase Anonymous Key</th>
                    <td>
                        <input type="text" name="supabase_anon_key" value="<?php echo esc_attr($anon_key); ?>" class="large-text" />
                        <p class="description">Your Supabase anonymous/public key</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
        
        <h2>Usage Instructions</h2>
        <p>Use the shortcode <code>[gallagher_signup]</code> to display the signup form on any page.</p>
        
        <h3>Shortcode Parameters:</h3>
        <ul>
            <li><code>admin_button="true/false"</code> - Show/hide admin dashboard button (default: true)</li>
            <li><code>school_name="Your School Name"</code> - Customize the school name</li>
            <li><code>tagline="Your Tagline"</code> - Customize the tagline</li>
            <li><code>background_image="URL"</code> - Custom background image URL</li>
        </ul>
        
        <h3>Example:</h3>
        <code>[gallagher_signup school_name="My Art Studio" tagline="Creative excellence since 1995" admin_button="false"]</code>
    </div>
    <?php
}
?>