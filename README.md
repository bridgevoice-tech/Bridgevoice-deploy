# BridgeVoice Website

A modern, accessible, and performance-optimized website for BridgeVoice - connecting voices across the digital divide.

## Features

### 🎨 Modern UI/UX
- Clean, intuitive design with responsive layout
- Mobile-first approach with cross-device compatibility
- Smooth animations and transitions
- Professional color scheme and typography

### ♿ Accessibility (WCAG 2.1 AA Compliant)
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Descriptive alt text for images
- Proper heading structure and semantic HTML
- Focus indicators and ARIA labels
- Skip links for better navigation

### 🚀 Performance Optimizations
- Optimized assets (images, CSS, JavaScript)
- Lazy loading for images
- Minified CSS and JavaScript
- Efficient CSS Grid and Flexbox layouts
- Performance monitoring and Core Web Vitals tracking

### 🔧 Code Quality
- Clean, modular code structure
- ES6+ JavaScript with modern features
- Comprehensive error handling
- Proper separation of concerns
- Documented and maintainable code

### 🧪 Testing & Quality Assurance
- Unit tests with Jest
- ESLint for code quality
- Prettier for code formatting
- Accessibility testing with axe-core and pa11y
- Lighthouse performance audits
- Cross-browser compatibility

### 🔄 CI/CD Pipeline
- Automated testing on push/PR
- Code quality checks
- Performance and accessibility audits
- Automated deployment to GitHub Pages

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bridgevoice-tech/Bridgevoice-deploy.git
cd Bridgevoice-deploy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The website will be available at `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run validate` - Run linting and tests
- `npm run lighthouse` - Run Lighthouse audit
- `npm run optimize` - Build and run performance audit

## Project Structure

```
/
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js            # Main JavaScript file
├── images/
│   ├── hero-image.svg     # Hero section image
│   ├── voice-bridge.svg   # Service icons
│   ├── accessibility.svg
│   └── real-time.svg
├── __tests__/
│   └── main.test.js       # Unit tests
├── .github/
│   └── workflows/
│       └── ci-cd.yml      # GitHub Actions workflow
├── index.html             # Main page
├── privacy.html           # Privacy policy
├── terms.html             # Terms of service
├── accessibility.html     # Accessibility statement
├── package.json           # Dependencies and scripts
├── .eslintrc.json         # ESLint configuration
├── .prettierrc.json       # Prettier configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Technologies Used

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Interactive functionality and performance optimization
- **SVG** - Scalable vector graphics for icons and images

### Development Tools
- **Jest** - JavaScript testing framework
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Lighthouse** - Performance and accessibility auditing
- **GitHub Actions** - CI/CD pipeline

### Performance Features
- Lazy loading for images
- CSS and JavaScript minification
- Optimized font loading
- Efficient asset management
- Core Web Vitals monitoring

## Accessibility Features

This website is designed to be fully accessible and compliant with WCAG 2.1 AA standards:

- **Keyboard Navigation**: All interactive elements are accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast**: Supports high contrast mode
- **Focus Management**: Clear focus indicators and logical tab order
- **Alternative Text**: Descriptive alt text for all images
- **Responsive Design**: Works across all device sizes
- **Color Contrast**: Meets minimum contrast ratios
- **Form Accessibility**: Proper labels and error handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Run linting: `npm run lint`
6. Commit your changes: `git commit -m 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Email: info@bridgevoice.com
- Website: https://bridgevoice-tech.github.io/Bridgevoice-deploy/
- GitHub: https://github.com/bridgevoice-tech/Bridgevoice-deploy

## Acknowledgments

- Design inspiration from modern accessibility-first websites
- Icons and graphics created with accessibility in mind
- Performance optimization techniques from web.dev
- Accessibility guidelines from WCAG 2.1 and A11Y Project