/*
 * Gallagher Art School Signup Form - Original Layout v4.2.0
 * JavaScript functionality for the compact, original design
 * Matches Figma screenshots exactly with multi-step form and carousel
 */

(function($) {
    'use strict';

    // Plugin version and config
    const GALLAGHER_VERSION = '4.2.0';
    let gallagherConfig = {
        currentStep: 1,
        totalSteps: 3,
        isSubmitting: false,
        carouselInterval: null,
        carouselAutoPlay: true,
        carouselSlides: []
    };

    // Default carousel slides
    const defaultSlides = [
        {
            image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Master the Art of Drawing',
            subtitle: 'From beginner sketches to advanced techniques',
            cta: 'Start Drawing'
        },
        {
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Explore Vibrant Painting',
            subtitle: 'Watercolors, oils, and mixed media',
            cta: 'Learn Painting'
        },
        {
            image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Digital Art & Design',
            subtitle: 'Modern techniques for the digital age',
            cta: 'Go Digital'
        },
        {
            image: 'https://images.unsplash.com/photo-1452457807411-4979b707c5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Sculpture & 3D Art',
            subtitle: 'Shape your imagination into reality',
            cta: 'Start Sculpting'
        },
        {
            image: 'https://images.unsplash.com/photo-1692291051778-014c9b193830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkaW8lMjBjcmVhdGl2ZSUyMHNwYWNlfGVufDF8fHx8MTc1NzUzMzcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
            title: 'Creative Studio Space',
            subtitle: 'Inspiring environments for artistic growth',
            cta: 'Explore Studios'
        },
        {
            image: 'https://images.unsplash.com/photo-1676125105159-517d135a6cc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwY2VyYW1pY3MlMjBjbGFzc3xlbnwxfHx8fDE3NTc2MDg5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
            title: 'Pottery & Ceramics',
            subtitle: 'Work with clay and create functional art',
            cta: 'Try Ceramics'
        },
        {
            image: 'https://images.unsplash.com/photo-1696937059409-60900a43bc67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMG1lZGlhJTIwYXJ0JTIwY29sbGFnZXxlbnwxfHx8fDE3NTc1MjIwODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
            title: 'Mixed Media Mastery',
            subtitle: 'Combine materials for unique artistic expression',
            cta: 'Get Creative'
        }
    ];

    // Initialize plugin when document is ready
    $(document).ready(function() {
        console.log('Gallagher Art School v' + GALLAGHER_VERSION + ' (Original Layout) - Initializing...');
        initializeGallagherForm();
    });

    function initializeGallagherForm() {
        // Find all Gallagher signup containers
        $('.gallagher-signup-container').each(function() {
            const $container = $(this);
            initializeCarousel($container);
            initializeForm($container);
            initializeSocialLogin($container);
            initializeInteractionHandlers($container);
        });
    }

    // Carousel Management
    function initializeCarousel($container) {
        const $carousel = $container.find('.gallagher-image-carousel');
        if (!$carousel.length) return;

        gallagherConfig.carouselSlides = defaultSlides;
        gallagherConfig.currentSlideIndex = 0;

        // Build carousel HTML
        buildCarouselSlides($carousel);
        buildCarouselIndicators($container);
        
        // Start autoplay
        startCarouselAutoPlay($container);
        
        // Bind carousel controls
        bindCarouselControls($container);
        
        console.log('Carousel initialized with ' + gallagherConfig.carouselSlides.length + ' slides');
    }

    function buildCarouselSlides($carousel) {
        let slidesHTML = '';
        
        gallagherConfig.carouselSlides.forEach((slide, index) => {
            const activeClass = index === 0 ? ' active' : '';
            slidesHTML += `
                <div class="gallagher-carousel-slide${activeClass}" data-slide="${index}">
                    <img src="${slide.image}" alt="${slide.title}" class="gallagher-carousel-image" />
                    <div class="gallagher-carousel-overlay-gradient"></div>
                </div>
            `;
        });
        
        $carousel.html(slidesHTML);
        updateCarouselContent($carousel.closest('.gallagher-signup-container'), 0);
    }

    function buildCarouselIndicators($container) {
        const $indicators = $container.find('.gallagher-carousel-indicators');
        if (!$indicators.length) return;

        let indicatorsHTML = '';
        gallagherConfig.carouselSlides.forEach((slide, index) => {
            const activeClass = index === 0 ? ' active' : '';
            indicatorsHTML += `<button class="gallagher-carousel-indicator${activeClass}" data-slide="${index}" aria-label="Go to slide ${index + 1}"></button>`;
        });
        
        $indicators.html(indicatorsHTML);
    }

    function updateCarouselContent($container, slideIndex) {
        const slide = gallagherConfig.carouselSlides[slideIndex];
        if (!slide) return;

        // Update overlay content
        $container.find('.gallagher-slide-title').text(slide.title);
        $container.find('.gallagher-slide-description').text(slide.subtitle);
        
        // Update active slide
        $container.find('.gallagher-carousel-slide').removeClass('active');
        $container.find(`.gallagher-carousel-slide[data-slide="${slideIndex}"]`).addClass('active');
        
        // Update indicators
        $container.find('.gallagher-carousel-indicator').removeClass('active');
        $container.find(`.gallagher-carousel-indicator[data-slide="${slideIndex}"]`).addClass('active');
        
        // Reset progress bar
        resetProgressBar($container);
    }

    function startCarouselAutoPlay($container) {
        if (gallagherConfig.carouselInterval) {
            clearInterval(gallagherConfig.carouselInterval);
        }
        
        if (!gallagherConfig.carouselAutoPlay) return;
        
        gallagherConfig.carouselInterval = setInterval(() => {
            nextSlide($container);
        }, 4000);
        
        // Start progress bar animation
        animateProgressBar($container, 4000);
    }

    function nextSlide($container) {
        gallagherConfig.currentSlideIndex = (gallagherConfig.currentSlideIndex + 1) % gallagherConfig.carouselSlides.length;
        updateCarouselContent($container, gallagherConfig.currentSlideIndex);
        
        if (gallagherConfig.carouselAutoPlay) {
            animateProgressBar($container, 4000);
        }
    }

    function prevSlide($container) {
        gallagherConfig.currentSlideIndex = gallagherConfig.currentSlideIndex === 0 
            ? gallagherConfig.carouselSlides.length - 1 
            : gallagherConfig.currentSlideIndex - 1;
        updateCarouselContent($container, gallagherConfig.currentSlideIndex);
        
        if (gallagherConfig.carouselAutoPlay) {
            animateProgressBar($container, 4000);
        }
    }

    function goToSlide($container, slideIndex) {
        gallagherConfig.currentSlideIndex = slideIndex;
        updateCarouselContent($container, slideIndex);
        
        if (gallagherConfig.carouselAutoPlay) {
            startCarouselAutoPlay($container);
        }
    }

    function toggleCarouselPlayPause($container) {
        gallagherConfig.carouselAutoPlay = !gallagherConfig.carouselAutoPlay;
        const $playPause = $container.find('.gallagher-carousel-play-pause');
        
        if (gallagherConfig.carouselAutoPlay) {
            $playPause.text('⏸️');
            startCarouselAutoPlay($container);
        } else {
            $playPause.text('▶️');
            if (gallagherConfig.carouselInterval) {
                clearInterval(gallagherConfig.carouselInterval);
            }
            resetProgressBar($container);
        }
    }

    function animateProgressBar($container, duration) {
        const $progressBar = $container.find('.gallagher-carousel-progress-bar');
        $progressBar.css({
            'width': '0%',
            'transition': 'none'
        });
        
        // Force reflow
        $progressBar[0].offsetHeight;
        
        $progressBar.css({
            'width': '100%',
            'transition': `width ${duration}ms linear`
        });
    }

    function resetProgressBar($container) {
        const $progressBar = $container.find('.gallagher-carousel-progress-bar');
        $progressBar.css({
            'width': '0%',
            'transition': 'none'
        });
    }

    function bindCarouselControls($container) {
        // Previous/Next buttons
        $container.find('.gallagher-carousel-prev').on('click', () => prevSlide($container));
        $container.find('.gallagher-carousel-next').on('click', () => nextSlide($container));
        
        // Play/Pause button
        $container.find('.gallagher-carousel-play-pause').on('click', () => toggleCarouselPlayPause($container));
        
        // Indicator buttons
        $container.on('click', '.gallagher-carousel-indicator', function() {
            const slideIndex = parseInt($(this).data('slide'));
            goToSlide($container, slideIndex);
        });
        
        // Pause on hover
        $container.find('.gallagher-carousel-section').hover(
            function() {
                if (gallagherConfig.carouselInterval) {
                    clearInterval(gallagherConfig.carouselInterval);
                }
                resetProgressBar($container);
            },
            function() {
                if (gallagherConfig.carouselAutoPlay) {
                    startCarouselAutoPlay($container);
                }
            }
        );
    }

    // Form Management
    function initializeForm($container) {
        const $form = $container.find('#gallagher-signup-form');
        if (!$form.length) return;

        // Initialize form state
        resetFormToStep($container, 1);
        
        // Bind form events
        bindFormNavigation($container);
        bindFormValidation($container);
        bindFormSubmission($container);
        bindConditionalFields($container);
        bindCheckboxInteractions($container);
        
        console.log('Multi-step form initialized');
    }

    function resetFormToStep($container, step) {
        gallagherConfig.currentStep = step;
        
        // Hide all steps
        $container.find('.gallagher-form-step').hide();
        $container.find('.gallagher-social-section').hide();
        
        // Show current step
        $container.find(`.gallagher-form-step[data-step="${getStepName(step)}"]`).show();
        
        // Show social login only on first step
        if (step === 1) {
            $container.find('.gallagher-social-section[data-step="personal"]').show();
        }
        
        // Update progress
        updateFormProgress($container, step);
        updateNavigationButtons($container, step);
    }

    function getStepName(stepNumber) {
        const stepNames = ['', 'personal', 'preferences', 'account'];
        return stepNames[stepNumber] || 'personal';
    }

    function updateFormProgress($container, step) {
        const progressPercent = (step / gallagherConfig.totalSteps) * 100;
        
        // Update progress bar
        $container.find('.gallagher-progress-fill').css('width', progressPercent + '%');
        
        // Update progress icons
        $container.find('.gallagher-progress-icon').each(function(index) {
            const $icon = $(this);
            const iconStep = index + 1;
            
            $icon.removeClass('active completed inactive');
            
            if (iconStep < step) {
                $icon.addClass('completed');
            } else if (iconStep === step) {
                $icon.addClass('active');
            } else {
                $icon.addClass('inactive');
            }
        });
        
        // Update progress lines
        $container.find('.gallagher-progress-line').each(function(index) {
            const $line = $(this);
            const lineStep = index + 1;
            
            if (lineStep < step) {
                $line.addClass('completed').removeClass('inactive');
            } else {
                $line.addClass('inactive').removeClass('completed');
            }
        });
        
        // Update form title and description
        const stepTitles = ['', 'Tell us about yourself', 'What interests you?', 'Set up your login'];
        $container.find('.gallagher-form-description').text(stepTitles[step] || '');
    }

    function updateNavigationButtons($container, step) {
        const $prevBtn = $container.find('#gallagher-prev-btn');
        const $nextBtn = $container.find('#gallagher-next-btn');
        const $submitBtn = $container.find('#gallagher-submit-btn');
        
        // Previous button
        if (step === 1) {
            $prevBtn.hide();
        } else {
            $prevBtn.show();
        }
        
        // Next vs Submit button
        if (step === gallagherConfig.totalSteps) {
            $nextBtn.hide();
            $submitBtn.show();
        } else {
            $nextBtn.show();
            $submitBtn.hide();
        }
    }

    function bindFormNavigation($container) {
        // Next button
        $container.find('#gallagher-next-btn').on('click', function() {
            if (validateCurrentStep($container)) {
                if (gallagherConfig.currentStep < gallagherConfig.totalSteps) {
                    resetFormToStep($container, gallagherConfig.currentStep + 1);
                }
            }
        });
        
        // Previous button
        $container.find('#gallagher-prev-btn').on('click', function() {
            if (gallagherConfig.currentStep > 1) {
                resetFormToStep($container, gallagherConfig.currentStep - 1);
            }
        });
    }

    function bindFormValidation($container) {
        // Real-time validation
        $container.find('input[required], select[required]').on('blur', function() {
            validateField($(this), $container);
        });
        
        // Clear errors on input
        $container.find('input, select').on('input change', function() {
            clearFieldError($(this), $container);
        });
    }

    function validateCurrentStep($container) {
        const stepName = getStepName(gallagherConfig.currentStep);
        let isValid = true;
        
        // Get required fields for current step
        const $currentStepFields = $container.find(`.gallagher-form-step[data-step="${stepName}"] input[required], .gallagher-form-step[data-step="${stepName}"] select[required]`);
        
        $currentStepFields.each(function() {
            if (!validateField($(this), $container)) {
                isValid = false;
            }
        });
        
        // Additional step-specific validation
        if (stepName === 'account') {
            const password = $container.find('#password').val();
            const confirmPassword = $container.find('#confirmPassword').val();
            
            if (password !== confirmPassword) {
                showFormError($container, 'Passwords do not match');
                isValid = false;
            }
            
            if (password && password.length < 6) {
                showFormError($container, 'Password must be at least 6 characters long');
                isValid = false;
            }
        }
        
        if (stepName === 'preferences') {
            const hearAboutUs = $container.find('#hearAboutUs').val();
            const hearAboutUsOther = $container.find('#hearAboutUsOther').val();
            
            if (hearAboutUs === 'other' && !hearAboutUsOther.trim()) {
                showFormError($container, 'Please specify how you heard about us');
                isValid = false;
            }
        }
        
        return isValid;
    }

    function validateField($field, $container) {
        const value = $field.val().trim();
        const fieldType = $field.attr('type');
        const isRequired = $field.prop('required');
        
        // Required field validation
        if (isRequired && !value) {
            markFieldError($field, $container, 'This field is required');
            return false;
        }
        
        // Email validation
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                markFieldError($field, $container, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Clear any existing errors
        clearFieldError($field, $container);
        return true;
    }

    function markFieldError($field, $container, message) {
        $field.addClass('error');
        showFormError($container, message);
    }

    function clearFieldError($field, $container) {
        $field.removeClass('error');
        clearFormError($container);
    }

    function showFormError($container, message) {
        const $errorAlert = $container.find('.gallagher-alert-error');
        $container.find('.gallagher-error-message').text(message);
        $errorAlert.show();
        
        // Hide success message
        $container.find('.gallagher-alert-success').hide();
        
        // Scroll error into view
        $errorAlert[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function clearFormError($container) {
        $container.find('.gallagher-alert-error').hide();
    }

    function showFormSuccess($container, message) {
        const $successAlert = $container.find('.gallagher-alert-success');
        $container.find('.gallagher-success-message').text(message);
        $successAlert.show();
        
        // Hide error message
        $container.find('.gallagher-alert-error').hide();
    }

    function bindConditionalFields($container) {
        // "How did you hear about us" conditional field
        $container.find('#hearAboutUs').on('change', function() {
            const $otherGroup = $container.find('#hearAboutUsOtherGroup');
            const $otherInput = $container.find('#hearAboutUsOther');
            
            if ($(this).val() === 'other') {
                $otherGroup.show();
                $otherInput.prop('required', true);
            } else {
                $otherGroup.hide();
                $otherInput.prop('required', false).val('');
            }
        });
    }

    function bindCheckboxInteractions($container) {
        // Custom checkbox styling
        $container.on('change', '.gallagher-original-checkbox input[type="checkbox"]', function() {
            const $checkbox = $(this);
            const $customBox = $checkbox.siblings('.gallagher-checkbox-box');
            const $check = $customBox.find('.gallagher-checkbox-check');
            const $label = $checkbox.closest('.gallagher-original-checkbox');
            
            if ($checkbox.is(':checked')) {
                $customBox.addClass('checked');
                $check.addClass('visible');
                $label.addClass('checked');
            } else {
                $customBox.removeClass('checked');
                $check.removeClass('visible');
                $label.removeClass('checked');
            }
        });
    }

    function bindFormSubmission($container) {
        $container.find('#gallagher-signup-form').on('submit', function(e) {
            e.preventDefault();
            
            if (gallagherConfig.isSubmitting) return;
            
            if (validateCurrentStep($container)) {
                submitForm($container);
            }
        });
    }

    function submitForm($container) {
        gallagherConfig.isSubmitting = true;
        
        // Show loading state
        $container.find('.gallagher-form-loading').show();
        $container.find('#gallagher-submit-btn').prop('disabled', true);
        
        // Collect form data
        const formData = collectFormData($container);
        
        // Submit to WordPress
        $.ajax({
            url: gallagher_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'gallagher_submit_form',
                nonce: gallagher_ajax.nonce,
                ...formData
            },
            timeout: 30000,
            success: function(response) {
                if (response.success) {
                    showSuccessModal($container, response.data);
                } else {
                    showFormError($container, response.data.message || 'Failed to create account');
                }
            },
            error: function(xhr, status, error) {
                console.error('Form submission error:', error);
                if (status === 'timeout') {
                    showFormError($container, 'Request timed out. Please check your connection and try again.');
                } else {
                    showFormError($container, 'Network error. Please check your connection and try again.');
                }
            },
            complete: function() {
                gallagherConfig.isSubmitting = false;
                $container.find('.gallagher-form-loading').hide();
                $container.find('#gallagher-submit-btn').prop('disabled', false);
            }
        });
    }

    function collectFormData($container) {
        const formData = {};
        
        // Basic fields
        $container.find('#gallagher-signup-form input, #gallagher-signup-form select').each(function() {
            const $field = $(this);
            const name = $field.attr('name');
            const value = $field.val();
            
            if (name && $field.attr('type') !== 'checkbox') {
                formData[name] = value;
            }
        });
        
        // Checkboxes (interests)
        const interests = [];
        $container.find('input[name="interests[]"]:checked').each(function() {
            interests.push($(this).val());
        });
        formData.interests = interests;
        
        // Newsletter checkbox
        formData.newsletter = $container.find('input[name="newsletter"]').is(':checked') ? '1' : '0';
        
        return formData;
    }

    function showSuccessModal($container, data) {
        const $modal = $container.find('#gallagher-success-modal');
        
        // Update modal content based on demo mode
        if (data.demoMode) {
            $modal.find('.gallagher-modal-header h3').text('Demo Account Created!');
            $modal.find('.gallagher-modal-body p').text('Your demo account has been created and stored locally.');
        }
        
        $modal.show();
        
        // Bind modal close events
        $modal.find('.gallagher-modal-close, .gallagher-btn').on('click', function() {
            $modal.hide();
            // Reset form or redirect
            location.reload();
        });
        
        // Close on outside click
        $modal.on('click', function(e) {
            if (e.target === this) {
                $modal.hide();
                location.reload();
            }
        });
    }

    // Social Login
    function initializeSocialLogin($container) {
        bindSocialLoginButtons($container);
    }

    function bindSocialLoginButtons($container) {
        $container.find('.gallagher-google-btn').on('click', function() {
            handleSocialLogin($container, 'google');
        });
        
        $container.find('.gallagher-apple-btn').on('click', function() {
            handleSocialLogin($container, 'apple');
        });
    }

    function handleSocialLogin($container, provider) {
        const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
        
        // Check if Supabase is configured
        if (!gallagher_ajax.supabase_project_id || !gallagher_ajax.supabase_anon_key) {
            alert(`${providerName} login requires Supabase configuration. Please contact the administrator.`);
            return;
        }
        
        // Show configuration message
        alert(`${providerName} login requires additional setup in your Supabase dashboard. Please visit the Supabase documentation for ${provider} authentication setup instructions.`);
        
        console.log(`${providerName} login attempted - requires Supabase OAuth configuration`);
    }

    // Additional Interaction Handlers
    function initializeInteractionHandlers($container) {
        // Sign in link
        $container.find('.gallagher-link-btn').on('click', function() {
            alert('Sign in functionality would be implemented here');
        });
        
        // Modal close handlers
        $container.on('click', '.gallagher-modal-close', function() {
            $(this).closest('.gallagher-modal').hide();
        });
        
        // Close modals on outside click
        $container.on('click', '.gallagher-modal', function(e) {
            if (e.target === this) {
                $(this).hide();
            }
        });
        
        // Keyboard navigation
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                $container.find('.gallagher-modal:visible').hide();
            }
        });
    }

    // Utility Functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Gallagher Form Error:', e.error);
    });

    // Expose public API
    window.GallagherArtSchool = {
        version: GALLAGHER_VERSION,
        config: gallagherConfig,
        reinitialize: initializeGallagherForm
    };

    console.log('Gallagher Art School v' + GALLAGHER_VERSION + ' (Original Layout) - Loaded successfully');

})(jQuery);