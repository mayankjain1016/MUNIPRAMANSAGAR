# Muni Praman Sagar - Official Website

A modern, responsive website for Muni Praman Sagar Ji, featuring spiritual content, events, news, and multimedia resources.

## 🎯 Project Overview

This is a professional spiritual website built with React + Vite, showcasing teachings, events, and resources from Muni Praman Sagar Ji. The website provides a clean, modern interface with full responsiveness across all devices.

## ✨ Features

### Core Functionality
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop
- **Hero Slider**: Dynamic image carousel showcasing important events and announcements
- **Search Functionality**: Shanka (question) search with suggestions
- **Quick Links**: Easy navigation to key sections (प्रवचन, शंका समाधान, भावना योग, etc.)
- **Events & News**: Combined section displaying current location, upcoming events, and latest news
- **Gallery**: Visual showcase of events and activities
- **Trending Videos**: Featured video content with YouTube integration
- **Shanka Samadhan**: Curated spiritual Q&A section
- **Newsletter Subscription**: WhatsApp channel subscription integration
- **Book Promotion**: Featured book banner (भावना योग - फील टू हील)

### Technical Features
- Modern React architecture with component-based design
- Sticky navigation with dropdown menu
- Smooth scroll animations
- Back-to-top button
- Professional color scheme with brown, gold, and cream tones
- Custom SVG icons
- Optimized images and assets

## 🏗️ Project Structure

```
maharaj/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── backgroundimg1.jpeg
│   │   ├── hero.png
│   │   ├── Page.jpeg
│   │   ├── sliderimg1.jpeg
│   │   ├── sliderimg2.jpeg
│   │   └── sliderimg3.jpeg
│   ├── components/
│   │   ├── BookBanner.jsx          # Book promotion banner
│   │   ├── EventsAndNews.jsx       # Combined events and news section
│   │   ├── Footer.jsx              # Site footer with links and contact
│   │   ├── Gallery.jsx             # Image gallery component
│   │   ├── HeroSlider.jsx          # Main hero carousel
│   │   ├── Navbar.jsx              # Navigation header
│   │   ├── QuickLinks.jsx          # Quick navigation cards
│   │   ├── ShankaSamadhan.jsx      # Q&A section
│   │   ├── ShankhaSearch.jsx       # Search functionality
│   │   ├── Subscribe.jsx           # Subscription section
│   │   └── TrendingVideos.jsx      # Video showcase
│   ├── pages/
│   │   └── HomePage.jsx            # Main homepage layout
│   ├── App.css                     # Main stylesheet
│   ├── App.jsx                     # Root component
│   ├── index.css                   # Global styles
│   └── main.jsx                    # Entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── PROJECT.md                      # This file
├── README.md
└── vite.config.js
```

## 🎨 Design System

### Color Palette
- **Primary Brown**: `#5a3008` - Main brand color
- **Dark Brown**: `#3d1f00` - Headers and emphasis
- **Gold**: `#c8960a` - Accent and highlights
- **Light Gold**: `#f5c842` - Secondary accent
- **Cream**: `#faf6f0` - Background
- **Orange**: `#d4600a` - Call-to-action elements
- **Green**: `#1a7a50` - Success and positive actions

### Typography
- **Primary Font**: Noto Sans Devanagari (for Hindi/Devanagari text)
- **Fallback**: Segoe UI, system-ui, sans-serif

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 769px - 1024px
- **Desktop**: > 1024px (max-width: 1200px container)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maharaj
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📦 Dependencies

### Core
- **react**: ^18.3.1
- **react-dom**: ^18.3.1

### Build Tools
- **vite**: ^6.0.5
- **@vitejs/plugin-react**: ^4.3.4

### Development
- **eslint**: ^9.17.0
- **eslint-plugin-react**: ^7.37.2
- **eslint-plugin-react-hooks**: ^5.0.0
- **eslint-plugin-react-refresh**: ^0.4.16

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and optimized builds. Configuration is in `vite.config.js`.

### ESLint Configuration
Code quality is maintained with ESLint. Configuration is in `eslint.config.js`.

## 📱 Components Documentation

### Navbar
- Sticky header with logo and menu
- Responsive hamburger menu for mobile
- Dropdown navigation with smooth transitions

### HeroSlider
- Full-width image carousel
- Navigation arrows and dot indicators
- Auto-responsive height based on screen size

### EventsAndNews
- Three-column grid layout (responsive)
- Current location display
- Upcoming events list
- Latest news feed with dates

### Gallery
- Responsive grid layout
- Placeholder icons with background colors
- Hover effects and captions

### Footer
- Four-column grid (responsive)
- About section
- Navigation links
- Contact information
- Social media links
- Copyright notice

## 🎯 Key Pages

### HomePage (`/`)
Main landing page containing all sections:
1. Book Banner
2. Shanka Search
3. Hero Slider
4. Quick Links
5. Events & News
6. Gallery
7. Trending Videos
8. Shanka Samadhan
9. Subscribe Section

## 🌐 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Optimization
- Lazy loading for images
- Optimized asset sizes
- Minimal CSS and JavaScript
- Fast Vite build system
- Component-based architecture for code splitting

## 🔐 Security
- No sensitive data in frontend
- Sanitized user inputs
- Secure external links

## 🤝 Contributing
This is a private project for Muni Praman Sagar Ji. For contributions or suggestions, please contact the development team.

## 📄 License
© 2025 ALL RIGHTS RESERVED BY PRAMANIK SAMOOH

## 📞 Contact Information
- **Location**: Gunayatan, Kundkund Marg, Madhuban, Jharkhand 825329
- **Phone**: +91-7543076063
- **Social Media**: Instagram, YouTube, Twitter, Facebook

## 🔄 Version History
- **v1.0.0** (2025): Initial professional redesign
  - Complete UI/UX overhaul
  - Responsive design implementation
  - Component restructuring
  - Performance optimization

## 🎓 Development Notes

### Architecture Decisions
1. **Component-Based**: Each section is a separate component for maintainability
2. **Page Structure**: HomePage combines all components for easy routing expansion
3. **CSS Organization**: Single App.css for consistent styling and easy maintenance
4. **Asset Management**: All images in assets folder with proper imports

### Future Enhancements
- [ ] Add routing for multiple pages
- [ ] Implement actual search functionality
- [ ] Connect to backend API for dynamic content
- [ ] Add authentication for admin panel
- [ ] Implement video player integration
- [ ] Add language switcher (Hindi/English)
- [ ] Implement dark mode
- [ ] Add analytics tracking
- [ ] Optimize images with lazy loading
- [ ] Add PWA support

## 🐛 Known Issues
None currently. Report issues to the development team.

## 💡 Tips for Developers

### Adding New Components
1. Create component in `src/components/`
2. Import in `HomePage.jsx`
3. Add styles in `App.css`
4. Follow existing naming conventions

### Styling Guidelines
- Use CSS variables for colors
- Follow mobile-first approach
- Use flexbox/grid for layouts
- Maintain consistent spacing (multiples of 4px)
- Add hover states for interactive elements

### Code Style
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic
- Follow ESLint rules

---

**Built with ❤️ for Muni Praman Sagar Ji and Pramanik Samooh**
