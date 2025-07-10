# MiniPres Documentation

MiniPres is a lightweight, web-native presentation framework built with modern web technologies. It creates beautiful, interactive slide presentations that run entirely in the browser without external dependencies.

## Quick Start

```html
<!DOCTYPE html>
<html>
<head>
  <script src="minipres.js"></script>
</head>
<body>
  <slide-deck>
    <slide-page current>
      <h1>Welcome to MiniPres</h1>
      <p>A modern presentation framework</p>
    </slide-page>
    
    <slide-page>
      <h1>Second Slide</h1>
      <p>Your content here</p>
    </slide-page>
  </slide-deck>
</body>
</html>
```

---

# For Presentation Authors

*Creating slide presentations with MiniPres*

## Slide Structure

### `<slide-deck>` - Main Container

The main container for your presentation. **Important**: Only `<slide-page>` elements are allowed as children. Any other elements will be automatically removed.

**Attributes:**
- `transition` - Default transition for all slides (fade, slide, slide-rotate, zoom)
- `transition-in` - Default transition for entering slides
- `transition-out` - Default transition for exiting slides
- `zen-mode` - Enables zen mode (minimal UI)

**Example:**
```html
<slide-deck transition="fade" transition-in="slide" transition-out="zoom">
  <!-- Only slide-page elements allowed here -->
</slide-deck>
```

### `<slide-page>` - Individual Slides

Individual slides in your presentation. Each slide is 1600×1200px and scales automatically to fit the viewer's screen.

**Attributes:**
- `current` - Marks the currently active slide (only one slide should have this)
- `transition` - Override default transition for this slide
- `transition-in` - Override default entering transition
- `transition-out` - Override default exiting transition  
- `id` - Used for direct navigation (e.g., `#intro`)

**Example:**
```html
<slide-page current id="intro" transition="slide">
  <h1>Introduction</h1>
  <p>Welcome to our presentation</p>
</slide-page>
```

## Element Animations

Add progressive animations to elements within slides using the `transition` attribute. When viewers navigate through your presentation, these elements will appear one by one.

```html
<slide-page>
  <h1>Animated Elements</h1>
  <p transition="fade">This fades in</p>
  <ul>
    <li transition="slide-up">Slides up from below</li>
    <li transition="slide-left">Slides from right</li>
    <li transition="zoom-in">Scales in from small</li>
  </ul>
</slide-page>
```

**Available element transitions:**
- `fade` - Opacity transition
- `slide-up` - Slides from below
- `slide-left` - Slides from right
- `zoom-in` - Scales in from small

**Important behavior:**
- **Headings first**: h1, h2, and h3 elements appear immediately and don't participate in progressive animation
- **Sequential animation**: Other elements animate in the order they appear in your HTML
- **Accessibility**: Each element's content is announced to screen readers when it appears

## Content Guidelines

### Slide Titles
The first heading element (h1, h2, or h3) in each slide becomes the slide title for accessibility purposes. This title is announced when viewers navigate to the slide.

### Image Optimization
For better performance, especially with many images:

```html
<slide-page>
  <h1>My Images</h1>
  <img src="large-photo.jpg" loading="lazy" alt="Description">
</slide-page>
```

Use `loading="lazy"` on images. The framework will automatically optimize loading by preloading images in the current slide and adjacent slides.

## Slide Transitions

**Available slide transitions:**
- `fade` - Simple opacity transition
- `slide` - Horizontal slide movement
- `slide-rotate` - Slide with Y-axis rotation
- `zoom` - Scale in from small
- `zoom-out` - Scale out to large (reverse of zoom)

Direction is automatically detected based on navigation (next/previous).

---

# For Presentation Viewers

*Watching and interacting with MiniPres presentations*

## Navigation Controls

### Keyboard Navigation
- **→ / Space / Page Down** - Next step or slide
- **← / Page Up** - Previous step or slide  
- **F** - Toggle fullscreen mode
- **Z** - Toggle zen mode (minimal UI)

### Step-by-Step vs Slide-by-Slide
When you press the arrow keys or space, you'll advance through:
1. **Individual element animations** within the current slide (if any)
2. **Next slide** once all elements in the current slide have appeared

This allows presentation authors to reveal content progressively.

### On-Screen Controls
- **Previous/Next buttons** - Same as arrow keys
- **Slide counter** - Shows current position (e.g., "3 / 10")
- **Progress bar** - Visual indicator at bottom of screen

## Viewing Modes

### Fullscreen Mode
Press **F** to enter fullscreen for distraction-free viewing. Press **F** again or **Escape** to exit.

### Zen Mode
Press **Z** to hide navigation buttons and minimize UI elements. The slide counter becomes subtle, and only keyboard navigation remains active. Perfect for clean presentations or recordings.

## Environment Differences

### Standalone Files
When viewing a presentation as a standalone HTML file:
- **Hash navigation** works - you can bookmark specific slides (e.g., `presentation.html#slide-3`)
- **URL sharing** - share direct links to specific slides

### Embedded Presentations
When presentations are embedded in other pages or viewers:
- Hash navigation may be disabled
- All other features work normally

## Mobile and Touch Support

On mobile devices and tablets:
- **Touch-friendly controls** - Larger buttons and touch targets
- **Responsive layout** - Controls adapt to screen size and orientation
- **Landscape mode** - Controls move to sidebar on small landscape screens

---

# For Developers

*Theming, customization, and integration*

## JavaScript API

### Global Access
After loading, the slide deck is available globally:

```javascript
// Access the slide deck instance
const deck = window.slideDeck;
```

### Programmatic Control

```javascript
// Navigate slides
deck.nextSlide();           // Go to next slide
deck.previousSlide();       // Go to previous slide
deck.nextStep();            // Next step (includes element animations)
deck.previousStep();        // Previous step (includes element animations)

// Direct navigation
const targetSlide = document.getElementById('slide-3');
deck.goToSlide(targetSlide);

// Modes
deck.toggleZenMode();       // Toggle zen mode
deck.toggleFullscreen();    // Toggle fullscreen
```

### External Slide Control

You can control slides from external scripts by setting the `current` attribute:

```javascript
// Remove current from all slides
document.querySelectorAll('slide-page[current]').forEach(slide => {
  slide.removeAttribute('current');
});

// Set new current slide
document.getElementById('slide-5').setAttribute('current', '');
```

The framework ensures only one slide is current at a time and handles the transition automatically.

## Styling and Theming

### CSS Custom Properties

MiniPres uses CSS custom properties for theming:

```css
:root {
  /* Backgrounds */
  --default-deck-background: #f0f0f0;
  --default-slide-background: white;
  
  /* Colors */
  --text-color: #2d3748;
  --text-color-light: #4a5568;
  --accent-color: #667eea;
  --progress-color: #667eea;
  
  /* Controls */
  --controls-background: rgba(0, 0, 0, 0.1);
  --controls-button-background: rgba(255, 255, 255, 0.2);
  --controls-button-color: rgba(0, 15, 35, 0.8);
  --controls-counter-background: rgba(0, 0, 0, 0.3);
  --controls-counter-color: #ffffff;
  
  /* Transitions */
  --transition-duration: 0.5s;
  --transition-duration-short: 0.25s;
}
```

### Advanced Selectors

Target specific presentation states:

```css
/* Zen mode styles */
slide-deck[zen-mode] {
  /* Styles when zen mode is active */
}

/* Current slide */
slide-page[current] {
  /* Styles for the active slide */
}

/* Slides during transitions */
slide-page.slide-entering {
  /* Styles for slides entering */
}

slide-page.slide-exiting {
  /* Styles for slides exiting */
}

/* Animated elements */
[transition] {
  /* Initial state of animated elements */
}

[transition].animate-in {
  /* Final state of animated elements */
}
```

### Auto-Generated Attributes

The framework automatically adds these attributes:

```html
<slide-page id="slide-1" data-index="0" current>
  <!-- Slide content -->
</slide-page>
```

- `id` - Auto-generated if not provided (slide-1, slide-2, etc.)
- `data-index` - Zero-based slide position (0, 1, 2, etc.)
- `current` - Marks the active slide

## Integration Guidelines

### Dynamic Content
When adding/removing slides dynamically, the framework:
- Automatically removes invalid child elements from `<slide-deck>`
- Updates slide indices and IDs
- Maintains proper navigation state

### Animation Timing
Control animation timing globally or per slide:

```css
/* Global timing */
:root {
  --transition-duration: 0.8s;
  --transition-duration-short: 0.3s;
}

/* Per-slide timing */
slide-page#slow-slide {
  --transition-duration: 1.2s;
}
```

### Performance Considerations
- Images are automatically optimized with adjacent slide preloading
- Transition animations include fallback cleanup (1 second timeout)
- Use `loading="lazy"` on images for better performance

## Accessibility Features

Built-in accessibility includes:
- **Screen reader announcements** for slide changes and element animations
- **Keyboard navigation** with proper focus management
- **ARIA labels** on all interactive elements
- **Live regions** for dynamic content updates

### Custom Transitions

You can create custom slide and element transitions by defining CSS animations and keyframes.

#### Custom Slide Transitions

MiniPres applies transition classes during slide changes. Create custom slide transitions by defining keyframes and targeting the transition classes:

```css
/* Custom slide transition: spin */
@keyframes spinIn {
  from {
    transform: scale(var(--slide-scale, 1)) rotate(-180deg);
    opacity: 0;
  }
  to {
    transform: scale(var(--slide-scale, 1)) rotate(0deg);
    opacity: 1;
  }
}

@keyframes spinOut {
  from {
    transform: scale(var(--slide-scale, 1)) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: scale(var(--slide-scale, 1)) rotate(180deg);
    opacity: 0;
  }
}

/* Apply to entering slides */
slide-page.slide-entering[transition-in="spin"] {
  animation-name: spinIn;
}

/* Apply to exiting slides */
slide-page.slide-exiting[transition-out="spin"] {
  animation-name: spinOut;
}
```

**Important notes for slide transitions:**
- Use `var(--slide-scale, 1)` in transforms to maintain responsive scaling
- Target `.slide-entering` and `.slide-exiting` classes
- Use `transition-in` and `transition-out` attribute selectors
- Animation duration and timing are controlled by `--transition-duration` CSS property

#### Custom Element Transitions

Create custom element transitions by targeting the `[transition]` attribute:

```css
/* Custom element transition: bounce */
[transition="bounce"] {
  opacity: 0;
  transform: translateY(-50px) scale(0.8);
  transition: 
    opacity var(--transition-duration-short) ease,
    transform var(--transition-duration-short) cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

[transition="bounce"].animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}
```

**Element transition structure:**
- Initial state: `[transition="name"]` - hidden/transformed state
- Animated state: `[transition="name"].animate-in` - visible/final state
- Use CSS transitions, not animations (unlike slide transitions)
- Duration controlled by `--transition-duration-short`

#### Direction-Aware Transitions

For slide transitions that should behave differently based on navigation direction:

```css
/* Slide in from different directions based on navigation */
@keyframes slideInFromLeft {
  from {
    transform: scale(var(--slide-scale, 1)) translateX(-100%);
    opacity: 0;
  }
  to {
    transform: scale(var(--slide-scale, 1)) translateX(0);
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    transform: scale(var(--slide-scale, 1)) translateX(100%);
    opacity: 0;
  }
  to {
    transform: scale(var(--slide-scale, 1)) translateX(0);
    opacity: 1;
  }
}

slide-page.slide-entering[transition-in="custom-slide"] {
  animation-name: slideInFromRight;
}

slide-page.slide-entering[transition-in="custom-slide"][data-direction="prev"] {
  animation-name: slideInFromLeft;
}
```

The framework automatically sets `data-direction="prev"` when navigating backwards.

#### Complete Custom Transition Example

```css
/* Define the animations */
@keyframes flipIn {
  from {
    transform: scale(var(--slide-scale, 1)) rotateY(-90deg);
    opacity: 0;
  }
  to {
    transform: scale(var(--slide-scale, 1)) rotateY(0deg);
    opacity: 1;
  }
}

@keyframes flipOut {
  from {
    transform: scale(var(--slide-scale, 1)) rotateY(0deg);
    opacity: 1;
  }
  to {
    transform: scale(var(--slide-scale, 1)) rotateY(90deg);
    opacity: 0;
  }
}

/* Apply to slides */
slide-page.slide-entering[transition-in="flip"] {
  animation-name: flipIn;
}

slide-page.slide-exiting[transition-out="flip"] {
  animation-name: flipOut;
}
```

Use in HTML:
```html
<slide-deck transition="flip">
  <slide-page current>
    <h1>First Slide</h1>
  </slide-page>
  
  <slide-page>
    <h1>Second Slide</h1>
  </slide-page>
</slide-deck>
```

#### Animation Timing

The framework uses these CSS custom properties for timing:
- `--transition-duration` - Slide transitions (default: 0.5s)
- `--transition-duration-short` - Element transitions (default: 0.25s)

Override globally or per slide:
```css
:root {
  --transition-duration: 0.8s;
  --transition-duration-short: 0.3s;
}

/* Or for specific slides */
slide-page#slow-slide {
  --transition-duration: 1.2s;
}
```

---

# Examples and Templates

## Basic Presentation

```html
<slide-deck transition="fade">
  <slide-page current>
    <h1>Welcome</h1>
    <p>Introduction slide</p>
  </slide-page>
  
  <slide-page>
    <h1>Features</h1>
    <ul>
      <li transition="slide-up">Feature 1</li>
      <li transition="slide-up">Feature 2</li>
      <li transition="slide-up">Feature 3</li>
    </ul>
  </slide-page>
</slide-deck>
```

## Themed Presentation

```html
<style>
:root {
  --default-deck-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-color: #667eea;
  --progress-color: white;
}

.custom-slide {
  background: var(--accent-color);
  color: white;
}
</style>

<slide-deck transition="slide">
  <slide-page current class="custom-slide">
    <h1>Custom Theme</h1>
    <p>Styled with CSS custom properties</p>
  </slide-page>
</slide-deck>
```

## Progressive Animation

```html
<slide-page>
  <h1>Step-by-Step</h1>
  <p transition="fade">This appears first</p>
  <ul>
    <li transition="slide-up">Then this</li>
    <li transition="slide-up">Then this</li>
    <li transition="slide-up">Finally this</li>
  </ul>
  <p transition="zoom-in">With a big finish!</p>
</slide-page>
```

## Two-Column Layout

```html
<style>
[layout=two-column] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}
</style>

<slide-page>
  <h1>Comparison</h1>
  <div layout="two-column">
    <section transition="slide-left">
      <h3>Before</h3>
      <ul>
        <li>Old way</li>
        <li>Complex setup</li>
      </ul>
    </section>
    <section transition="slide-left">
      <h3>After</h3>
      <ul>
        <li>Simple HTML</li>
        <li>Modern features</li>
      </ul>
    </section>
  </div>
</slide-page>
```

---

# Technical Reference

## Browser Support

- **Modern browsers** with Web Components support
- **CSS Custom Properties** required for theming
- **Shadow DOM** for component encapsulation
- **Fullscreen API** for fullscreen mode

## Performance Tips

1. **Use lazy loading** for images: `loading="lazy"`
2. **Optimize images** before including in presentations
3. **Use system fonts** when possible for faster loading
4. **Test on mobile devices** for responsive behavior
5. **Keep slide count reasonable** for better performance

## File Structure

- `minipres.js` - Main framework file (~1300 lines)
- `presentation.html` - Your presentation file
- Include the script and start building slides!

The framework creates completely self-contained HTML presentations that work offline and can be easily shared.
