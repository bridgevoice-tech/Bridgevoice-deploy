/**
 * BridgeVoice Website JavaScript
 * Modern, accessible, and performance-optimized
 */

'use strict';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initializeNavigation();
    initializeLazyLoading();
    initializeFormValidation();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeAccessibilityEnhancements();

    // Performance monitoring
    measurePerformance();
});

/**
 * Navigation Menu Toggle
 */
function initializeNavigation () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function () {
        const isOpen = navMenu.classList.contains('active');

        // Toggle menu
        navMenu.classList.toggle('active');

        // Update ARIA attributes
        navToggle.setAttribute('aria-expanded', !isOpen);

        // Update hamburger animation
        navToggle.classList.toggle('active');

        // Focus management
        if (!isOpen) {
            const firstMenuItem = navMenu.querySelector('a');
            if (firstMenuItem) {
                firstMenuItem.focus();
            }
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('active');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('active');
            navToggle.focus();
        }
    });

    // Close menu when clicking on nav links
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('active');
        });
    });
}

/**
 * Lazy Loading Implementation
 */
function initializeLazyLoading () {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('lazy-loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        images.forEach(img => {
            img.classList.add('lazy-loading');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.classList.add('lazy-loaded');
        });
    }
}

/**
 * Form Validation
 */
function initializeFormValidation () {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate form
        const errors = validateForm(data);

        if (errors.length === 0) {
            // Form is valid, show success message
            showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            // Show errors
            showFormErrors(errors);
        }
    });

    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', function () {
            validateField(field);
        });

        field.addEventListener('input', function () {
            // Remove error state when user starts typing
            field.classList.remove('error');
            const errorMessage = field.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
}

/**
 * Validate individual form field
 */
function validateField (field) {
    const value = field.value.trim();
    const fieldType = field.type || field.tagName.toLowerCase();
    let error = '';

    // Required field validation
    if (field.required && !value) {
        error = `${field.labels[0]?.textContent || 'This field'} is required.`;
    }

    // Email validation
    if (fieldType === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            error = 'Please enter a valid email address.';
        }
    }

    // Show or hide error
    if (error) {
        showFieldError(field, error);
        return false;
    } else {
        hideFieldError(field);
        return true;
    }
}

/**
 * Validate entire form
 */
function validateForm (data) {
    const errors = [];

    if (!data.name?.trim()) {
        errors.push('Name is required.');
    }

    if (!data.email?.trim()) {
        errors.push('Email is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Please enter a valid email address.');
    }

    if (!data.message?.trim()) {
        errors.push('Message is required.');
    }

    return errors;
}

/**
 * Show field error
 */
function showFieldError (field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    field.parentNode.appendChild(errorElement);

    // Add error styles if not already present
    if (!document.querySelector('.error-styles')) {
        const style = document.createElement('style');
        style.className = 'error-styles';
        style.textContent = `
            .form-group input.error,
            .form-group textarea.error {
                border-color: #dc3545;
                background-color: #f8d7da;
            }
            .error-message {
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Hide field error
 */
function hideFieldError (field) {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');

    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/**
 * Show form message
 */
function showFormMessage (message, type) {
    const form = document.querySelector('.contact-form');
    const existingMessage = form.querySelector('.form-message');

    if (existingMessage) {
        existingMessage.remove();
    }

    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.setAttribute('role', 'alert');

    form.insertBefore(messageElement, form.firstChild);

    // Add message styles if not already present
    if (!document.querySelector('.message-styles')) {
        const style = document.createElement('style');
        style.className = 'message-styles';
        style.textContent = `
            .form-message {
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 8px;
                font-weight: 500;
            }
            .form-message.success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            .form-message.error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
        `;
        document.head.appendChild(style);
    }

    // Auto-hide success messages
    if (type === 'success') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

/**
 * Show form errors
 */
function showFormErrors (errors) {
    const errorMessage = errors.length === 1
        ? errors[0]
        : `Please fix the following errors:\n• ${errors.join('\n• ')}`;

    showFormMessage(errorMessage, 'error');
}

/**
 * Smooth Scroll Implementation
 */
function initializeSmoothScroll () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu?.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.querySelector('.nav-toggle')?.setAttribute('aria-expanded', 'false');
                }

                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Focus the target for accessibility
                target.focus();
            }
        });
    });
}

/**
 * Scroll Animations
 */
function initializeScrollAnimations () {
    if (!('IntersectionObserver' in window)) return;

    const animateElements = document.querySelectorAll('.service-card, .stat, .about-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Accessibility Enhancements
 */
function initializeAccessibilityEnhancements () {
    // Add focus indicators for better keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add keyboard navigation styles
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #0066cc !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);

    // Announce dynamic content changes to screen readers
    window.announceToScreenReader = function (message) {
        const announcement = document.createElement('div');
        announcement.textContent = message;
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    };
}

/**
 * Performance Monitoring
 */
function measurePerformance () {
    if ('performance' in window) {
        window.addEventListener('load', function () {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;

                // Log performance metrics (in production, send to analytics)
                /* eslint-disable no-console */
                console.log('Page Load Time:', loadTime + 'ms');
                console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart + 'ms');

                // Measure Core Web Vitals
                if ('web-vitals' in window) {
                    // This would typically use the web-vitals library
                    // For now, we'll use basic performance API
                    const cls = 0; // Cumulative Layout Shift
                    const fid = 0; // First Input Delay
                    const lcp = perfData.loadEventEnd - perfData.fetchStart; // Largest Contentful Paint approximation

                    console.log('Core Web Vitals:', { cls, fid, lcp });
                }
                /* eslint-enable no-console */
            }, 0);
        });
    }
}

/**
 * Utility Functions
 */

// Throttle function for performance optimization
function throttle (func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// Debounce function for performance optimization
function debounce (func, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Error handling
window.addEventListener('error', function (e) {
    /* eslint-disable no-console */
    console.error('JavaScript error:', e.error);
    /* eslint-enable no-console */
    // In production, send errors to monitoring service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function (e) {
    /* eslint-disable no-console */
    console.error('Unhandled promise rejection:', e.reason);
    /* eslint-enable no-console */
    // In production, send errors to monitoring service
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        throttle,
        debounce
    };
}
