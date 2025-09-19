// Gallagher Art School - Rectangular Signup v4.0.0
// Complete rebuild with rectangular layout and proper functionality

(function($) {
    'use strict';
    
    let currentStep = 1;
    const totalSteps = 3;
    let formData = {};
    let carouselInterval;
    let currentSlide = 0;
    const totalSlides = 3;
    
    // Initialize when document is ready
    $(document).ready(function() {
        initializeForm();
        initializeCarousel();
        initializeCheckboxes();
        updateStepDisplay();
    });
    
    function initializeForm() {
        // Handle form submission
        $('#gallagher-rectangular-form').on('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
        
        // Handle "other" specification field
        $('#hearAbout').on('change', function() {
            if ($(this).val() === 'other') {
                $('#other-specify').show();
                $('#hearAboutOther').attr('required', true);
            } else {
                $('#other-specify').hide();
                $('#hearAboutOther').attr('required', false).val('');
            }
        });
        
        // Handle checkbox interactions
        $('.gallagher-rectangular-checkbox').on('click', function() {
            const checkbox = $(this).find('input[type="checkbox"]');
            const isChecked = checkbox.prop('checked');
            checkbox.prop('checked', !isChecked);
            updateCheckboxDisplay($(this), !isChecked);
        });
        
        // Prevent checkbox clicks from bubbling
        $('.gallagher-rectangular-checkbox input[type="checkbox"]').on('click', function(e) {
            e.stopPropagation();
            updateCheckboxDisplay($(this).closest('.gallagher-rectangular-checkbox'), $(this).prop('checked'));
        });
    }
    
    function initializeCarousel() {
        if ($('.gallagher-carousel-section').length === 0) return;
        
        // Start carousel
        startCarousel();
        
        // Handle visibility change for performance
        $(document).on('visibilitychange', function() {
            if (document.hidden) {
                clearInterval(carouselInterval);
            } else {
                startCarousel();
            }
        });
    }
    
    function startCarousel() {
        clearInterval(carouselInterval);
        
        carouselInterval = setInterval(function() {
            nextSlide();
        }, 5000); // 5 seconds per slide
        
        // Initialize progress bar
        updateProgressBar();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function updateCarousel() {
        // Update image slides
        $('.gallagher-image-slide').removeClass('active');
        $('.gallagher-image-slide').eq(currentSlide).addClass('active');
        
        // Update content slides
        $('.gallagher-slide').removeClass('active');
        $('.gallagher-slide').eq(currentSlide).addClass('active');
        
        // Update progress bar
        updateProgressBar();
    }
    
    function updateProgressBar() {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        $('#progress-fill').css('width', progress + '%');
    }
    
    function initializeCheckboxes() {
        $('.gallagher-rectangular-checkbox').each(function() {
            const checkbox = $(this).find('input[type="checkbox"]');
            updateCheckboxDisplay($(this), checkbox.prop('checked'));
        });
    }
    
    function updateCheckboxDisplay($container, isChecked) {
        if (isChecked) {
            $container.addClass('checked');
            $container.css({
                'border-color': '#3b82f6',
                'background-color': '#eff6ff'
            });
        } else {
            $container.removeClass('checked');
            $container.css({
                'border-color': '#e5e7eb',
                'background-color': 'white'
            });
        }
    }
    
    function updateStepDisplay() {
        // Update step indicators
        $('.gallagher-step').removeClass('active completed');
        $('.gallagher-step-line').removeClass('completed');
        
        for (let i = 1; i <= totalSteps; i++) {
            if (i < currentStep) {
                $(`.gallagher-step[data-step="${i}"]`).addClass('completed');
                $(`.gallagher-step[data-step="${i}"]`).next('.gallagher-step-line').addClass('completed');
            } else if (i === currentStep) {
                $(`.gallagher-step[data-step="${i}"]`).addClass('active');
            }
        }
        
        // Update progress bar
        const progress = (currentStep / totalSteps) * 100;
        $('.gallagher-progress-fill').css('width', progress + '%');
        
        // Update form steps
        $('.gallagher-form-step').removeClass('active');
        $(`.gallagher-form-step[data-step="${currentStep}"]`).addClass('active');
        
        // Update step description
        const descriptions = [
            'Tell us about yourself',
            'What interests you?',
            'Set up your login'
        ];
        $('#step-description').text(descriptions[currentStep - 1]);
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Show/hide social login
        if (currentStep === 1) {
            $('#social-login').show();
        } else {
            $('#social-login').hide();
        }
    }
    
    function updateNavigationButtons() {
        const $prevBtn = $('#prev-btn');
        const $nextBtn = $('#next-btn');
        const $submitBtn = $('#submit-btn');
        
        // Show/hide previous button
        if (currentStep === 1) {
            $prevBtn.hide();
        } else {
            $prevBtn.show();
        }
        
        // Show/hide next vs submit button
        if (currentStep === totalSteps) {
            $nextBtn.hide();
            $submitBtn.show();
        } else {
            $nextBtn.show();
            $submitBtn.hide();
        }
    }
    
    function validateCurrentStep() {
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous errors
        clearErrors();
        
        switch (currentStep) {
            case 1:
                if (!$('#firstName').val().trim()) {
                    errorMessage = 'First name is required';
                    isValid = false;
                } else if (!$('#lastName').val().trim()) {
                    errorMessage = 'Last name is required';
                    isValid = false;
                } else if (!$('#email').val().trim()) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!isValidEmail($('#email').val())) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
                
            case 2:
                if (!$('#experience').val()) {
                    errorMessage = 'Please select your experience level';
                    isValid = false;
                } else if (!$('#hearAbout').val()) {
                    errorMessage = 'Please select how you heard about us';
                    isValid = false;
                } else if ($('#hearAbout').val() === 'other' && !$('#hearAboutOther').val().trim()) {
                    errorMessage = 'Please specify how you heard about us';
                    isValid = false;
                }
                break;
                
            case 3:
                if (!$('#password').val()) {
                    errorMessage = 'Password is required';
                    isValid = false;
                } else if ($('#password').val().length < 6) {
                    errorMessage = 'Password must be at least 6 characters long';
                    isValid = false;
                } else if ($('#password').val() !== $('#confirmPassword').val()) {
                    errorMessage = 'Passwords do not match';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            showError(errorMessage);
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(message) {
        const $messages = $('#gallagher-messages');
        $messages.html(`
            <div class="gallagher-message gallagher-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                ${message}
            </div>
        `);
        
        // Scroll to top of form to show error
        $('html, body').animate({
            scrollTop: $('.gallagher-rectangular-card').offset().top - 20
        }, 300);
    }
    
    function showSuccess(message) {
        const $messages = $('#gallagher-messages');
        $messages.html(`
            <div class="gallagher-message gallagher-success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
                ${message}
            </div>
        `);
    }
    
    function clearErrors() {
        $('#gallagher-messages').empty();
    }
    
    function collectFormData() {
        formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            experience: $('#experience').val(),
            interests: $('input[name="interests[]"]:checked').map(function() {
                return $(this).val();
            }).get(),
            hearAbout: $('#hearAbout').val(),
            hearAboutOther: $('#hearAboutOther').val(),
            password: $('#password').val(),
            newsletter: $('#newsletter').prop('checked')
        };
        
        return formData;
    }
    
    function handleFormSubmission() {
        if (!validateCurrentStep()) {
            return;
        }
        
        collectFormData();
        
        // Show loading state
        $('#submit-text').text('Creating Account...');
        $('#submit-icon').hide();
        $('#loading-icon').show();
        $('#submit-btn').prop('disabled', true);
        
        // Simulate submission (replace with actual AJAX call)
        setTimeout(function() {
            showSuccess('Account created successfully! Welcome to Gallagher Art School.');
            
            // Store demo data
            let demoUsers = JSON.parse(localStorage.getItem('gallagher_demo_users') || '[]');
            const demoUser = {
                id: 'demo_' + Date.now(),
                ...formData,
                createdAt: new Date().toISOString(),
                demoMode: true
            };
            demoUsers.push(demoUser);
            localStorage.setItem('gallagher_demo_users', JSON.stringify(demoUsers));
            
            // Reset loading state
            $('#submit-text').text('Account Created!');
            $('#loading-icon').hide();
            $('#submit-icon').show();
            
            // Reset form after delay
            setTimeout(function() {
                location.reload();
            }, 3000);
            
        }, 2000);
    }
    
    // Global functions for navigation
    window.gallagherNextStep = function() {
        if (validateCurrentStep() && currentStep < totalSteps) {
            currentStep++;
            updateStepDisplay();
        }
    };
    
    window.gallagherPrevStep = function() {
        if (currentStep > 1) {
            currentStep--;
            updateStepDisplay();
        }
    };
    
    window.gallagherSocialLogin = function(provider) {
        alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login requires additional setup in your Supabase dashboard. Please visit https://supabase.com/docs/guides/auth/social-login/auth-${provider} for setup instructions.`);
    };
    
})(jQuery);