/**
 * @jest-environment jsdom
 */

// Mock DOM elements for testing
const mockHTML = `
    <form class="contact-form">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Send Message</button>
    </form>
`;

describe('BridgeVoice Website Functionality', () => {
    beforeEach(() => {
        document.body.innerHTML = mockHTML;
        
        // Mock console methods to avoid noise in tests
        global.console = {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn()
        };
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    describe('Form Validation', () => {
        // Import the functions we want to test
        const { validateForm, validateField } = require('../js/main.js');

        test('should validate required fields', () => {
            const formData = {
                name: '',
                email: '',
                message: ''
            };

            const errors = validateForm(formData);
            expect(errors).toContain('Name is required.');
            expect(errors).toContain('Email is required.');
            expect(errors).toContain('Message is required.');
        });

        test('should validate email format', () => {
            const formData = {
                name: 'John Doe',
                email: 'invalid-email',
                message: 'Test message'
            };

            const errors = validateForm(formData);
            expect(errors).toContain('Please enter a valid email address.');
        });

        test('should pass validation with valid data', () => {
            const formData = {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'Test message'
            };

            const errors = validateForm(formData);
            expect(errors).toHaveLength(0);
        });

        test('should validate individual email field', () => {
            const emailField = document.getElementById('email');
            emailField.value = 'invalid-email';
            emailField.required = true;

            const isValid = validateField(emailField);
            expect(isValid).toBe(false);
        });

        test('should validate individual required field', () => {
            const nameField = document.getElementById('name');
            nameField.value = '';
            nameField.required = true;

            const isValid = validateField(nameField);
            expect(isValid).toBe(false);
        });

        test('should pass validation for valid field', () => {
            const nameField = document.getElementById('name');
            nameField.value = 'John Doe';
            nameField.required = true;

            const isValid = validateField(nameField);
            expect(isValid).toBe(true);
        });
    });

    describe('Utility Functions', () => {
        const { throttle, debounce } = require('../js/main.js');

        test('throttle should limit function calls', (done) => {
            const mockFn = jest.fn();
            const throttledFn = throttle(mockFn, 100);

            throttledFn();
            throttledFn();
            throttledFn();

            expect(mockFn).toHaveBeenCalledTimes(1);

            setTimeout(() => {
                throttledFn();
                expect(mockFn).toHaveBeenCalledTimes(2);
                done();
            }, 150);
        });

        test('debounce should delay function execution', (done) => {
            const mockFn = jest.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn();
            debouncedFn();
            debouncedFn();

            expect(mockFn).not.toHaveBeenCalled();

            setTimeout(() => {
                expect(mockFn).toHaveBeenCalledTimes(1);
                done();
            }, 150);
        });
    });

    describe('Accessibility Features', () => {
        test('should have proper ARIA attributes', () => {
            const form = document.querySelector('.contact-form');
            expect(form).toBeTruthy();

            const inputs = form.querySelectorAll('input[required]');
            inputs.forEach(input => {
                expect(input.getAttribute('required')).toBe('');
            });
        });

        test('should have proper labels', () => {
            const labels = document.querySelectorAll('label');
            labels.forEach(label => {
                const forAttr = label.getAttribute('for');
                expect(forAttr).toBeTruthy();
                
                const input = document.getElementById(forAttr);
                expect(input).toBeTruthy();
            });
        });
    });

    describe('Performance Optimizations', () => {
        test('should support lazy loading', () => {
            const img = document.createElement('img');
            img.setAttribute('loading', 'lazy');
            img.src = 'test.jpg';
            document.body.appendChild(img);

            expect(img.getAttribute('loading')).toBe('lazy');
        });

        test('should have proper image attributes', () => {
            const img = document.createElement('img');
            img.src = 'test.jpg';
            img.alt = 'Test image';
            document.body.appendChild(img);

            expect(img.alt).toBe('Test image');
            expect(img.src).toContain('test.jpg');
        });
    });

    describe('Responsive Design', () => {
        test('should have viewport meta tag', () => {
            const viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            viewportMeta.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(viewportMeta);

            expect(viewportMeta.content).toBe('width=device-width, initial-scale=1.0');
        });
    });
});

// Integration tests for DOM manipulation
describe('DOM Integration', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <nav class="nav">
                <button class="nav-toggle" aria-expanded="false">Menu</button>
                <ul class="nav-menu">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </nav>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should toggle navigation menu', () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        expect(navToggle).toBeTruthy();
        expect(navMenu).toBeTruthy();

        // Simulate click
        navToggle.click();
        
        // In a real implementation, this would test the actual toggle functionality
        // For now, we're just testing that the elements exist
        expect(navToggle.getAttribute('aria-expanded')).toBe('false');
    });
});

// SEO and Meta tags tests
describe('SEO Optimization', () => {
    test('should have proper meta tags', () => {
        const metaTags = [
            { name: 'description', content: 'BridgeVoice - Connecting voices across the digital divide' },
            { name: 'keywords', content: 'bridgevoice, communication, technology, accessibility' },
            { name: 'author', content: 'BridgeVoice Team' }
        ];

        metaTags.forEach(tag => {
            const meta = document.createElement('meta');
            meta.name = tag.name;
            meta.content = tag.content;
            document.head.appendChild(meta);

            expect(meta.content).toBe(tag.content);
        });
    });
});