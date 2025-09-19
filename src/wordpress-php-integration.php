<?php
/**
 * Gallagher Art School Signup Integration for WordPress
 * 
 * Instructions for Flatsome Theme:
 * 1. Add this code to your theme's functions.php file
 * 2. Create a new page in WordPress and use the shortcode [gallagher_signup_form]
 * 3. The form will handle submissions via AJAX and store data in WordPress
 */

// Enqueue styles and scripts
function gallagher_enqueue_assets() {
    if (is_page() && has_shortcode(get_post()->post_content, 'gallagher_signup_form')) {
        wp_enqueue_script('gallagher-signup', get_template_directory_uri() . '/js/gallagher-signup.js', array('jquery'), '1.0.0', true);
        wp_localize_script('gallagher-signup', 'gallagher_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('gallagher_signup_nonce')
        ));
    }
}
add_action('wp_enqueue_scripts', 'gallagher_enqueue_assets');

// Create shortcode for the signup form
function gallagher_signup_form_shortcode() {
    ob_start();
    ?>
    <!-- Include the HTML content from wordpress-export.html here -->
    <!-- You can copy the entire HTML structure and modify as needed -->
    <div class="gallagher-signup-wrapper">
        <!-- Your HTML form goes here -->
    </div>
    
    <style>
        /* Include the CSS from wordpress-export.html here */
        /* You can customize colors to match your Flatsome theme */
        .gallagher-signup-wrapper {
            /* Your styles */
        }
    </style>
    
    <script>
        /* Include the JavaScript from wordpress-export.html here */
        /* Modify the handleFormSubmit function to use WordPress AJAX */
        function handleFormSubmit() {
            const formData = new FormData(document.getElementById('signup-form'));
            const interests = [];
            document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
                interests.push(checkbox.value);
            });

            // WordPress AJAX call
            jQuery.ajax({
                url: gallagher_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'gallagher_process_signup',
                    nonce: gallagher_ajax.nonce,
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    birthDate: formData.get('birthDate'),
                    experience: formData.get('experience'),
                    interests: interests,
                    newsletter: formData.get('newsletter')
                },
                success: function(response) {
                    if (response.success) {
                        alert('Account created successfully! Welcome to Gallagher Art School!');
                        // Redirect to success page or dashboard
                        window.location.href = '/welcome/';
                    } else {
                        alert('Error: ' + response.data.message);
                    }
                },
                error: function() {
                    alert('An error occurred. Please try again.');
                }
            });
        }
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('gallagher_signup_form', 'gallagher_signup_form_shortcode');

// Handle AJAX form submission
function gallagher_process_signup() {
    // Verify nonce
    if (!wp_verify_nonce($_POST['nonce'], 'gallagher_signup_nonce')) {
        wp_die('Security check failed');
    }

    // Sanitize input data
    $first_name = sanitize_text_field($_POST['firstName']);
    $last_name = sanitize_text_field($_POST['lastName']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    $birth_date = sanitize_text_field($_POST['birthDate']);
    $experience = sanitize_text_field($_POST['experience']);
    $interests = isset($_POST['interests']) ? array_map('sanitize_text_field', $_POST['interests']) : array();
    $newsletter = isset($_POST['newsletter']) ? 1 : 0;

    // Validate required fields
    if (empty($first_name) || empty($last_name) || empty($email)) {
        wp_send_json_error(array('message' => 'Please fill in all required fields.'));
    }

    // Check if email already exists
    if (email_exists($email)) {
        wp_send_json_error(array('message' => 'An account with this email already exists.'));
    }

    // Create WordPress user
    $user_data = array(
        'user_login' => $email,
        'user_email' => $email,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'display_name' => $first_name . ' ' . $last_name,
        'role' => 'subscriber'
    );

    $user_id = wp_insert_user($user_data);

    if (is_wp_error($user_id)) {
        wp_send_json_error(array('message' => 'Failed to create account. Please try again.'));
    }

    // Save additional user meta
    update_user_meta($user_id, 'phone', $phone);
    update_user_meta($user_id, 'birth_date', $birth_date);
    update_user_meta($user_id, 'art_experience', $experience);
    update_user_meta($user_id, 'art_interests', $interests);
    update_user_meta($user_id, 'newsletter_subscription', $newsletter);

    // Send welcome email (optional)
    gallagher_send_welcome_email($user_id, $email, $first_name);

    // Add to mailing list if subscribed (optional - integrate with your email service)
    if ($newsletter) {
        // Add your mailing list integration here
        // gallagher_add_to_newsletter($email, $first_name, $last_name);
    }

    wp_send_json_success(array('message' => 'Account created successfully!', 'user_id' => $user_id));
}
add_action('wp_ajax_gallagher_process_signup', 'gallagher_process_signup');
add_action('wp_ajax_nopriv_gallagher_process_signup', 'gallagher_process_signup');

// Send welcome email
function gallagher_send_welcome_email($user_id, $email, $first_name) {
    $subject = 'Welcome to Gallagher Art School!';
    $message = "
    <html>
    <body>
        <h2>Welcome to Gallagher Art School, {$first_name}!</h2>
        <p>Thank you for joining our art community. We're excited to have you on this creative journey.</p>
        <p>Our Yale MFA graduate instructor is ready to help you develop your artistic skills.</p>
        <p>You'll receive information about upcoming classes and events soon.</p>
        <p>Best regards,<br>The Gallagher Art School Team</p>
    </body>
    </html>
    ";
    
    $headers = array('Content-Type: text/html; charset=UTF-8');
    wp_mail($email, $subject, $message, $headers);
}

// Create admin page to view signups
function gallagher_admin_menu() {
    add_menu_page(
        'Art School Signups',
        'Art Signups',
        'manage_options',
        'gallagher-signups',
        'gallagher_admin_page',
        'dashicons-art',
        30
    );
}
add_action('admin_menu', 'gallagher_admin_menu');

function gallagher_admin_page() {
    // Query users with art school metadata
    $users = get_users(array(
        'meta_key' => 'art_experience',
        'meta_compare' => 'EXISTS'
    ));
    
    echo '<div class="wrap">';
    echo '<h1>Art School Signups</h1>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead><tr><th>Name</th><th>Email</th><th>Experience</th><th>Interests</th><th>Date Joined</th></tr></thead>';
    echo '<tbody>';
    
    foreach ($users as $user) {
        $experience = get_user_meta($user->ID, 'art_experience', true);
        $interests = get_user_meta($user->ID, 'art_interests', true);
        $interests_str = is_array($interests) ? implode(', ', $interests) : '';
        
        echo '<tr>';
        echo '<td>' . esc_html($user->display_name) . '</td>';
        echo '<td>' . esc_html($user->user_email) . '</td>';
        echo '<td>' . esc_html($experience) . '</td>';
        echo '<td>' . esc_html($interests_str) . '</td>';
        echo '<td>' . esc_html($user->user_registered) . '</td>';
        echo '</tr>';
    }
    
    echo '</tbody></table>';
    echo '</div>';
}

// Custom CSS for Flatsome integration
function gallagher_custom_css() {
    if (is_page() && has_shortcode(get_post()->post_content, 'gallagher_signup_form')) {
        ?>
        <style>
            /* Override Flatsome theme styles if needed */
            .gallagher-signup-wrapper .signup-container {
                margin: 0 !important;
                padding: 0 !important;
            }
            
            /* Make form colors match your theme */
            .gallagher-signup-wrapper .btn-primary {
                background-color: var(--primary-color, #3b82f6) !important;
            }
            
            /* Add any other custom styles for Flatsome integration */
        </style>
        <?php
    }
}
add_action('wp_head', 'gallagher_custom_css');
?>