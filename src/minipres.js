"use strict";

/**
 * Utility function that interleaves template literal strings with interpolated values.
 * Used internally by tagged template functions like css() and html().
 *
 * @param {string[]} strings The template literal string parts
 * @param {any[]} values The interpolated values
 * @returns {string} The combined string with values interpolated
 */
function zipStrings(strings, values) {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += values[i] + strings[i + 1];
  }
  return result;
}

/****************************************************** STYLES *******************************************************/

/**
 * [UNSAFE] Tagged template literal function for creating CSS CSSStyleSheet.
 *
 * WARNING: This function does not perform sanitization. Do NOT use it with user input.
 *
 * @param {string[]} strings
 * @param  {...any} args
 * @returns {CSSStyleSheet} the style new style sheet
 */
function css(strings, ...args) {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(zipStrings(strings, args));
  return sheet;
}

const GLOBAL_STYLE = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    overflow: hidden;
  }

  /* Keyframe animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes slideIn3DLeft {
    from {
      transform: scale(var(--slide-scale, 1)) translateX(100%) translateZ(-100px);
      opacity: 0;
    }

    to {
      transform: scale(var(--slide-scale, 1)) translateX(0) translateZ(0);
      opacity: 1;
    }
  }

  @keyframes slideOut3DLeft {
    from {
      transform: scale(var(--slide-scale, 1)) translateX(0) translateZ(0);
      opacity: 1;
    }

    to {
      transform: scale(var(--slide-scale, 1)) translateX(-100%) translateZ(-100px);
      opacity: 0;
    }
  }

  @keyframes slideIn3DRight {
    from {
      transform: scale(var(--slide-scale, 1)) translateX(-100%) translateZ(-100px);
      opacity: 0;
    }

    to {
      transform: scale(var(--slide-scale, 1)) translateX(0) translateZ(0);
      opacity: 1;
    }
  }

  @keyframes slideOut3DRight {
    from {
      transform: scale(var(--slide-scale, 1)) translateX(0) translateZ(0);
      opacity: 1;
    }

    to {
      transform: scale(var(--slide-scale, 1)) translateX(100%) translateZ(-100px);
      opacity: 0;
    }
  }

  @keyframes zoomIn {
    from {
      transform: scale(calc(var(--slide-scale, 1) * 0.8));
      opacity: 0;
    }

    to {
      transform: scale(var(--slide-scale, 1));
      opacity: 1;
    }
  }

  @keyframes zoomOut {
    from {
      transform: scale(var(--slide-scale, 1));
      opacity: 1;
    }

    to {
      transform: scale(calc(var(--slide-scale, 1) * 0.8));
      opacity: 0;
    }
  }

  slide-page {
    width: 1600px;
    height: 1200px;
    transform-origin: center center;
    box-sizing: border-box;
    padding: 80px;
    background: var(--default-slide-background);
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: scale(var(--slide-scale, 1));

    /* Default state - hidden */
    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    /* Current slide - visible */
    &[current],
    &.slide-entering,
    &.slide-exiting {
      visibility: visible;
      pointer-events: auto;
    }

    &[current] {
      opacity: 1;
    }

    &[transition="fade"] {
      &.slide-entering {
        animation-name: fadeIn;
      }

      &.slide-exiting {
        animation-name: fadeOut;
      }
    }

    &[transition="slide"] {
      &.slide-entering {
        animation-name: slideIn3DLeft;

        &[data-direction="prev"] {
          animation-name: slideIn3DRight;
        }
      }

      &.slide-exiting {
        animation-name: slideOut3DLeft;

        &[data-direction="prev"] {
          animation-name: slideOut3DRight;
        }
      }
    }

    &[transition="zoom"] {
      &.slide-entering {
        animation-name: zoomIn;
      }

      &.slide-exiting {
        animation-name: zoomOut;
      }
    }

    /* Typography */
    h1 {
      font-size: 5rem;
      font-weight: 700;
      margin-bottom: 3rem;
      text-align: center;
      color: var(--text-color);
      line-height: 1.2;
    }

    h2 {
      font-size: 4rem;
      font-weight: 600;
      margin-bottom: 2rem;
      color: var(--text-color-light);
      text-align: center;
    }

    h3 {
      font-size: 3rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
      color: var(--accent-color);
    }

    p {
      font-size: 2.5rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      color: var(--text-color-light);
      text-align: center;
    }

    ul {
      font-size: 2.5rem;
      margin-left: 3rem;
      color: var(--text-color-light);

      li {
        margin: 1.5rem 0;

        &::marker {
          color: var(--accent-color);
          font-size: 3rem;
        }
      }
    }

    pre {
      background: #2d3748;
      color: #e2e8f0;
      padding: 2rem;
      border-radius: 12px;
      font-size: 1.8rem;
      line-height: 1.5;
      overflow-x: auto;
      margin: 2rem 0;
    }

    code {
      background: #f7fafc;
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
      font-family: "Monaco", "Menlo", monospace;
      font-size: 0.9em;
      color: var(--accent-color);
    }

    /* Element transitions with a11y */
    [transition] {
      opacity: 0;
      transition:
        opacity var(--transition-duration-short) ease,
        transform var(--transition-duration-short) ease;
      visibility: hidden;
    }

    [transition="fade-in"] {
      opacity: 1;
      /* redundant; for completeness */
    }

    [transition="slide-up"] {
      transform: translateY(40px);
    }

    [transition="slide-left"] {
      transform: translateX(40px);
    }

    [transition="zoom-in"] {
      transform: scale(0.8);
    }

    [transition].animate-in {
      opacity: 1;
      transform: none;
      visibility: visible;
    }
  }

  /* Animation classes */
  .slide-entering,
  .slide-exiting {
    animation-duration: var(--transition-duration);
    animation-fill-mode: both;
    animation-timing-function: ease;
  }

  live-region {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

document.adoptedStyleSheets.push(GLOBAL_STYLE);

const SLIDE_DECK_STYLE = css`
  slide-deck-root {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: var(--background, var(--default-deck-background));
    position: relative;

    &:focus {
      outline: 3px solid var(--accent-color);
      outline-offset: -3px;
    }

    &[zen-mode] slide-controls {
      background: transparent;
      backdrop-filter: none;
      position: absolute;
      bottom: 0;

      button {
        display: none;
      }

      slide-counter {
        opacity: 0.3;
      }
    }
  }

  slide-viewport {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    margin: 48px;
    box-sizing: border-box;
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  slide-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    gap: 15px;
    background: var(--control-background);
    backdrop-filter: blur(10px);
    flex-shrink: 0;

    button {
      padding: 15px 25px;
      background: var(--button-background);
      color: var(--button-text);
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      transition: all 0.2s ease;

      &:hover {
        background: var(--surface-color);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      }

      &:focus {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    @media not ((max-height: 640px) and (orientation: landscape)) {
      #prevBtn {
        margin-left: auto;
      }

      #nextBtn {
        margin-left: 1rem;
      }
    }
  }

  slide-counter {
    display: flex;
    align-items: center;
    color: var(--counter-text);
    font-size: 1.2rem;
    background: var(--counter-background);
    padding: 10px 20px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    transition: opacity 0.3s ease;
  }

  slide-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    width: 100%;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--progress-color);
      width: var(--progress, 0%);
      transition: width 0.3s ease;
    }
  }

  /* Mobile responsive */
  @media (max-width: 640px), (max-height: 640px) {
    slide-viewport {
      margin: 24px;
    }
  }

  @media (max-height: 640px) and (orientation: landscape) {
    slide-deck-root {
      flex-direction: row;
    }

    slide-viewport {
      flex-grow: 1;
      margin: 24px;
      margin-right: 12px;
    }

    slide-controls {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 12px;
      width: 120px;
      gap: 10px;

      button {
        padding: 8px 12px;
        font-size: 0.9rem;
        white-space: nowrap;
      }
    }

    slide-counter {
      font-size: 0.9rem;
      padding: 6px 12px;
      text-align: center;
    }

    slide-progress {
      right: 120px;
    }
  }
`;

/***************************************************** TEMPLATES *****************************************************/

/**
 * [UNSAFE] Tagged template literal function for creating a `<template>` element.
 *
 * WARNING: This function does not perform sanitization. Do NOT use it with user input.
 *
 * @param {*} strings
 * @param  {...any} args
 * @returns {HTMLTemplateElement}
 */
function html(strings, ...args) {
  const template = document.createElement("template");
  template.innerHTML = zipStrings(strings, args);
  return template;
}

const SLIDE_DECK_TEMPLATE = html`
  <slide-deck-root>
    <slide-viewport role="main">
      <slot></slot>
    </slide-viewport>

    <slide-controls role="toolbar" aria-label="Presentation controls">
      <slide-counter aria-live="polite" aria-label="Current slide"></slide-counter>
      <button id="prevBtn" aria-label="Previous step or slide">← Previous</button>
      <button id="nextBtn" aria-label="Next step or slide">Next →</button>
    </slide-controls>

    <slide-progress></slide-progress>
  </slide-deck-root>
`;

/**************************************************** COMPONENTS *****************************************************/

/**
 * Custom element representing a single slide page with progressive element animations.
 * Manages the animation state of elements with the [transition] attribute within the slide.
 */
class SlidePage extends HTMLElement {
  /** @type {number} */
  currentElementIndex = 0;
  /** @type {Element[]} */
  animatedElements = [];

  /**
   * Called when the element is added to the DOM.
   * Initializes the list of animated elements, sets up transition attribute, and resets state.
   */
  connectedCallback() {
    // Set up transition attribute if not already set
    if (!this.hasAttribute("transition")) {
      const deck = this.closest("slide-deck");
      const defaultTransition = deck?.defaultTransition || "fade";
      this.setAttribute("transition", defaultTransition);
    }

    this.animatedElements = Array.from(this.querySelectorAll("[transition]"));
    this.reset();
  }

  /**
   * Resets the slide to its initial state, clearing all element animations.
   *
   * @param {Object} [options] Configuration options
   * @param {boolean} [options.back=false] If true, resets to the end state (all elements visible)
   */
  reset(options) {
    const { back } = Object.assign({ back: false }, options);
    this.currentElementIndex = back ? Math.max(0, this.animatedElements.length - 1) : 0;

    for (const el of this.animatedElements) {
      if (back) el.classList.add("animate-in");
      else el.classList.remove("animate-in");
    }
  }

  /**
   * Advances to the next element animation step.
   *
   * @returns {boolean} True if an element was animated in, false if no more elements to animate
   */
  next() {
    if (this.currentElementIndex == this.animatedElements.length) return false;
    this.animateInElement(this.currentElementIndex);
    this.currentElementIndex++;
    return true;
  }

  /**
   * Goes back to the previous element animation step.
   *
   * @returns {boolean} True if an element was animated out, false if no more elements to animate out
   */
  previous() {
    if (this.currentElementIndex == 0) return false; // might be -1 if there are no elements to be animated
    this.animateOutElement(this.currentElementIndex);
    this.currentElementIndex--;
    return true;
  }

  /**
   * Animates in a specific element by index, adding the 'animate-in' class.
   * Also announces the element's text content to screen readers.
   *
   * @param {number} index The index of the element to animate in
   */
  animateInElement(index) {
    if (index < this.animatedElements.length) {
      const element = this.animatedElements[index];
      element.classList.add("animate-in");

      const textContent = element.textContent?.trim();
      if (textContent) {
        LiveRegion.announce(textContent);
      }
    }
  }

  /**
   * Animates out a specific element by index, removing the 'animate-in' class.
   *
   * @param {number} index The index of the element to animate out
   */
  animateOutElement(index) {
    if (index < this.animatedElements.length) {
      const element = this.animatedElements[index];
      element.classList.remove("animate-in");
    }
  }

  /**
   * Preloads all lazy-loaded images in this slide by changing them to eager loading.
   * Improves performance by loading images before they're needed.
   */
  preloadImages() {
    const lazyImages = this.querySelectorAll('img[loading="lazy"]');
    for (const img of lazyImages) {
      img.loading = "eager";
    }
  }
}

/**
 * Custom element that manages the viewport for slides, handling responsive scaling.
 * Automatically scales slides to fit within the available viewport while maintaining aspect ratio.
 */
class SlideViewport extends HTMLElement {
  /** @type {ResizeObserver} */
  resizeObserver;

  /**
   * Called when the element is added to the DOM.
   * Sets up initial scaling and resize observation.
   */
  connectedCallback() {
    this.updateScale();
    this.resizeObserver = new ResizeObserver(() => this.updateScale());
    this.resizeObserver.observe(this);
  }

  /**
   * Calculates and applies the appropriate scale factor for slides based on viewport size.
   * Maintains the fixed 4:3 aspect ratio (1600×1200px) of slides.
   */
  updateScale() {
    const viewport = this.closest("slide-viewport");
    if (!viewport) return;

    const availableWidth = viewport.clientWidth;
    const availableHeight = viewport.clientHeight;

    const scaleX = availableWidth / 1600;
    const scaleY = availableHeight / 1200;
    const scale = Math.min(scaleX, scaleY);

    viewport.style.setProperty("--slide-scale", scale);
  }

  /**
   * Called when the element is removed from the DOM.
   * Cleans up the resize observer.
   */
  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }
}

/**
 * Main presentation deck component that manages slides, navigation, and user interactions.
 * Provides keyboard navigation, hash-based URLs, fullscreen support, and accessibility features.
 */
class SlideDeck extends HTMLElement {
  /** @type {string} */
  defaultTransition;
  /** @type {boolean} */
  isArtifactEnvironment;
  /** @type {boolean} */
  isTransitioning = false;
  /** @type {ShadowRoot} */
  shadow;
  /** @type {Function} */
  keydownHandler;
  /** @type {Function} */
  hashChangeHandler;
  /** @type {MutationObserver} */
  mutationObserver;

  /** Creates a new SlideDeck instance with shadow DOM. */
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.append(SLIDE_DECK_TEMPLATE.content.firstElementChild.cloneNode(true));
    this.shadow.adoptedStyleSheets.push(SLIDE_DECK_STYLE);
  }

  /**
   * Called when the element is added to the DOM.
   * Initializes all slide deck functionality including event listeners, navigation, and accessibility.
   */
  connectedCallback() {
    this.cleanupSlot();
    this.setupMutationObserver();

    this.defaultTransition = this.getAttribute("transition") || "fade";
    this.isArtifactEnvironment = document.body.id === "artifacts-component-root-html";

    this.keydownHandler = this.handleKeydown.bind(this);
    document.addEventListener("keydown", this.keydownHandler);

    if (!this.isArtifactEnvironment) {
      this.hashChangeHandler = this.handleHashChange.bind(this);
      window.addEventListener("hashchange", this.hashChangeHandler);
    }

    this.setAttribute("tabindex", "0");
    this.setAttribute("role", "application");
    this.shadow.getElementById("prevBtn").addEventListener("click", this.previousStep.bind(this));
    this.shadow.getElementById("nextBtn").addEventListener("click", this.nextStep.bind(this));
    this.focus();

    this.setupSlideIds();
    this.initializeFromHash();
    this.preloadAdjacentImages();
    this.updateUI();
    this.updateHashInfo();

    window.slideDeck = this;
  }

  /**
   * Called when the element is removed from the DOM.
   * Cleans up event listeners and other resources.
   */
  disconnectedCallback() {
    if (this.keydownHandler) {
      document.removeEventListener("keydown", this.keydownHandler);
    }
    if (this.hashChangeHandler) {
      window.removeEventListener("hashchange", this.hashChangeHandler);
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  /**
   * Removes any non-slide-page children from the slot.
   * Ensures only valid slide elements are present.
   */
  cleanupSlot() {
    for (const child of Array.from(this.children)) {
      if (child.tagName !== "SLIDE-PAGE") {
        child.remove();
      }
    }
  }

  /**
   * Sets up MutationObserver to watch for DOM changes.
   * Handles current attribute changes and invalid child additions.
   */
  setupMutationObserver() {
    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          let shouldUpdateIndices = false;
          
          // Remove invalid children as they're added
          for (const node of mutation.addedNodes) {
            if (node.nodeType === 1 && node.tagName !== "SLIDE-PAGE") {
              node.remove();
            } else if (node.nodeType === 1 && node.tagName === "SLIDE-PAGE") {
              shouldUpdateIndices = true;
            }
          }
          
          // Check if any slide-page nodes were removed
          for (const node of mutation.removedNodes) {
            if (node.nodeType === 1 && node.tagName === "SLIDE-PAGE") {
              shouldUpdateIndices = true;
              break;
            }
          }
          
          // Update IDs and indices if slides were added/removed
          if (shouldUpdateIndices) {
            this.setupSlideIds();
          }
        } else if (mutation.type === "attributes" && mutation.attributeName === "current") {
          const target = mutation.target;
          if (target.tagName === "SLIDE-PAGE" && target.hasAttribute("current")) {
            // External script set current on a slide - clear others and update state
            this.ensureSingleCurrentSlide(target);
            this.updateUI();
            this.updateHash();
            this.preloadAdjacentImages();
          }
        }
      }
    });

    this.mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["current"],
    });
  }

  /**
   * Ensures only one slide has the current attribute.
   * @param {Element} currentSlide The slide that should be current
   */
  ensureSingleCurrentSlide(currentSlide) {
    for (const slide of this.querySelectorAll("slide-page[current]")) {
      if (slide !== currentSlide) {
        slide.removeAttribute("current");
      }
    }
  }

  /**
   * Assigns unique IDs and data-index attributes to slides.
   * IDs are used for hash-based navigation, data-index for position-based operations.
   */
  setupSlideIds() {
    const slides = this.slidePages;
    for (let i = 0; i < slides.length; i++) {
      if (!slides[i].id) {
        slides[i].id = `slide-${i + 1}`;
      }
      slides[i].dataset.index = i.toString();
    }
  }

  /** @returns {SlidePage} The current slide element */
  get currentSlide() {
    return this.querySelector("slide-page[current]");
  }

  /** @returns {NodeList} All slide pages */
  get slidePages() {
    return this.querySelectorAll("slide-page");
  }

  /** @returns {Element} The slide-deck-root element */
  get deckRoot() {
    return this.shadow.querySelector("slide-deck-root");
  }

  /**
   * Initializes the slide deck from URL hash or defaults to first slide.
   * In artifact environment, always starts from first slide.
   */
  initializeFromHash() {
    const slides = this.slidePages;
    if (slides.length === 0) return;

    if (this.isArtifactEnvironment) {
      slides[0].setAttribute("current", "");
      this.currentSlide.reset();
      return;
    }

    const hash = window.location.hash.slice(1);
    if (hash) {
      const targetSlide = this.querySelector(`slide-page#${hash}`);
      if (targetSlide) {
        // Clear all current attributes
        for (const slide of this.querySelectorAll("slide-page[current]")) {
          slide.removeAttribute("current");
        }
        targetSlide.setAttribute("current", "");
        targetSlide.reset();
        return;
      }
    }

    // Default to first slide
    slides[0].setAttribute("current", "");
    this.currentSlide.reset();
    this.updateHash();
  }

  /** Handles browser hash changes to navigate to the corresponding slide. */
  handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const targetSlide = this.querySelector(`slide-page#${hash}`);
      if (targetSlide && targetSlide !== this.currentSlide) {
        this.goToSlide(targetSlide);
      }
    }
  }

  /**
   * Updates the browser URL hash to reflect the current slide.
   * Does nothing in artifact environment.
   */
  updateHash() {
    if (this.isArtifactEnvironment) return;

    const currentSlide = this.currentSlide;
    if (currentSlide && currentSlide.id) {
      const newHash = `#${currentSlide.id}`;
      if (window.location.hash !== newHash) {
        try {
          window.history.replaceState(null, null, newHash);
        } catch (e) {
          console.log("Hash navigation disabled in this environment");
        }
      }
    }
  }

  /**
   * Navigates to a specific slide element.
   * @param {Element} targetSlide The target slide element
   * @param {string} [direction] The direction of navigation ("next" or "prev"), auto-detected if not provided
   */
  goToSlide(targetSlide, direction) {
    if (!targetSlide || targetSlide === this.currentSlide) return;

    // Auto-detect direction if not provided
    if (!direction) {
      const current = this.currentSlide;
      if (current) {
        let sibling = current.nextElementSibling;
        while (sibling) {
          if (sibling === targetSlide) {
            direction = "next";
            break;
          }
          sibling = sibling.nextElementSibling;
        }
        if (!direction) direction = "prev";
      } else {
        direction = "next";
      }
    }

    this.performSlideTransition(targetSlide, direction);
  }

  /**
   * Handles keyboard navigation and shortcuts.
   * @param {KeyboardEvent} e The keyboard event
   */
  handleKeydown(e) {
    if (this.isTransitioning) return;

    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      this.nextStep();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      this.previousStep();
    } else if (e.key === "z" || e.key === "Z") {
      e.preventDefault();
      this.toggleZenMode();
    } else if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      this.toggleFullscreen();
    }
  }

  /** Toggles fullscreen mode for the presentation. */
  async toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        LiveRegion.announce("Entered fullscreen mode. Exit using one of the keys F or Esc.");
      } else {
        await document.exitFullscreen();
        LiveRegion.announce("Exited fullscreen mode");
      }
    } catch (err) {
      console.log("Fullscreen not supported or denied");
    }
  }

  /** Advances to the next element animation or slide if no more elements to animate. */
  nextStep() {
    if (!this.currentSlide.next()) this.nextSlide();
  }

  /** Goes back to the previous element animation or slide if no more elements to animate. */
  previousStep() {
    if (!this.currentSlide.previous()) this.previousSlide();
  }

  /** Navigates to the next slide. */
  nextSlide() {
    if (this.isTransitioning) return;
    const next = this.currentSlide?.nextElementSibling;
    if (next) {
      this.goToSlide(next, "next");
    }
  }

  /** Navigates to the previous slide. */
  previousSlide() {
    if (this.isTransitioning) return;
    const prev = this.currentSlide?.previousElementSibling;
    if (prev) {
      this.goToSlide(prev, "prev");
    }
  }

  /** Toggles zen mode, which hides most UI controls for distraction-free presentation. */
  toggleZenMode() {
    if (this.deckRoot.hasAttribute("zen-mode")) this.deckRoot.removeAttribute("zen-mode");
    else this.deckRoot.setAttribute("zen-mode", "");
  }

  /**
   * Core slide navigation method with animated transitions.
   * @param {Element} targetSlide The target slide element
   * @param {string} [direction="next"] The direction of navigation ("next" or "prev")
   */
  performSlideTransition(targetSlide, direction = "next") {
    if (this.isTransitioning || !targetSlide) return;

    const currentSlide = this.currentSlide;
    if (!currentSlide) {
      // No current slide, just set the target as current
      targetSlide.setAttribute("current", "");
      targetSlide.reset({ back: direction === "prev" });
      this.updateUI();
      this.updateHash();
      return;
    }

    this.isTransitioning = true;

    currentSlide.dataset.direction = direction;
    targetSlide.dataset.direction = direction;

    let aniCtl = new AbortController();

    const cleanupTransition = () => {
      currentSlide.removeAttribute("current");
      targetSlide.setAttribute("current", "");

      currentSlide.classList.remove("slide-exiting");
      targetSlide.classList.remove("slide-entering");
      delete currentSlide.dataset.direction;
      delete targetSlide.dataset.direction;

      aniCtl.abort();

      this.isTransitioning = false;
      this.preloadAdjacentImages();
      this.updateUI();
    };

    requestAnimationFrame(() => {
      targetSlide.reset({ back: direction === "prev" });

      currentSlide.classList.add("slide-exiting");
      targetSlide.classList.add("slide-entering");

      this.updateHash();

      const slideIndex = parseInt(targetSlide.dataset.index || "0", 10);
      const slideTitle = targetSlide.querySelector("h1, h2, h3")?.textContent || `Slide ${slideIndex + 1}`;
      LiveRegion.announce(`Now on ${slideTitle}`);

      Promise.race([
        Promise.all([
          new Promise((res) => void currentSlide.addEventListener("animationend", res, { signal: aniCtl.signal })),
          new Promise((res) => void targetSlide.addEventListener("animationend", res, { signal: aniCtl.signal })),
        ]),
        new Promise((res) => void setTimeout(res, 1000)), // fallback cleanup
      ])
        .then(cleanupTransition)
        .catch((e) => {
          console.error(e);
          cleanupTransition();
        });
    });
  }

  /**
   * Preloads images in the current slide and adjacent slides for better performance.
   * Delegates to each slide's preloadImages() method.
   */
  preloadAdjacentImages() {
    const current = this.currentSlide;
    if (!current) return;

    const slidesToPreload = [current.previousElementSibling, current, current.nextElementSibling].filter(Boolean);

    for (const slide of slidesToPreload) {
      slide.preloadImages();
    }
  }

  /** Updates the presentation UI elements (progress bar, counter, button states). */
  updateUI() {
    const current = this.currentSlide;
    const slides = this.slidePages;
    const slideCount = slides.length;

    if (!current || slideCount === 0) return;

    // Get current slide position from data-index
    const currentIndex = parseInt(current.dataset.index || "0", 10);
    const currentPosition = currentIndex + 1;

    // Update progress bar
    const progress = this.shadow.querySelector("slide-progress");
    if (progress) {
      const percentage = (currentPosition / slideCount) * 100;
      progress.style.setProperty("--progress", `${percentage}%`);
    }

    // Update counter
    const counter = this.shadow.querySelector("slide-counter");
    if (counter) {
      counter.textContent = `${currentPosition} / ${slideCount}`;
    }

    // Update button states
    const prevBtn = this.shadow.getElementById("prevBtn");
    const nextBtn = this.shadow.getElementById("nextBtn");
    if (prevBtn) prevBtn.disabled = !current.previousElementSibling;
    if (nextBtn) nextBtn.disabled = !current.nextElementSibling;
  }

  /** Updates hash information display based on environment. */
  updateHashInfo() {
    const hashInfo = document.getElementById("hash-info");
    if (hashInfo) {
      if (this.isArtifactEnvironment) {
        hashInfo.textContent = "Hash navigation available in standalone mode";
      } else {
        hashInfo.textContent = "URLs work too: try #features or #demo";
      }
    }
  }
}

/**
 * Accessibility component for screen reader announcements.
 * Provides a live region for announcing slide changes and other important updates.
 */
class LiveRegion extends HTMLElement {
  /** @type {Function} */
  announceListener;

  /**
   * Called when the element is added to the DOM.
   * Sets up event listener and accessibility attributes.
   */
  connectedCallback() {
    this.announceListener = (e) => void this._announce(e.detail.message);
    document.addEventListener("announce", this.announceListener);
    this.setAttribute("aria-live", "polite");
    this.setAttribute("aria-atomic", "true");
  }

  /**
   * Called when the element is removed from the DOM.
   * Cleans up event listeners.
   */
  disconnectedCallback() {
    document.removeEventListener("announce", this.announceListener);
  }

  /**
   * Internal method to announce a message to screen readers.
   * @param {string} message The message to announce
   */
  _announce(message) {
    this.textContent = message;
    setTimeout(() => void (this.textContent = ""), 1000);
  }

  /**
   * Static method to announce a message globally.
   * @param {string} message The message to announce
   */
  static announce(message) {
    document.dispatchEvent(new CustomEvent("announce", { detail: { message } }));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  customElements.define("slide-page", SlidePage);
  customElements.define("live-region", LiveRegion);
  customElements.define("slide-viewport", SlideViewport);
  customElements.define("slide-deck", SlideDeck);
  document.body.appendChild(document.createElement("live-region"));
});
