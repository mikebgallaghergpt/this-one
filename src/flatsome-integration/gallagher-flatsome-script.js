// Gallagher Art School - Flatsome Optimized JavaScript

(function($) {
    'use strict';

    // Global state
    let currentStep = 1;
    let currentSlide = 0;
    let slideInterval;
    let progressInterval;
    let supabaseClient = null;

    // Enhanced Carousel slides data with images
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Master the Art of Drawing",
            subtitle: "From beginner sketches to advanced techniques",
            cta: "Start Drawing"
        },
        {
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Explore Vibrant Painting",
            subtitle: "Watercolors, oils, and mixed media",
            cta: "Pick Up a Brush"
        },
        {
            image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Digital Art & Design",
            subtitle: "Modern techniques for the digital age",
            cta: "Go Digital"
        },
        {
            image: "https://images.unsplash.com/photo-1452457807411-4979b707c5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Sculpture & 3D Art",
            subtitle: "Shape your imagination into reality",
            cta: "Start Sculpting"
        },
        {
            image: "https://images.unsplash.com/photo-1692291051778-014c9b193830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkaW8lMjBjcmVhdGl2ZSUyMHNwYWNlfGVufDF8fHx8MTc1NzUzMzcyNXww&ixlib=rb-4.1.0&q=80&w=1080",
            title: "Creative Studio Space",
            subtitle: "Inspiring environments for artistic growth",
            cta: "Explore Studios"
        },
        {
            image: "https://images.unsplash.com/photo-1676125105159-517d135a6cc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwY2VyYW1pY3MlMjBjbGFzc3xlbnwxfHx8fDE3NTc2MDg5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            title: "Pottery & Ceramics",
            subtitle: "Work with clay and create functional art",
            cta: "Try Ceramics"
        },
        {
            image: "https://images.unsplash.com/photo-1696937059409-60900a43bc67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMG1lZGlhJTIwYXJ0JTIwY29sbGFnZXxlbnwxfHx8fDE3NTc1MjIwODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
            title: "Mixed Media Mastery",
            subtitle: "Combine materials for unique artistic expression",
            cta: "Get Creative"
        }
    ];

    // Initialize when document is ready
    $(document).ready(function() {
        initGallagherForm();
    });

    function initGallagherForm() {
        if ($('.gallagher-signup-wrapper').length === 0) {
            return;
        }

        console.log('Initializing Gallagher Art School Form');
        
        initSupabase();
        initCarousel();
        initFormSteps();
        initFormValidation();
        initEventListeners();
        setBackgroundImage();
    }

    function initSupabase() {
        if (typeof gallagherConfig !== 'undefined' && gallagherConfig.supabase_project_id && gallagherConfig.supabase_anon_key) {
            try {
                // Initialize Supabase client if available
                if (typeof supabase !== 'undefined') {
                    supabaseClient = supabase.createClient(
                        `https://${gallagherConfig.supabase_project_id}.supabase.co`,
                        gallagherConfig.supabase_anon_key
                    );
                }
            } catch (error) {
                console.warn('Supabase initialization failed:', error);
            }
        }
    }

    function setBackgroundImage() {
        const wrapper = $('.gallagher-signup-wrapper');
        const bgImage = wrapper.data('bg');
        
        if (bgImage) {
            wrapper.css('--bg-image', `url(${bgImage})`);
        }
    }

    function initCarousel() {
        if ($('.gallagher-carousel-section').length === 0) {
            return;
        }

        updateSlide(0);
        startCarouselAutoplay();

        // Navigation button handlers
        $('#gallagher-prev-slide').on('click', function() {
            goToPreviousSlide();
        });

        $('#gallagher-next-slide').on('click', function() {
            goToNextSlide();
        });

        // Play/pause button handler
        $('#gallagher-play-pause').on('click', function() {
            togglePlayPause();
        });

        // Dot click handlers
        $('.gallagher-dot').on('click', function() {
            const slideIndex = parseInt($(this).data('slide'));
            goToSlide(slideIndex);
        });

        // Pause on hover
        $('.gallagher-carousel-section').on('mouseenter', function() {
            pauseCarousel();
        }).on('mouseleave', function() {
            resumeCarousel();
        });

        // Keyboard navigation
        $(document).on('keydown', function(e) {
            if ($('.gallagher-carousel-section:hover').length > 0) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    goToPreviousSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    goToNextSlide();
                } else if (e.key === ' ') {
                    e.preventDefault();
                    togglePlayPause();
                }
            }
        });
    }

    function startCarouselAutoplay() {
        stopCarouselAutoplay();
        slideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide(currentSlide);
        }, 4000);
    }

    function stopCarouselAutoplay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlide(index);
        stopCarouselAutoplay();
        setTimeout(startCarouselAutoplay, 5000);
    }

    function updateSlide(index) {
        const slide = slides[index];
        
        // Update background image
        $('#gallagher-carousel-images').css('background-image', `url(${slide.image})`);
        
        // Update content
        $('#gallagher-slide-content .gallagher-slide-title').text(slide.title);
        $('#gallagher-slide-content .gallagher-slide-subtitle').text(slide.subtitle);
        $('#gallagher-slide-content .gallagher-slide-cta').text(slide.cta);

        // Update dots
        $('.gallagher-dot').removeClass('active');
        $(`.gallagher-dot[data-slide="${index}"]`).addClass('active');
        
        // Update progress bar
        updateProgressBar();
    }

    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
        resetCarouselTimer();
    }

    function goToPreviousSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
        resetCarouselTimer();
    }

    function togglePlayPause() {
        if (slideInterval) {
            stopCarouselAutoplay();
            $('.gallagher-pause-icon').hide();
            $('.gallagher-play-icon').show();
        } else {
            startCarouselAutoplay();
            $('.gallagher-pause-icon').show();
            $('.gallagher-play-icon').hide();
        }
    }

    function pauseCarousel() {
        if (slideInterval) {
            clearInterval(slideInterval);
            clearInterval(progressInterval);
        }
    }

    function resumeCarousel() {
        if (!slideInterval && $('.gallagher-pause-icon').is(':visible')) {
            startCarouselAutoplay();
        }
    }

    function resetCarouselTimer() {
        if (slideInterval) {
            stopCarouselAutoplay();
            startCarouselAutoplay();
        }
    }

    function updateProgressBar() {
        const progressBar = $('#gallagher-progress-bar');
        progressBar.css('width', '0%');
        
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        
        if (slideInterval) {
            let progress = 0;
            const increment = 100 / (4000 / 50); // 4 seconds, update every 50ms
            
            progressInterval = setInterval(function() {
                progress += increment;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(progressInterval);
                }
                progressBar.css('width', progress + '%');
            }, 50);
        }
    }

    function initFormSteps() {
        updateStepDisplay();
        updateProgressBar();
    }

    function initFormValidation() {
        // Real-time validation
        $('#email').on('blur', function() {
            validateEmail($(this).val());
        });

        $('#phone').on('blur', function() {
            validatePhone($(this).val());
        });

        $('#confirmPassword').on('input', function() {
            validatePasswordMatch();
        });

        // Conditional field for "How did you hear about us"
        $('#hearAbout').on('change', function() {
            const value = $(this).val();
            const otherField = $('#gallagher-other-specify');
            
            if (value === 'other') {
                otherField.show().find('input').prop('required', true);
            } else {
                otherField.hide().find('input').prop('required', false).val('');
            }
        });
    }

    function initEventListeners() {
        // Navigation buttons
        $('#gallagher-next-btn').on('click', handleNextStep);
        $('#gallagher-back-btn').on('click', handlePreviousStep);

        // Form submission
        $('#gallagher-signup-form').on('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });

        // Social login buttons
        $('.gallagher-google-btn').on('click', function(e) {
            e.preventDefault();
            handleSocialLogin('google');
        });

        $('.gallagher-apple-btn').on('click', function(e) {
            e.preventDefault();
            handleSocialLogin('apple');
        });

        // Slide CTA button
        $('.gallagher-slide-cta').on('click', function() {
            $('html, body').animate({
                scrollTop: $('.gallagher-signup-card').offset().top - 50
            }, 800);
        });
    }

    function handleNextStep() {
        if (validateCurrentStep()) {
            if (currentStep < 3) {
                currentStep++;
                updateStepDisplay();
                updateProgressBar();
            } else {
                handleFormSubmission();
            }
        }
    }

    function handlePreviousStep() {
        if (currentStep > 1) {
            currentStep--;
            updateStepDisplay();
            updateProgressBar();
        }
    }

    function validateCurrentStep() {
        let isValid = true;
        const currentStepElement = $(`#gallagher-step-${currentStep}`);
        
        // Clear previous errors
        hideMessage();
        
        // Validate required fields in current step
        currentStepElement.find('input[required], select[required]').each(function() {
            const field = $(this);
            const value = field.val().trim();
            
            if (!value) {
                showError(`Please fill in all required fields.`);
                field.focus();
                isValid = false;
                return false;
            }
        });

        if (!isValid) return false;

        // Step-specific validation
        switch (currentStep) {
            case 1:
                isValid = validateStep1();
                break;
            case 2:
                isValid = validateStep2();
                break;
            case 3:
                isValid = validateStep3();
                break;
        }

        return isValid;
    }

    function validateStep1() {
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();
        
        if (!validateEmail(email)) {
            return false;
        }
        
        if (phone && !validatePhone(phone)) {
            return false;
        }
        
        return true;
    }

    function validateStep2() {
        // Check if at least one interest is selected
        const interests = $('input[name="interests[]"]:checked');
        if (interests.length === 0) {
            showError('Please select at least one area of interest.');
            return false;
        }

        // Validate "other" field if selected
        const hearAbout = $('#hearAbout').val();
        if (hearAbout === 'other') {
            const otherText = $('#hearAboutOther').val().trim();
            if (!otherText) {
                showError('Please specify how you heard about us.');
                $('#hearAboutOther').focus();
                return false;
            }
        }

        return true;
    }

    function validateStep3() {
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        
        if (password.length < 6) {
            showError('Password must be at least 6 characters long.');
            $('#password').focus();
            return false;
        }
        
        if (password !== confirmPassword) {
            showError('Passwords do not match.');
            $('#confirmPassword').focus();
            return false;
        }
        
        return true;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address.');
            $('#email').focus();
            return false;
        }
        return true;
    }

    function validatePhone(phone) {
        if (phone && phone.length > 0) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
            if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
                showError('Please enter a valid phone number.');
                $('#phone').focus();
                return false;
            }
        }
        return true;
    }

    function validatePasswordMatch() {
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        
        if (confirmPassword && password !== confirmPassword) {
            $('#confirmPassword')[0].setCustomValidity('Passwords do not match');
        } else {
            $('#confirmPassword')[0].setCustomValidity('');
        }
    }

    function updateStepDisplay() {
        // Hide all steps
        $('.gallagher-form-step').removeClass('active');
        
        // Show current step
        $(`#gallagher-step-${currentStep}`).addClass('active');
        
        // Update step indicators
        $('.gallagher-step').removeClass('active completed');
        
        for (let i = 1; i <= 3; i++) {
            const stepElement = $(`.gallagher-step[data-step="${i}"]`);
            if (i < currentStep) {
                stepElement.addClass('completed');
                stepElement.closest('.gallagher-step').next('.gallagher-step-line').addClass('completed');
            } else if (i === currentStep) {
                stepElement.addClass('active');
            }
        }
        
        // Update navigation buttons
        const backBtn = $('#gallagher-back-btn');
        const nextBtn = $('#gallagher-next-btn');
        
        if (currentStep === 1) {
            backBtn.hide();
        } else {
            backBtn.show();
        }
        
        if (currentStep === 3) {
            nextBtn.html(`
                Create Account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
            `);
        } else {
            nextBtn.html(`
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9,18 15,12 9,6"/>
                </svg>
            `);
        }
        
        // Update step subtitle
        const subtitles = {
            1: 'Tell us about yourself',
            2: 'Share your artistic interests',
            3: 'Create your account'
        };
        
        $('#gallagher-step-subtitle').text(subtitles[currentStep]);
    }

    function updateProgressBar() {
        const progress = (currentStep / 3) * 100;
        $('.gallagher-progress-fill').css('width', `${progress}%`);
    }

    function handleSocialLogin(provider) {
        if (supabaseClient) {
            supabaseClient.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: window.location.origin + '/welcome'
                }
            });
        } else {
            showError(`Social login with ${provider} is not configured yet. Please use email signup.`);
        }
    }

    function handleFormSubmission() {
        if (!validateCurrentStep()) {
            return;
        }

        // Disable form during submission
        setFormLoading(true);
        
        // Collect form data
        const formData = collectFormData();
        
        // Submit to WordPress backend
        submitToWordPress(formData);
    }

    function collectFormData() {
        const formData = {
            firstName: $('#firstName').val().trim(),
            lastName: $('#lastName').val().trim(),
            email: $('#email').val().trim(),
            phone: $('#phone').val().trim(),
            experience: $('#experience').val(),
            interests: [],
            hearAbout: $('#hearAbout').val(),
            hearAboutOther: $('#hearAboutOther').val().trim(),
            password: $('#password').val(),
            newsletter: $('#newsletter').is(':checked')
        };

        // Collect interests
        $('input[name="interests[]"]:checked').each(function() {
            formData.interests.push($(this).val());
        });

        return formData;
    }

    function submitToWordPress(formData) {
        $.ajax({
            url: gallagherConfig.ajax_url,
            type: 'POST',
            data: {
                action: 'gallagher_submit_signup',
                nonce: gallagherConfig.nonce,
                ...formData
            },
            success: function(response) {
                if (response.success) {
                    showSuccess();
                    
                    // Optionally redirect after success
                    if (response.data.redirect) {
                        setTimeout(function() {
                            window.location.href = response.data.redirect;
                        }, 2000);
                    }
                } else {
                    showError(response.data || 'An error occurred. Please try again.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Submission error:', error);
                showError('Network error. Please check your connection and try again.');
            },
            complete: function() {
                setFormLoading(false);
            }
        });
    }

    function setFormLoading(loading) {
        const nextBtn = $('#gallagher-next-btn');
        const form = $('#gallagher-signup-form');
        
        if (loading) {
            nextBtn.prop('disabled', true).html(`
                <svg class="gallagher-spinner" width="16" height="16" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="32" stroke-dashoffset="32">
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
                    </circle>
                </svg>
                Creating Account...
            `);
            form.css('opacity', '0.7');
        } else {
            nextBtn.prop('disabled', false);
            form.css('opacity', '1');
            updateStepDisplay(); // Restore button text
        }
    }

    function showError(message) {
        hideMessage();
        $('#gallagher-error-message span').text(message);
        $('#gallagher-error-message').show().css('display', 'flex');
        
        // Scroll to message
        $('html, body').animate({
            scrollTop: $('#gallagher-error-message').offset().top - 100
        }, 300);
    }

    function showSuccess() {
        hideMessage();
        $('#gallagher-success-message').show().css('display', 'flex');
        
        // Hide form and show success state
        $('.gallagher-form').hide();
        $('.gallagher-progress-bar').hide();
        $('.gallagher-progress-steps').hide();
        
        // Scroll to message
        $('html, body').animate({
            scrollTop: $('#gallagher-success-message').offset().top - 100
        }, 300);
    }

    function hideMessage() {
        $('.gallagher-message').hide();
    }

    // Expose functions for external use
    window.gallagherSocialLogin = handleSocialLogin;

    // CSS for spinner animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .gallagher-spinner {
                animation: gallagher-spin 1s linear infinite;
            }
            @keyframes gallagher-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `)
        .appendTo('head');

})(jQuery);