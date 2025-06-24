# MiniPres - Modern Web Presentation Framework

This project is a lightweight, web-native presentation framework built with modern web technologies. It creates beautiful, interactive slide presentations that run entirely in the browser without external dependencies.

## Architecture

- **Custom Elements**: Modern web component approach
- **CSS Transforms**: Hardware-accelerated scaling and animations
- **Self-contained**: Complete presentations in single HTML files

## Core Components

### `src/minipres.js`

The main JavaScript framework (900+ lines) that implements:

- **Web Components**: Custom elements (`slide-deck`, `slide-page`, `slide-viewport`)
- **Slide Management**: Navigation, transitions, and state management
- **Responsive Design**: Automatic scaling with fixed 4:3 aspect ratio (1600×1200px slides)
- **Accessibility**: Screen reader support, keyboard navigation, live regions
- **Animation System**: CSS-based transitions (fade, slide, zoom) with progressive element animations
- **Smart Features**: Image preloading, hash-based navigation, zen mode

### `src/custom-slides-demo.html`

A comprehensive demo presentation showcasing all framework features, including:

- Feature demonstrations with progressive element animations
- Technical documentation slides

## Important Instructions

- in addition to the usual POSIX utils, you can use the following tools: ripgrep, fzf, fd, GNU awk, curl, eza, jq.
- use the `void` keyword and no curly braces in arrow functions that have only one statement, where the return value does not matter.
