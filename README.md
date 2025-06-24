# MiniPres - Modern Web Presentation Framework

A lightweight, web-native presentation framework built with modern web technologies. Create beautiful, interactive slide presentations that run entirely in the browser without external dependencies.

## ✨ Features

- **🧩 Web Components**: Built with custom elements for clean, semantic HTML
- **📱 Responsive Design**: Automatic scaling with fixed 4:3 aspect ratio (1600×1200px slides)
- **🎨 Flexible Theming**: Comprehensive CSS custom properties for styling
- **⚡ Progressive Animations**: Element-level transitions with multiple animation types
- **🖼️ Smart Image Loading**: Lazy loading with adjacent slide preloading
- **⌨️ Full Keyboard Navigation**: Space, arrows, and zen mode shortcuts
- **🎯 Self-contained**: Complete presentations in single HTML files
- **♿ Accessibility**: Screen reader support and ARIA attributes
- **🧘 Zen Mode**: Distraction-free presentation mode

## 🚀 Quick Start

1. Include the framework:
```html
<script src="minipres.js"></script>
```

2. Create your presentation:
```html
<slide-deck transition="fade">
  <slide-page current>
    <h1>Welcome</h1>
    <p>My first slide</p>
  </slide-page>
  
  <slide-page transition="slide">
    <h1>Features</h1>
    <ul>
      <li transition="slide-up">Feature 1</li>
      <li transition="slide-up">Feature 2</li>
    </ul>
  </slide-page>
</slide-deck>
```

3. Open in a browser - that's it!

## 🧩 Web Components

### `<slide-deck>`

The main container that manages the entire presentation.

**Attributes:**
- `transition` - Default transition for all slides (`fade`, `slide`, `zoom`)
- `zen-mode` - Enable zen mode (hides navigation buttons)

**Example:**
```html
<slide-deck transition="fade" zen-mode>
  <!-- slides here -->
</slide-deck>
```

### `<slide-page>`

Individual slides within the presentation.

**Attributes:**
- `current` - Marks the initially visible slide
- `transition` - Override default transition for this slide
- `id` - Unique identifier for hash navigation

**Example:**
```html
<slide-page current transition="zoom" id="intro">
  <h1>Introduction</h1>
  <p>Content here</p>
</slide-page>
```

### `<slide-viewport>`

Automatically created container that handles scaling and positioning.

## 🎨 Theming System

MiniPres uses CSS custom properties for comprehensive theming support:

### Controls Theming
```css
:root {
  /* Navigation buttons */
  --controls-button-background: rgba(255, 255, 255, 0.9);
  --controls-button-text: #333;
  --controls-button-border: 1px solid rgba(0, 0, 0, 0.1);
  --controls-button-border-radius: 8px;
  --controls-button-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --controls-button-opacity: 1;
  
  /* Slide counter */
  --controls-counter-background: rgba(0, 0, 0, 0.7);
  --controls-counter-text: white;
  --controls-counter-border-radius: 6px;
  --controls-counter-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  --controls-counter-opacity: 1;
  
  /* Controls backdrop */
  --controls-backdrop-background: rgba(0, 0, 0, 0.05);
}
```

### Slide Styling
```css
slide-deck {
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

slide-page {
  background: white;
  color: #333;
}
```

## ✨ Progressive Animations

Add smooth animations to any element within slides:

### Available Transitions
- `fade` - Simple opacity transition
- `slide-up` - Slides in from bottom
- `slide-left` - Slides in from right
- `zoom-in` - Scales in with opacity

### Usage
```html
<slide-page>
  <h1>Always shows immediately</h1>
  <p transition="fade">Fades in after headline</p>
  <ul>
    <li transition="slide-up">Animates in sequence</li>
    <li transition="slide-up">One after another</li>
    <li transition="slide-up">Creating smooth flow</li>
  </ul>
</slide-page>
```

### Slide Transitions
Set transitions at the deck or slide level:

```html
<!-- Global default -->
<slide-deck transition="fade">
  <slide-page>Uses fade transition</slide-page>
  <slide-page transition="slide">Overrides with slide</slide-page>
  <slide-page transition="zoom">Overrides with zoom</slide-page>
</slide-deck>
```

## ⌨️ Navigation & Controls

### Keyboard Shortcuts
- **→ / Space / PgDown** - Next step or slide
- **← / PgUp** - Previous step or slide  
- **Z** - Toggle zen mode
- **F** - Fullscreen (browser dependent)

### UI Controls
- **Previous/Next buttons** - Click navigation
- **Slide counter** - Shows current position (X / Y)
- **Progress bar** - Visual progress indicator

### Hash Navigation
When loaded as standalone HTML, slides with IDs support hash navigation:
```html
<slide-page id="intro">...</slide-page>
<!-- Navigate to: presentation.html#intro -->
```

## 🧘 Zen Mode

Perfect for presentations and recordings:
- Hides navigation buttons completely
- Makes controls backdrop transparent
- Reduces slide counter opacity to 30%
- Keyboard navigation remains fully functional

Activate with:
- Press `Z` key
- Add `zen-mode` attribute: `<slide-deck zen-mode>`

## 📱 Responsive Design

MiniPres automatically adapts to different screen sizes:

### Breakpoints
- **Portrait Mobile**: Width ≤ 640px
- **Landscape Mobile**: Height ≤ 640px
- **Desktop**: Default layout

### Mobile Portrait
- Reduced margins for better space utilization
- Same column-based control layout
- Optimized touch targets

### Mobile Landscape  
- Horizontal flex layout
- Sidebar controls (120px width)
- Vertical button stack
- Compact sizing for limited height

## 🖼️ Smart Image Loading

Optimized performance for image-heavy presentations:

### Lazy Loading
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

### Automatic Preloading
- Current slide images load immediately
- Adjacent slides (previous + next) preload automatically
- Changes `loading="lazy"` to `loading="eager"` when needed
- Works correctly with absolute slide positioning

## ♿ Accessibility

Built-in accessibility features:

### ARIA Support
```html
<slide-deck aria-label="Presentation: Your Title">
  <slide-page aria-label="Slide 1: Introduction">
    <!-- content -->
  </slide-page>
</slide-deck>
```

### Screen Reader Support
- Live regions announce slide changes
- Proper heading hierarchy
- Descriptive button labels
- Status updates for navigation

### Keyboard Navigation
- Full presentation control without mouse
- Logical tab order
- Standard keyboard shortcuts

## 🏗️ Architecture

### Core Technologies
- **Web Components** - Custom elements with Shadow DOM
- **CSS Transforms** - Hardware-accelerated scaling and animations  
- **ResizeObserver** - Responsive scaling system
- **MutationObserver** - Self-healing component validation
- **CSS Custom Properties** - Flexible theming system

### File Structure
```
src/
├── minipres.js           # Main framework (900+ lines)
└── custom-slides-demo.html  # Feature demonstration
```

### Browser Support
- Modern browsers with Web Components support
- Chrome 54+, Firefox 63+, Safari 10.1+, Edge 79+

## 📝 Usage Examples

### Basic Presentation
```html
<!DOCTYPE html>
<html>
<head>
  <script src="minipres.js"></script>
</head>
<body>
  <slide-deck>
    <slide-page current>
      <h1>Hello World</h1>
    </slide-page>
  </slide-deck>
</body>
</html>
```

### Advanced Styling
```html
<slide-deck transition="slide" style="
  --background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
">
  <slide-page class="title-slide" id="intro">
    <h1>Advanced Presentation</h1>
    <p transition="fade">With custom styling</p>
  </slide-page>
  
  <slide-page transition="zoom">
    <h1>Features</h1>
    <ul>
      <li transition="slide-up">Progressive animations</li>
      <li transition="slide-up">Responsive design</li>
      <li transition="slide-up">Lazy image loading</li>
    </ul>
  </slide-page>
</slide-deck>
```

### Two-Column Layout
```html
<slide-page>
  <h1>Comparison</h1>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <div transition="slide-left">
      <h3>Before</h3>
      <p>Old approach...</p>
    </div>
    <div transition="slide-left">
      <h3>After</h3>
      <p>New solution...</p>
    </div>
  </div>
</slide-page>
```

## 🔧 Implementation Details

### Fixed Aspect Ratio
- All slides are 1600×1200px (4:3 ratio)
- Automatically scales to fit viewport
- Maintains proportions across devices

### Performance Optimizations
- Minimal JavaScript footprint
- CSS-based animations for smooth performance
- Smart image preloading reduces loading delays
- Event delegation for efficient listeners

### Self-contained Design
- No external dependencies
- Complete presentations in single HTML files
- Works offline and in any hosting environment

## 🎯 Best Practices

### Content Structure
- Use semantic HTML for better accessibility
- Keep slide content focused and readable
- Test on mobile devices for responsive behavior

### Performance
- Optimize images before including in presentations
- Use `loading="lazy"` on non-critical images
- Keep slide count reasonable for large presentations

### Styling
- Use CSS custom properties for consistent theming
- Test color contrast for accessibility
- Consider zen mode appearance during design

---

**MiniPres** - Built with modern web standards for the modern web. Create presentations that work everywhere, load fast, and look beautiful on any device.