<?php
/**
 * Plugin Name: Gallagher Art School - Complete Single File v4.2
 * Description: Complete signup form with carousel - everything in one file, no dependencies
 * Version: 4.2.0
 * Author: Gallagher Art School
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class GallagherSingleFile {
    
    public function __construct() {
        add_shortcode('gallagher_signup_form', array($this, 'render_signup_form'));
        add_action('wp_ajax_gallagher_submit', array($this, 'handle_submission'));
        add_action('wp_ajax_nopriv_gallagher_submit', array($this, 'handle_submission'));
    }
    
    public function render_signup_form($atts) {
        $atts = shortcode_atts(array(
            'show_carousel' => 'true'
        ), $atts);
        
        ob_start();
        ?>
        
        <!-- Gallagher Art School Signup Form - Single File v4.2 -->
        <div id="gallagher-signup-container-<?php echo uniqid(); ?>" class="gallagher-container">
            
            <style>
            /* GALLAGHER ART SCHOOL - COMPLETE STYLES v4.2.0 */
            .gallagher-container {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            
            .gallagher-container *, 
            .gallagher-container *::before, 
            .gallagher-container *::after {
                box-sizing: border-box;
            }
            
            /* MAIN LAYOUT */
            .gallagher-main-layout {
                display: flex;
                min-height: 100vh;
                flex-direction: column;
            }
            
            @media (min-width: 1024px) {
                .gallagher-main-layout {
                    flex-direction: row;
                }
            }
            
            /* CAROUSEL SECTION */
            .gallagher-carousel-section {
                flex: 1;
                position: relative;
                min-height: 400px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                overflow: hidden;
            }
            
            @media (min-width: 1024px) {
                .gallagher-carousel-section {
                    min-height: 100vh;
                }
            }
            
            .gallagher-carousel-slides {
                position: absolute;
                inset: 0;
            }
            
            .gallagher-carousel-slide {
                position: absolute;
                inset: 0;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            
            .gallagher-carousel-slide.active {
                opacity: 1;
            }
            
            .gallagher-carousel-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 2rem;
                color: white;
                z-index: 10;
            }
            
            .gallagher-carousel-title {
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .gallagher-carousel-subtitle {
                font-size: 1.125rem;
                opacity: 0.9;
                margin-bottom: 2rem;
            }
            
            .gallagher-slide-title {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }
            
            .gallagher-slide-description {
                font-size: 1rem;
                opacity: 0.8;
                margin-bottom: 1.5rem;
            }
            
            /* CAROUSEL CONTROLS */
            .gallagher-carousel-controls {
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 0.5rem;
                z-index: 20;
            }
            
            .gallagher-carousel-btn {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 0.5rem;
                border-radius: 0.5rem;
                cursor: pointer;
                transition: all 0.2s;
                backdrop-filter: blur(10px);
            }
            
            .gallagher-carousel-btn:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .gallagher-carousel-indicators {
                position: absolute;
                bottom: 4rem;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 0.5rem;
                z-index: 20;
            }
            
            .gallagher-carousel-dot {
                width: 0.75rem;
                height: 0.75rem;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .gallagher-carousel-dot.active {
                background: white;
                transform: scale(1.2);
            }
            
            /* FORM SECTION */
            .gallagher-form-section {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
                background: #f8fafc;
                position: relative;
            }
            
            @media (min-width: 1024px) {
                .gallagher-form-section {
                    min-height: 100vh;
                }
            }
            
            .gallagher-form-card {
                background: white;
                border-radius: 1rem;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                padding: 2rem;
                width: 100%;
                max-width: 400px;
                position: relative;
            }
            
            /* PROGRESS ICONS */
            .gallagher-progress-container {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 2rem;
                gap: 1rem;
            }
            
            .gallagher-progress-step {
                display: flex;
                align-items: center;
                flex-direction: column;
                position: relative;
            }
            
            .gallagher-progress-icon {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #e5e7eb;
                background: #f9fafb;
                color: #9ca3af;
                transition: all 0.3s;
                margin-bottom: 0.5rem;
            }
            
            .gallagher-progress-icon.active {
                border-color: #3b82f6;
                background: #3b82f6;
                color: white;
            }
            
            .gallagher-progress-icon.completed {
                border-color: #10b981;
                background: #10b981;
                color: white;
            }
            
            .gallagher-progress-line {
                position: absolute;
                top: 1.5rem;
                left: 3rem;
                width: 2rem;
                height: 2px;
                background: #e5e7eb;
                transition: all 0.3s;
            }
            
            .gallagher-progress-step:last-child .gallagher-progress-line {
                display: none;
            }
            
            .gallagher-progress-line.completed {
                background: #10b981;
            }
            
            .gallagher-progress-label {
                font-size: 0.75rem;
                color: #6b7280;
                text-align: center;
            }
            
            /* FORM ELEMENTS */
            .gallagher-form-title {
                font-size: 1.5rem;
                font-weight: bold;
                text-align: center;
                margin-bottom: 0.5rem;
                color: #1f2937;
            }
            
            .gallagher-form-description {
                text-align: center;
                color: #6b7280;
                margin-bottom: 2rem;
            }
            
            .gallagher-form-step {
                display: none;
            }
            
            .gallagher-form-step.active {
                display: block;
            }
            
            .gallagher-form-group {
                margin-bottom: 1.5rem;
            }
            
            .gallagher-form-label {
                display: block;
                font-size: 0.875rem;
                font-weight: 500;
                color: #374151;
                margin-bottom: 0.5rem;
            }
            
            .gallagher-form-input,
            .gallagher-form-select {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #d1d5db;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                transition: all 0.2s;
                background: white;
            }
            
            .gallagher-form-input:focus,
            .gallagher-form-select:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
            
            .gallagher-form-input.error {
                border-color: #ef4444;
            }
            
            .gallagher-form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            /* SOCIAL BUTTONS */
            .gallagher-social-section {
                margin-bottom: 1.5rem;
            }
            
            .gallagher-social-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
            }
            
            .gallagher-social-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 0.75rem;
                border: 1px solid #d1d5db;
                border-radius: 0.5rem;
                background: white;
                color: #374151;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .gallagher-social-btn:hover {
                background: #f9fafb;
                border-color: #9ca3af;
            }
            
            .gallagher-separator {
                display: flex;
                align-items: center;
                text-align: center;
                margin: 1.5rem 0;
            }
            
            .gallagher-separator::before,
            .gallagher-separator::after {
                content: '';
                flex: 1;
                height: 1px;
                background: #e5e7eb;
            }
            
            .gallagher-separator-text {
                padding: 0 1rem;
                color: #6b7280;
                font-size: 0.875rem;
            }
            
            /* CHECKBOXES */
            .gallagher-interests-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.75rem;
            }
            
            .gallagher-checkbox-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem;
                border: 1px solid #e5e7eb;
                border-radius: 0.5rem;
                cursor: pointer;
                transition: all 0.2s;
                background: white;
            }
            
            .gallagher-checkbox-item:hover {
                border-color: #3b82f6;
                background: #f0f9ff;
            }
            
            .gallagher-checkbox-item.checked {
                border-color: #3b82f6;
                background: #eff6ff;
            }
            
            .gallagher-checkbox {
                width: 1rem;
                height: 1rem;
                border: 2px solid #d1d5db;
                border-radius: 0.25rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: transparent;
                transition: all 0.2s;
            }
            
            .gallagher-checkbox.checked {
                border-color: #3b82f6;
                background: #3b82f6;
                color: white;
            }
            
            .gallagher-checkbox-label {
                font-size: 0.875rem;
                color: #374151;
                font-weight: 500;
            }
            
            /* NAVIGATION BUTTONS */
            .gallagher-form-navigation {
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .gallagher-btn {
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                border: none;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .gallagher-btn-primary {
                background: #3b82f6;
                color: white;
            }
            
            .gallagher-btn-primary:hover {
                background: #2563eb;
            }
            
            .gallagher-btn-secondary {
                background: #f3f4f6;
                color: #374151;
                border: 1px solid #d1d5db;
            }
            
            .gallagher-btn-secondary:hover {
                background: #e5e7eb;
            }
            
            .gallagher-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            /* ALERTS */
            .gallagher-alert {
                padding: 0.75rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                display: none;
            }
            
            .gallagher-alert.show {
                display: block;
            }
            
            .gallagher-alert-error {
                background: #fef2f2;
                color: #dc2626;
                border: 1px solid #fecaca;
            }
            
            .gallagher-alert-success {
                background: #f0fdf4;
                color: #16a34a;
                border: 1px solid #bbf7d0;
            }
            
            /* LOADING STATE */
            .gallagher-loading {
                display: none;
                text-align: center;
                padding: 1rem;
            }
            
            .gallagher-loading.show {
                display: block;
            }
            
            .gallagher-spinner {
                width: 2rem;
                height: 2rem;
                border: 2px solid #e5e7eb;
                border-top: 2px solid #3b82f6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 0.5rem;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* RESPONSIVE */
            @media (max-width: 640px) {
                .gallagher-form-grid {
                    grid-template-columns: 1fr;
                }
                
                .gallagher-social-buttons {
                    grid-template-columns: 1fr;
                }
                
                .gallagher-interests-grid {
                    grid-template-columns: 1fr;
                }
                
                .gallagher-progress-container {
                    gap: 0.5rem;
                }
                
                .gallagher-progress-icon {
                    width: 2.5rem;
                    height: 2.5rem;
                }
                
                .gallagher-progress-line {
                    width: 1.5rem;
                    left: 2.5rem;
                    top: 1.25rem;
                }
            }
            </style>
            
            <?php if ($atts['show_carousel'] === 'true'): ?>
            <!-- CAROUSEL SECTION -->
            <div class="gallagher-carousel-section">
                <div class="gallagher-carousel-slides">
                    <div class="gallagher-carousel-slide active" style="background-image: url('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"></div>
                    <div class="gallagher-carousel-slide" style="background-image: url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"></div>
                    <div class="gallagher-carousel-slide" style="background-image: url('https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"></div>
                    <div class="gallagher-carousel-slide" style="background-image: url('https://images.unsplash.com/photo-1452457807411-4979b707c5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"></div>
                </div>
                
                <div class="gallagher-carousel-overlay">
                    <h1 class="gallagher-carousel-title">Gallagher Art School</h1>
                    <p class="gallagher-carousel-subtitle">Expert instruction from an MFA Yale graduate</p>
                    <div class="gallagher-slide-content">
                        <h2 class="gallagher-slide-title">Master the Art of Drawing</h2>
                        <p class="gallagher-slide-description">From beginner sketches to advanced techniques</p>
                    </div>
                </div>
                
                <div class="gallagher-carousel-controls">
                    <button class="gallagher-carousel-btn" onclick="gallagherPrevSlide()">‹</button>
                    <button class="gallagher-carousel-btn" onclick="gallagherTogglePlay()" id="play-pause-btn">⏸</button>
                    <button class="gallagher-carousel-btn" onclick="gallagherNextSlide()">›</button>
                </div>
                
                <div class="gallagher-carousel-indicators">
                    <div class="gallagher-carousel-dot active" onclick="gallagherGoToSlide(0)"></div>
                    <div class="gallagher-carousel-dot" onclick="gallagherGoToSlide(1)"></div>
                    <div class="gallagher-carousel-dot" onclick="gallagherGoToSlide(2)"></div>
                    <div class="gallagher-carousel-dot" onclick="gallagherGoToSlide(3)"></div>
                </div>
            </div>
            <?php endif; ?>
            
            <!-- FORM SECTION -->
            <div class="gallagher-form-section">
                <div class="gallagher-form-card">
                    
                    <!-- PROGRESS INDICATORS -->
                    <div class="gallagher-progress-container">
                        <div class="gallagher-progress-step">
                            <div class="gallagher-progress-icon active" data-step="1">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                            </div>
                            <div class="gallagher-progress-line"></div>
                            <div class="gallagher-progress-label">Personal</div>
                        </div>
                        <div class="gallagher-progress-step">
                            <div class="gallagher-progress-icon" data-step="2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l-3.09 4.26L2 9.27l5 4.87L5.82 21 12 17.77 18.18 21 17 14.14l5-4.87-6.91-3.01L12 2z"/>
                                </svg>
                            </div>
                            <div class="gallagher-progress-line"></div>
                            <div class="gallagher-progress-label">Interests</div>
                        </div>
                        <div class="gallagher-progress-step">
                            <div class="gallagher-progress-icon" data-step="3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                            </div>
                            <div class="gallagher-progress-label">Account</div>
                        </div>
                    </div>
                    
                    <h2 class="gallagher-form-title">Join Gallagher Art School</h2>
                    <p class="gallagher-form-description">Tell us about yourself</p>
                    
                    <!-- ALERTS -->
                    <div class="gallagher-alert gallagher-alert-error" id="error-alert"></div>
                    <div class="gallagher-alert gallagher-alert-success" id="success-alert"></div>
                    
                    <!-- FORM -->
                    <form id="gallagher-signup-form">
                        
                        <!-- STEP 1: PERSONAL INFO -->
                        <div class="gallagher-form-step active" data-step="1">
                            
                            <!-- SOCIAL BUTTONS -->
                            <div class="gallagher-social-section">
                                <div class="gallagher-social-buttons">
                                    <button type="button" class="gallagher-social-btn" onclick="gallagherSocialLogin('google')">
                                        <svg width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                        Google
                                    </button>
                                    <button type="button" class="gallagher-social-btn" onclick="gallagherSocialLogin('apple')">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                        </svg>
                                        Apple
                                    </button>
                                </div>
                                
                                <div class="gallagher-separator">
                                    <span class="gallagher-separator-text">Or continue with email</span>
                                </div>
                            </div>
                            
                            <div class="gallagher-form-grid">
                                <div class="gallagher-form-group">
                                    <label class="gallagher-form-label">First Name *</label>
                                    <input type="text" name="firstName" class="gallagher-form-input" required placeholder="John">
                                </div>
                                <div class="gallagher-form-group">
                                    <label class="gallagher-form-label">Last Name *</label>
                                    <input type="text" name="lastName" class="gallagher-form-input" required placeholder="Doe">
                                </div>
                            </div>
                            
                            <div class="gallagher-form-group">
                                <label class="gallagher-form-label">Email *</label>
                                <input type="email" name="email" class="gallagher-form-input" required placeholder="john@example.com">
                            </div>
                            
                            <div class="gallagher-form-group">
                                <label class="gallagher-form-label">Phone Number</label>
                                <input type="tel" name="phone" class="gallagher-form-input" placeholder="(555) 123-4567">
                            </div>
                        </div>
                        
                        <!-- STEP 2: INTERESTS -->
                        <div class="gallagher-form-step" data-step="2">
                            <div class="gallagher-form-group">
                                <label class="gallagher-form-label">Experience Level *</label>
                                <select name="experience" class="gallagher-form-select" required>
                                    <option value="">Select your experience level</option>
                                    <option value="beginner">Complete Beginner</option>
                                    <option value="some">Some Experience</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                    <option value="professional">Professional</option>
                                </select>
                            </div>
                            
                            <div class="gallagher-form-group">
                                <label class="gallagher-form-label">How did you hear about us? *</label>
                                <select name="hearAboutUs" class="gallagher-form-select" required onchange="gallagherToggleOther(this)">
                                    <option value="">Select how you heard about us</option>
                                    <option value="google">Google Search</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="friend">Friend/Family</option>
                                    <option value="flyer">Flyer/Advertisement</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div class="gallagher-form-group" id="other-specify" style="display: none;">
                                <label class="gallagher-form-label">Please specify</label>
                                <input type="text" name="hearAboutUsOther" class="gallagher-form-input" placeholder="How did you hear about us?">
                            </div>
                            
                            <div class="gallagher-form-group">
                                <label class="gallagher-form-label">Areas of Interest (select all that apply)</label>
                                <div class="gallagher-interests-grid">
                                    <div class="gallagher-checkbox-item" onclick="gallagherToggleCheckbox(this, 'Drawing')">
                                        <div class="gallagher-checkbox">✓</div>
                                        <span class="gallagher-checkbox-label">Drawing</span>
                                    </div>
                                    <div class="gallagher-checkbox-item" onclick="gallagherToggleCheckbox(this, 'Painting')">
                                        <div class="gallagher-checkbox">✓</div>
                                        <span class="gallagher-checkbox-label">Painting</span>
                                    </div>
                                    <div class="gallagher-checkbox-item" onclick="gallagherToggleCheckbox(this, 'Digital Art')">
                                        <div class="gallagher-checkbox">✓</div>
                                        <span class="gallagher-checkbox-label">Digital Art</span>
                                    </div>
                                    <div class="gallagher-checkbox-item" onclick="gallagherToggleCheckbox(this, 'Sculpture')">
                                        <div class="gallagher-checkbox">✓</div>
                                        <span class="gallagher-checkbox-label">Sculpture</span>
                                    </div>
                                    <div class="gallagher-checkbox-item" onclick="gallagherToggleCheckbox(this, 'Mixed Media')">
                                        <div class="gallagher-checkbox">✓</div>
                                        <span class="gallagher-checkbox-label">Mixed Media</span>
                                    </div>
                                    <div class="gallagher-checkbox-item" onclick="gallagherToggleCheckbox(this, 'Color Theory')">
                                        <div class="gallagher-checkbox">✓</div>
                                        <span class="gallagher-checkbox-label">Color Theory</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- STEP 3: ACCOUNT -->
                        <div class="gallagher-form-step" data-step="3">
                            <div class="gallagher-form-group">
                                <label class="gallagher-form-label">Password *</label>
                                <input type="password" name="password" class="gallagher-form-input" required placeholder="Enter your password">
                            </div>
                            
                            <div class="gallagher-form-group">
                                <label class="gallagher-form-label">Confirm Password *</label>
                                <input type="password" name="confirmPassword" class="gallagher-form-input" required placeholder="Confirm your password">
                            </div>
                            
                            <div class="gallagher-form-group">
                                <div class="gallagher-checkbox-item" onclick="gallagherToggleCheckbox(this, 'newsletter')">
                                    <div class="gallagher-checkbox">✓</div>
                                    <span class="gallagher-checkbox-label">Subscribe to our newsletter for art tips and class updates</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- NAVIGATION BUTTONS -->
                        <div class="gallagher-form-navigation">
                            <button type="button" class="gallagher-btn gallagher-btn-secondary" id="prev-btn" onclick="gallagherPrevStep()" style="display: none;">
                                ‹ Back
                            </button>
                            <button type="button" class="gallagher-btn gallagher-btn-primary" id="next-btn" onclick="gallagherNextStep()">
                                Next ›
                            </button>
                            <button type="submit" class="gallagher-btn gallagher-btn-primary" id="submit-btn" style="display: none;">
                                Create Account ✓
                            </button>
                        </div>
                        
                        <!-- LOADING STATE -->
                        <div class="gallagher-loading" id="loading-state">
                            <div class="gallagher-spinner"></div>
                            <p>Creating your account...</p>
                        </div>
                        
                    </form>
                </div>
            </div>
            
        </div>
        
        <script>
        // GALLAGHER ART SCHOOL - COMPLETE JAVASCRIPT v4.2.0
        
        // GLOBAL STATE
        let gallagherState = {
            currentStep: 1,
            totalSteps: 3,
            currentSlide: 0,
            totalSlides: 4,
            autoPlay: true,
            selectedInterests: [],
            isSubmitting: false
        };
        
        let gallagherCarouselInterval;
        
        // CAROUSEL DATA
        const gallagherSlides = [
            {
                title: "Master the Art of Drawing",
                description: "From beginner sketches to advanced techniques"
            },
            {
                title: "Explore Vibrant Painting", 
                description: "Watercolors, oils, and mixed media"
            },
            {
                title: "Digital Art & Design",
                description: "Modern techniques for the digital age"
            },
            {
                title: "Sculpture & 3D Art",
                description: "Shape your imagination into reality"
            }
        ];
        
        // INITIALIZATION
        document.addEventListener('DOMContentLoaded', function() {
            gallagherInitializeCarousel();
            gallagherUpdateProgress();
            gallagherBindFormEvents();
        });
        
        // CAROUSEL FUNCTIONS
        function gallagherInitializeCarousel() {
            gallagherStartAutoPlay();
        }
        
        function gallagherStartAutoPlay() {
            if (gallagherCarouselInterval) {
                clearInterval(gallagherCarouselInterval);
            }
            
            if (gallagherState.autoPlay) {
                gallagherCarouselInterval = setInterval(gallagherNextSlide, 4000);
            }
        }
        
        function gallagherNextSlide() {
            gallagherState.currentSlide = (gallagherState.currentSlide + 1) % gallagherState.totalSlides;
            gallagherUpdateCarousel();
        }
        
        function gallagherPrevSlide() {
            gallagherState.currentSlide = gallagherState.currentSlide === 0 ? gallagherState.totalSlides - 1 : gallagherState.currentSlide - 1;
            gallagherUpdateCarousel();
        }
        
        function gallagherGoToSlide(index) {
            gallagherState.currentSlide = index;
            gallagherUpdateCarousel();
            gallagherStartAutoPlay();
        }
        
        function gallagherTogglePlay() {
            gallagherState.autoPlay = !gallagherState.autoPlay;
            const btn = document.getElementById('play-pause-btn');
            
            if (gallagherState.autoPlay) {
                btn.textContent = '⏸';
                gallagherStartAutoPlay();
            } else {
                btn.textContent = '▶';
                clearInterval(gallagherCarouselInterval);
            }
        }
        
        function gallagherUpdateCarousel() {
            // Update slides
            const slides = document.querySelectorAll('.gallagher-carousel-slide');
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === gallagherState.currentSlide);
            });
            
            // Update indicators
            const dots = document.querySelectorAll('.gallagher-carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === gallagherState.currentSlide);
            });
            
            // Update content
            const slideData = gallagherSlides[gallagherState.currentSlide];
            const titleEl = document.querySelector('.gallagher-slide-title');
            const descEl = document.querySelector('.gallagher-slide-description');
            
            if (titleEl && descEl && slideData) {
                titleEl.textContent = slideData.title;
                descEl.textContent = slideData.description;
            }
        }
        
        // FORM FUNCTIONS
        function gallagherBindFormEvents() {
            const form = document.getElementById('gallagher-signup-form');
            if (form) {
                form.addEventListener('submit', gallagherSubmitForm);
            }
        }
        
        function gallagherNextStep() {
            if (gallagherValidateCurrentStep()) {
                if (gallagherState.currentStep < gallagherState.totalSteps) {
                    gallagherState.currentStep++;
                    gallagherUpdateStep();
                    gallagherUpdateProgress();
                }
            }
        }
        
        function gallagherPrevStep() {
            if (gallagherState.currentStep > 1) {
                gallagherState.currentStep--;
                gallagherUpdateStep();
                gallagherUpdateProgress();
            }
        }
        
        function gallagherUpdateStep() {
            // Hide all steps
            const steps = document.querySelectorAll('.gallagher-form-step');
            steps.forEach(step => {
                step.classList.remove('active');
            });
            
            // Show current step
            const currentStep = document.querySelector('.gallagher-form-step[data-step="' + gallagherState.currentStep + '"]');
            if (currentStep) {
                currentStep.classList.add('active');
            }
            
            // Update navigation buttons
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const submitBtn = document.getElementById('submit-btn');
            
            if (prevBtn) {
                prevBtn.style.display = gallagherState.currentStep === 1 ? 'none' : 'block';
            }
            
            if (gallagherState.currentStep === gallagherState.totalSteps) {
                if (nextBtn) nextBtn.style.display = 'none';
                if (submitBtn) submitBtn.style.display = 'block';
            } else {
                if (nextBtn) nextBtn.style.display = 'block';
                if (submitBtn) submitBtn.style.display = 'none';
            }
            
            // Update form description
            const descriptions = ['Tell us about yourself', 'What interests you?', 'Set up your login'];
            const descEl = document.querySelector('.gallagher-form-description');
            if (descEl) {
                descEl.textContent = descriptions[gallagherState.currentStep - 1] || '';
            }
        }
        
        function gallagherUpdateProgress() {
            // Update progress icons
            const icons = document.querySelectorAll('.gallagher-progress-icon');
            const lines = document.querySelectorAll('.gallagher-progress-line');
            
            icons.forEach((icon, index) => {
                const step = index + 1;
                icon.classList.remove('active', 'completed');
                
                if (step < gallagherState.currentStep) {
                    icon.classList.add('completed');
                } else if (step === gallagherState.currentStep) {
                    icon.classList.add('active');
                }
            });
            
            lines.forEach((line, index) => {
                const step = index + 1;
                line.classList.toggle('completed', step < gallagherState.currentStep);
            });
        }
        
        function gallagherValidateCurrentStep() {
            gallagherClearAlert();
            
            const currentStepEl = document.querySelector('.gallagher-form-step[data-step="' + gallagherState.currentStep + '"]');
            if (!currentStepEl) return false;
            
            // Get required fields in current step
            const requiredFields = currentStepEl.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Step-specific validation
            if (gallagherState.currentStep === 3) {
                const password = currentStepEl.querySelector('input[name="password"]');
                const confirmPassword = currentStepEl.querySelector('input[name="confirmPassword"]');
                
                if (password && confirmPassword) {
                    if (password.value !== confirmPassword.value) {
                        gallagherShowAlert('Passwords do not match', 'error');
                        return false;
                    }
                    
                    if (password.value.length < 6) {
                        gallagherShowAlert('Password must be at least 6 characters long', 'error');
                        return false;
                    }
                }
            }
            
            if (!isValid) {
                gallagherShowAlert('Please fill in all required fields', 'error');
            }
            
            return isValid;
        }
        
        function gallagherToggleOther(select) {
            const otherGroup = document.getElementById('other-specify');
            if (otherGroup) {
                otherGroup.style.display = select.value === 'other' ? 'block' : 'none';
            }
        }
        
        function gallagherToggleCheckbox(element, value) {
            const checkbox = element.querySelector('.gallagher-checkbox');
            const isChecked = element.classList.contains('checked');
            
            if (isChecked) {
                element.classList.remove('checked');
                checkbox.classList.remove('checked');
                const index = gallagherState.selectedInterests.indexOf(value);
                if (index > -1) {
                    gallagherState.selectedInterests.splice(index, 1);
                }
            } else {
                element.classList.add('checked');
                checkbox.classList.add('checked');
                if (!gallagherState.selectedInterests.includes(value)) {
                    gallagherState.selectedInterests.push(value);
                }
            }
        }
        
        function gallagherSocialLogin(provider) {
            alert(provider.charAt(0).toUpperCase() + provider.slice(1) + ' login requires additional setup in your Supabase dashboard.');
        }
        
        function gallagherSubmitForm(e) {
            e.preventDefault();
            
            if (gallagherState.isSubmitting) return;
            
            if (!gallagherValidateCurrentStep()) return;
            
            gallagherState.isSubmitting = true;
            
            // Show loading
            const loadingEl = document.getElementById('loading-state');
            if (loadingEl) loadingEl.classList.add('show');
            
            // Collect form data
            const formData = gallagherCollectFormData();
            
            // Submit via AJAX
            const data = new FormData();
            data.append('action', 'gallagher_submit');
            data.append('nonce', '<?php echo wp_create_nonce('gallagher_nonce'); ?>');
            
            Object.keys(formData).forEach(key => {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach(value => {
                        data.append(key + '[]', value);
                    });
                } else {
                    data.append(key, formData[key]);
                }
            });
            
            fetch('<?php echo admin_url('admin-ajax.php'); ?>', {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    gallagherShowAlert('Account created successfully! Welcome to Gallagher Art School.', 'success');
                    // Reset form after delay
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                } else {
                    gallagherShowAlert(result.data.message || 'Failed to create account. Please try again.', 'error');
                }
            })
            .catch(error => {
                gallagherShowAlert('Network error. Please check your connection and try again.', 'error');
            })
            .finally(() => {
                gallagherState.isSubmitting = false;
                if (loadingEl) loadingEl.classList.remove('show');
            });
        }
        
        function gallagherCollectFormData() {
            const data = {};
            
            // Basic form fields
            const inputs = document.querySelectorAll('#gallagher-signup-form input, #gallagher-signup-form select');
            inputs.forEach(input => {
                if (input.name && input.type !== 'checkbox') {
                    data[input.name] = input.value;
                }
            });
            
            // Interests
            data.interests = gallagherState.selectedInterests;
            
            // Newsletter checkbox
            const newsletterChecked = gallagherState.selectedInterests.includes('newsletter');
            data.newsletter = newsletterChecked;
            
            return data;
        }
        
        function gallagherShowAlert(message, type) {
            const alertEl = document.getElementById(type === 'error' ? 'error-alert' : 'success-alert');
            if (alertEl) {
                alertEl.textContent = message;
                alertEl.classList.add('show');
                
                // Auto hide after 5 seconds
                setTimeout(() => {
                    alertEl.classList.remove('show');
                }, 5000);
            }
        }
        
        function gallagherClearAlert() {
            const errorAlert = document.getElementById('error-alert');
            const successAlert = document.getElementById('success-alert');
            
            if (errorAlert) errorAlert.classList.remove('show');
            if (successAlert) successAlert.classList.remove('show');
        }
        </script>
        
        <?php
        return ob_get_clean();
    }
    
    public function handle_submission() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['nonce'], 'gallagher_nonce')) {
            wp_send_json_error(array('message' => 'Security check failed'));
        }
        
        // Collect and sanitize data
        $data = array(
            'firstName' => sanitize_text_field($_POST['firstName']),
            'lastName' => sanitize_text_field($_POST['lastName']),
            'email' => sanitize_email($_POST['email']),
            'phone' => sanitize_text_field($_POST['phone']),
            'experience' => sanitize_text_field($_POST['experience']),
            'hearAboutUs' => sanitize_text_field($_POST['hearAboutUs']),
            'hearAboutUsOther' => sanitize_text_field($_POST['hearAboutUsOther']),
            'password' => wp_hash_password($_POST['password']),
            'interests' => isset($_POST['interests']) ? array_map('sanitize_text_field', $_POST['interests']) : array(),
            'newsletter' => isset($_POST['newsletter']) ? true : false,
            'created_at' => current_time('mysql'),
            'source' => 'wordpress_single_file'
        );
        
        // Store in WordPress database
        $result = wp_insert_post(array(
            'post_type' => 'gallagher_student',
            'post_status' => 'publish',
            'post_title' => $data['firstName'] . ' ' . $data['lastName'],
            'meta_input' => $data
        ));
        
        if ($result) {
            wp_send_json_success(array(
                'message' => 'Account created successfully!',
                'student_id' => $result
            ));
        } else {
            wp_send_json_error(array('message' => 'Failed to create account'));
        }
    }
}

// Initialize the plugin
new GallagherSingleFile();