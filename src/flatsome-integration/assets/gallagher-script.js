/**
 * Gallagher Art School - JavaScript functionality
 * Handles multi-step form, carousel, admin dashboard, and Supabase integration
 */

(function($) {
    'use strict';

    // Global variables
    let currentStep = 0;
    let currentSlide = 0;
    let isLoading = false;
    let isPlaying = true;
    let carouselInterval = null;
    let direction = 1; // 1 for forward, -1 for backward
    let adminData = {
        students: {},
        subscribers: []
    };

    // Enhanced slide data for carousel
    const slides = [
        {
            title: "Master the Art of Drawing",
            subtitle: "From beginner sketches to advanced techniques",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ctaText: "Start Drawing"
        },
        {
            title: "Explore Vibrant Painting",
            subtitle: "Watercolors, oils, and mixed media",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ctaText: "Learn Painting"
        },
        {
            title: "Digital Art & Design",
            subtitle: "Modern techniques for the digital age",
            image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ctaText: "Go Digital"
        },
        {
            title: "Sculpture & 3D Art",
            subtitle: "Shape your imagination into reality",
            image: "https://images.unsplash.com/photo-1452457807411-4979b707c5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            ctaText: "Start Sculpting"
        }
    ];

    const interests = ['Drawing', 'Painting', 'Digital Art', 'Sculpture', 'Photography', 'Printmaking', 'Mixed Media', 'Ceramics'];

    // Initialize when document is ready
    $(document).ready(function() {
        initializeCarousel();
        initializeForm();
        initializeAdminDashboard();
        setBackgroundImage();
    });

    // Background image setup
    function setBackgroundImage() {
        const container = $('.gallagher-signup-container');
        const bgImage = container.data('background');
        if (bgImage) {
            container.css('--gallagher-bg-image', `url('${bgImage}')`);
        }
    }

    // Enhanced Carousel functionality
    function initializeCarousel() {
        createCarouselStructure();
        startCarousel();

        // Navigation click handlers
        $(document).on('click', '.gallagher-carousel-nav.prev', function() {
            direction = -1;
            goToPrevSlide();
        });

        $(document).on('click', '.gallagher-carousel-nav.next', function() {
            direction = 1;
            goToNextSlide();
        });

        // Play/pause control
        $(document).on('click', '.gallagher-carousel-control', function() {
            togglePlayPause();
        });

        // Indicator click handlers
        $(document).on('click', '.gallagher-indicator', function() {
            const targetSlide = parseInt($(this).data('slide'));
            direction = targetSlide > currentSlide ? 1 : -1;
            goToSlide(targetSlide);
        });

        // Initial carousel update
        updateCarousel();
    }

    function createCarouselStructure() {
        const $panel = $('.gallagher-carousel-panel');
        
        // Add slides container if it doesn't exist
        if (!$panel.find('.gallagher-carousel-slides').length) {
            let slidesHtml = '<div class="gallagher-carousel-slides">';
            
            slides.forEach((slide, index) => {
                slidesHtml += `
                    <div class="gallagher-carousel-slide ${index === 0 ? 'active' : ''}" 
                         style="background-image: url('${slide.image}')">
                        <div class="gallagher-carousel-overlay"></div>
                    </div>
                `;
            });
            
            slidesHtml += '</div>';
            $panel.prepend(slidesHtml);
        }

        // Add navigation controls if they don't exist
        if (!$panel.find('.gallagher-carousel-nav').length) {
            $panel.append(`
                <button class="gallagher-carousel-nav prev" aria-label="Previous slide">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                </button>
                <button class="gallagher-carousel-nav next" aria-label="Next slide">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </button>
            `);
        }

        // Add play/pause control if it doesn't exist
        if (!$panel.find('.gallagher-carousel-control').length) {
            $panel.append(`
                <button class="gallagher-carousel-control" aria-label="Play/Pause carousel">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pause-icon">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="play-icon" style="display: none;">
                        <polygon points="5,3 19,12 5,21"></polygon>
                    </svg>
                </button>
            `);
        }

        // Add progress bar if it doesn't exist
        if (!$panel.find('.gallagher-carousel-progress').length) {
            $panel.append(`
                <div class="gallagher-carousel-progress">
                    <div class="gallagher-carousel-progress-fill"></div>
                </div>
            `);
        }
    }

    function startCarousel() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        
        if (isPlaying) {
            carouselInterval = setInterval(function() {
                direction = 1;
                goToNextSlide();
            }, 4000);
            
            // Start progress bar animation
            startProgressBar();
        }
    }

    function startProgressBar() {
        const $progressFill = $('.gallagher-carousel-progress-fill');
        $progressFill.css({
            'width': '0%',
            'transition': 'width 4s linear'
        });
        
        // Force reflow
        $progressFill[0].offsetHeight;
        
        // Start animation
        $progressFill.css('width', '100%');
    }

    function resetProgressBar() {
        const $progressFill = $('.gallagher-carousel-progress-fill');
        $progressFill.css({
            'width': '0%',
            'transition': 'none'
        });
    }

    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function togglePlayPause() {
        isPlaying = !isPlaying;
        
        const $control = $('.gallagher-carousel-control');
        const $pauseIcon = $control.find('.pause-icon');
        const $playIcon = $control.find('.play-icon');
        
        if (isPlaying) {
            $pauseIcon.show();
            $playIcon.hide();
            startCarousel();
        } else {
            $pauseIcon.hide();
            $playIcon.show();
            clearInterval(carouselInterval);
            resetProgressBar();
        }
    }

    function updateCarousel() {
        const slide = slides[currentSlide];
        
        // Update slide content
        $('#gallagher-slide-title').text(slide.title);
        $('#gallagher-slide-subtitle').text(slide.subtitle);
        
        // Update CTA button if it exists
        const $ctaButton = $('#gallagher-slide-cta');
        if ($ctaButton.length && slide.ctaText) {
            $ctaButton.text(slide.ctaText);
        }
        
        // Update background images with smooth transition
        $('.gallagher-carousel-slide').removeClass('active entering exiting');
        $(`.gallagher-carousel-slide:eq(${currentSlide})`).addClass('active');
        
        // Update indicators
        $('.gallagher-indicator').removeClass('active');
        $('.gallagher-indicator[data-slide="' + currentSlide + '"]').addClass('active');
        
        // Reset and restart progress bar if playing
        if (isPlaying) {
            resetProgressBar();
            setTimeout(startProgressBar, 100);
        }
        
        // Restart content animations
        restartContentAnimations();
    }

    function restartContentAnimations() {
        const $content = $('.gallagher-carousel-content');
        $content.find('h1, .gallagher-subtitle, .gallagher-slide-content').css('animation', 'none');
        
        // Force reflow
        $content[0].offsetHeight;
        
        // Restart animations
        $content.find('h1').css('animation', 'gallagher-fade-in-up 0.6s ease forwards 0.2s');
        $content.find('.gallagher-subtitle').css('animation', 'gallagher-fade-in-up 0.6s ease forwards 0.4s');
        $content.find('.gallagher-slide-content').css('animation', 'gallagher-fade-in-up 0.6s ease forwards 0.6s');
    }

    // Form functionality
    function initializeForm() {
        // Navigation button handlers
        $('#gallagher-next-btn').click(handleNext);
        $('#gallagher-prev-btn').click(handlePrev);

        // Form submission
        $('#gallagher-signup-form').submit(function(e) {
            e.preventDefault();
            if (currentStep === 2) {
                handleSubmit();
            }
        });

        // Real-time validation
        $('#email').on('blur', validateEmail);
        $('#password, #confirmPassword').on('input', validatePasswords);

        updateStep();
    }

    function handleNext() {
        if (isLoading) return;

        if (!validateCurrentStep()) {
            return;
        }

        if (currentStep < 2) {
            currentStep++;
            updateStep();
        } else {
            handleSubmit();
        }
    }

    function handlePrev() {
        if (isLoading || currentStep === 0) return;

        currentStep--;
        updateStep();
    }

    function validateCurrentStep() {
        clearError();

        switch (currentStep) {
            case 0: // Personal info
                if (!$('#firstName').val().trim()) {
                    showError('First name is required');
                    return false;
                }
                if (!$('#lastName').val().trim()) {
                    showError('Last name is required');
                    return false;
                }
                if (!validateEmail()) {
                    return false;
                }
                break;

            case 1: // Preferences
                if (!$('#experience').val()) {
                    showError('Please select your experience level');
                    return false;
                }
                break;

            case 2: // Account
                if (!$('#password').val()) {
                    showError('Password is required');
                    return false;
                }
                if ($('#password').val().length < 6) {
                    showError('Password must be at least 6 characters long');
                    return false;
                }
                if (!validatePasswords()) {
                    return false;
                }
                break;
        }

        return true;
    }

    function validateEmail() {
        const email = $('#email').val().trim();
        if (!email) {
            showError('Email is required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            showError('Please enter a valid email address');
            return false;
        }
        return true;
    }

    function validatePasswords() {
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        
        if (password && confirmPassword && password !== confirmPassword) {
            showError('Passwords do not match');
            return false;
        }
        return true;
    }

    function updateStep() {
        // Update step indicators
        $('.gallagher-step-indicator').each(function(index) {
            $(this).removeClass('active completed');
            if (index === currentStep) {
                $(this).addClass('active');
            } else if (index < currentStep) {
                $(this).addClass('completed');
            }
        });

        // Update step connectors
        $('.gallagher-step-connector').each(function(index) {
            $(this).removeClass('completed');
            if (index < currentStep) {
                $(this).addClass('completed');
            }
        });

        // Update progress bar
        const progress = ((currentStep + 1) / 3) * 100;
        $('.gallagher-progress-fill').css('width', progress + '%');

        // Update step description
        const descriptions = [
            'Tell us about yourself',
            'What interests you?',
            'Set up your login'
        ];
        $('#gallagher-step-description').text(descriptions[currentStep]);

        // Show/hide form steps
        $('.gallagher-form-step').addClass('gallagher-hidden');
        $('#gallagher-step-' + (currentStep + 1)).removeClass('gallagher-hidden');

        // Update navigation buttons
        $('#gallagher-prev-btn').prop('disabled', currentStep === 0);
        
        const nextBtn = $('#gallagher-next-btn');
        if (currentStep === 2) {
            nextBtn.html('<span class="gallagher-btn-text">Create Account</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg>');
        } else {
            nextBtn.html('Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg>');
        }
    }

    function handleSubmit() {
        if (isLoading || !validateCurrentStep()) return;

        setLoading(true);
        clearError();

        // Collect form data
        const formData = {
            firstName: $('#firstName').val().trim(),
            lastName: $('#lastName').val().trim(),
            email: $('#email').val().trim(),
            phone: $('#phone').val().trim(),
            birthDate: $('#birthDate').val(),
            experience: $('#experience').val(),
            interests: getSelectedInterests(),
            password: $('#password').val(),
            newsletter: $('#newsletter').is(':checked')
        };

        // Submit to Supabase
        submitToSupabase(formData);
    }

    function getSelectedInterests() {
        const selected = [];
        $('input[name="interests"]:checked').each(function() {
            selected.push($(this).val());
        });
        return selected;
    }

    function submitToSupabase(formData) {
        const projectId = gallagher_config.supabase_project_id;
        const anonKey = gallagher_config.supabase_anon_key;

        if (!projectId || !anonKey) {
            showError('Supabase configuration is missing. Please check your settings.');
            setLoading(false);
            return;
        }

        const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-9c2430a9/signup`;

        $.ajax({
            url: apiUrl,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${anonKey}`
            },
            data: JSON.stringify(formData),
            success: function(response) {
                console.log('Signup successful:', response);
                showSuccess();
            },
            error: function(xhr) {
                console.error('Signup error:', xhr);
                let errorMessage = 'Failed to create account. Please try again.';
                
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                } else if (xhr.responseText) {
                    try {
                        const errorData = JSON.parse(xhr.responseText);
                        if (errorData.error) {
                            errorMessage = errorData.error;
                        }
                    } catch (e) {
                        // Use default error message
                    }
                }
                
                showError(errorMessage);
            },
            complete: function() {
                setLoading(false);
            }
        });
    }

    function showSuccess() {
        // Hide form and show success message
        $('#gallagher-signup-form').addClass('gallagher-hidden');
        $('#gallagher-success').removeClass('gallagher-hidden');
        
        // Reset form after 5 seconds
        setTimeout(function() {
            resetForm();
        }, 5000);
    }

    function resetForm() {
        $('#gallagher-signup-form')[0].reset();
        currentStep = 0;
        updateStep();
        $('#gallagher-signup-form').removeClass('gallagher-hidden');
        $('#gallagher-success').addClass('gallagher-hidden');
        clearError();
    }

    function setLoading(loading) {
        isLoading = loading;
        
        const nextBtn = $('#gallagher-next-btn');
        const prevBtn = $('#gallagher-prev-btn');
        
        if (loading) {
            nextBtn.prop('disabled', true);
            prevBtn.prop('disabled', true);
            
            if (currentStep === 2) {
                nextBtn.html('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="gallagher-spinner"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg> Creating Account...');
            }
        } else {
            nextBtn.prop('disabled', false);
            prevBtn.prop('disabled', currentStep === 0);
            updateStep(); // Reset button text
        }

        // Disable form inputs
        $('#gallagher-signup-form input, #gallagher-signup-form select, #gallagher-signup-form button').prop('disabled', loading);
    }

    function showError(message) {
        $('#gallagher-error-text').text(message);
        $('#gallagher-error').removeClass('gallagher-hidden');
        $('#gallagher-success').addClass('gallagher-hidden');
    }

    function clearError() {
        $('#gallagher-error').addClass('gallagher-hidden');
    }

    // Social login handlers
    window.gallagherSocialLogin = function(provider) {
        alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login requires additional setup in your Supabase dashboard. Please visit https://supabase.com/docs/guides/auth/social-login/auth-${provider} for setup instructions.`);
    };

    // Admin Dashboard functionality
    function initializeAdminDashboard() {
        // Load admin data when dashboard is shown
        $(document).on('click', '.gallagher-tab-btn', function() {
            const tabId = $(this).data('tab') || $(this).text().toLowerCase().replace(/\s+/g, '-');
            gallagherShowTab(tabId);
        });
    }

    window.gallagherShowAdmin = function() {
        $('.gallagher-main-content').addClass('gallagher-hidden');
        $('#gallagher-admin-dashboard').removeClass('gallagher-hidden');
        gallagherLoadAdminData();
    };

    window.gallagherHideAdmin = function() {
        $('#gallagher-admin-dashboard').addClass('gallagher-hidden');
        $('.gallagher-main-content').removeClass('gallagher-hidden');
    };

    window.gallagherShowTab = function(tabName) {
        // Update tab buttons
        $('.gallagher-tab-btn').removeClass('active');
        $(`.gallagher-tab-btn:contains("${tabName.replace('-', ' ')}")`).addClass('active');

        // Show correct tab content
        $('.gallagher-tab-content').removeClass('active');
        $(`#gallagher-tab-${tabName}`).addClass('active');
    };

    window.gallagherLoadAdminData = function() {
        const projectId = gallagher_config.supabase_project_id;
        const anonKey = gallagher_config.supabase_anon_key;

        if (!projectId || !anonKey) {
            $('#gallagher-interests-data').html('<p>Supabase configuration is missing. Please check your settings.</p>');
            return;
        }

        // Load students by interest
        loadStudentsByInterest(projectId, anonKey);
        
        // Load newsletter subscribers
        loadNewsletterSubscribers(projectId, anonKey);
    };

    function loadStudentsByInterest(projectId, anonKey) {
        let totalEnrollments = 0;
        let uniqueStudents = new Set();
        
        const promises = interests.map(interest => {
            return $.ajax({
                url: `https://${projectId}.supabase.co/functions/v1/make-server-9c2430a9/students/by-interest/${encodeURIComponent(interest)}`,
                headers: {
                    'Authorization': `Bearer ${anonKey}`
                }
            }).then(response => {
                adminData.students[interest] = response.students || [];
                totalEnrollments += adminData.students[interest].length;
                adminData.students[interest].forEach(student => uniqueStudents.add(student.id));
                return { interest, students: adminData.students[interest] };
            }).catch(() => {
                adminData.students[interest] = [];
                return { interest, students: [] };
            });
        });

        Promise.all(promises).then(() => {
            // Update stats
            $('#gallagher-total-enrollments').text(totalEnrollments);
            $('#gallagher-unique-students').text(uniqueStudents.size);
            
            // Render interests grid
            renderInterestsGrid();
        });
    }

    function loadNewsletterSubscribers(projectId, anonKey) {
        $.ajax({
            url: `https://${projectId}.supabase.co/functions/v1/make-server-9c2430a9/newsletter/subscribers`,
            headers: {
                'Authorization': `Bearer ${anonKey}`
            },
            success: function(response) {
                adminData.subscribers = response.subscribers || [];
                $('#gallagher-newsletter-count').text(adminData.subscribers.length);
                renderNewsletterList();
            },
            error: function() {
                adminData.subscribers = [];
                $('#gallagher-newsletter-count').text(0);
                renderNewsletterList();
            }
        });
    }

    function renderInterestsGrid() {
        let html = '';
        
        interests.forEach(interest => {
            const students = adminData.students[interest] || [];
            html += `
                <div class="gallagher-interest-card">
                    <div class="gallagher-interest-header">
                        <h4>${interest}</h4>
                        <span class="gallagher-interest-badge">${students.length}</span>
                    </div>
                    <div class="gallagher-students-list">
            `;
            
            if (students.length > 0) {
                students.slice(0, 3).forEach(student => {
                    const date = new Date(student.createdAt).toLocaleDateString();
                    html += `
                        <div class="gallagher-student-item">
                            <div class="gallagher-student-name">${student.name}</div>
                            <div class="gallagher-student-meta">${student.experience} • ${date}</div>
                        </div>
                    `;
                });
                
                if (students.length > 3) {
                    html += `<div class="gallagher-student-meta">+${students.length - 3} more students</div>`;
                }
            } else {
                html += '<div class="gallagher-student-meta">No students yet</div>';
            }
            
            html += '</div></div>';
        });
        
        $('#gallagher-interests-data').html(html);
    }

    function renderNewsletterList() {
        let html = '';
        
        if (adminData.subscribers.length > 0) {
            adminData.subscribers.forEach(subscriber => {
                const date = new Date(subscriber.subscribedAt).toLocaleDateString();
                html += `
                    <div class="gallagher-newsletter-item">
                        <div class="gallagher-newsletter-info">
                            <h5>${subscriber.firstName} ${subscriber.lastName}</h5>
                            <p>${subscriber.email}</p>
                        </div>
                        <div class="gallagher-newsletter-date">${date}</div>
                    </div>
                `;
            });
        } else {
            html = '<div style="text-align: center; padding: 2rem; color: #6b7280;">No newsletter subscribers yet</div>';
        }
        
        $('#gallagher-newsletter-data').html(html);
    }

    window.gallagherExportCSV = function(type) {
        let data = [];
        let filename = '';
        
        if (type === 'students') {
            // Flatten all students into one array
            Object.keys(adminData.students).forEach(interest => {
                adminData.students[interest].forEach(student => {
                    data.push({
                        name: student.name,
                        email: student.email,
                        interest: interest,
                        experience: student.experience,
                        created_at: student.createdAt
                    });
                });
            });
            filename = 'students-by-interest.csv';
        } else if (type === 'newsletter') {
            data = adminData.subscribers.map(sub => ({
                first_name: sub.firstName,
                last_name: sub.lastName,
                email: sub.email,
                subscribed_at: sub.subscribedAt
            }));
            filename = 'newsletter-subscribers.csv';
        }
        
        if (data.length === 0) {
            alert('No data to export');
            return;
        }
        
        exportToCSV(data, filename);
    };

    function exportToCSV(data, filename) {
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).map(val => `"${val}"`).join(',')).join('\n');
        const csv = `${headers}\n${rows}`;
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Add spinner CSS animation
    const style = document.createElement('style');
    style.textContent = `
        .gallagher-spinner {
            animation: gallagher-spin 1s linear infinite;
        }
        
        @keyframes gallagher-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

})(jQuery);