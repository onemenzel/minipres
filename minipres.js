"use strict";

/****************************************************** STYLES *******************************************************/

const GLOBAL_STYLE = `
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

document.head.insertAdjacentHTML("beforeend", `<style>${GLOBAL_STYLE}</style>`);

const SLIDE_DECK_STYLE = `
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
@media (max-width: 640px),
(max-height: 640px) {
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

const SLIDE_DECK_TEMPLATE = `
<slide-deck-root>
  <slide-viewport role="main">
    <slot></slot>
  </slide-viewport>

  <slide-controls role="toolbar" aria-label="Presentation controls">
    <slide-counter aria-live="polite" aria-label="Current slide"></slide-counter>
    <button id="prevBtn" aria-label="Previous step or slide">
      ← Previous
    </button>
    <button id="nextBtn" aria-label="Next step or slide">
      Next →
    </button>
  </slide-controls>

  <slide-progress></slide-progress>
</slide-deck-root>

<!-- Must be inside the shadow DOM -->
<style>${SLIDE_DECK_STYLE}</style>
`;

class SlidePage extends HTMLElement {
  currentElementIndex = 0;
  animatedElements = [];

  connectedCallback() {
    this.animatedElements = Array.from(this.querySelectorAll("[transition]"));
    this.reset();
  }

  reset(options) {
    const { back } = Object.assign({ back: false }, options);
    this.currentElementIndex = back ? Math.max(0, this.animatedElements.length - 1) : 0;

    this.animatedElements.forEach((el) => {
      if (back) el.classList.add("animate-in");
      else el.classList.remove("animate-in");
    });
  }

  /**
   * @returns if an element has transitioned in
   */
  next() {
    if (this.currentElementIndex == this.animatedElements.length) return false;
    this.animateInElement(this.currentElementIndex);
    this.currentElementIndex++;
    return true;
  }

  /**
   * @returns if an element has transitioned out
   */
  previous() {
    if (this.currentElementIndex == 0) return false; // might be -1 if there are no elements to be animated
    this.animateOutElement(this.currentElementIndex);
    this.currentElementIndex--;
    return true;
  }

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

  animateOutElement(index) {
    if (index < this.animatedElements.length) {
      const element = this.animatedElements[index];
      element.classList.remove("animate-in");
    }
  }
}

class SlideViewport extends HTMLElement {
  connectedCallback() {
    this.updateScale();
    this.resizeObserver = new ResizeObserver(() => this.updateScale());
    this.resizeObserver.observe(this);
  }

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

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }
}

class SlideDeck extends HTMLElement {
  constructor() {
    super();
    this.currentIndex = 0;

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = SLIDE_DECK_TEMPLATE;
  }

  connectedCallback() {
    this.slides = Array.from(this.querySelectorAll("slide-page"));
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
    this.setupSlideTransitions();
    this.initializeFromHash();
    this.preloadAdjacentImages();
    this.updateUI();
    this.updateHashInfo();

    window.slideDeck = this;
  }

  disconnectedCallback() {
    if (this.keydownHandler) {
      document.removeEventListener("keydown", this.keydownHandler);
    }
    if (this.hashChangeHandler) {
      window.removeEventListener("hashchange", this.hashChangeHandler);
    }
    if (this.liveRegion) {
      document.body.removeChild(this.liveRegion);
    }
  }

  setupSlideIds() {
    this.slides.forEach((slide, index) => {
      if (!slide.id) {
        slide.id = `slide-${index + 1}`;
      }
    });
  }

  get currentSlide() {
    return this.slides[this.currentIndex];
  }

  get deckRoot() {
    return this.shadow.querySelector("slide-deck-root");
  }

  initializeFromHash() {
    if (this.isArtifactEnvironment) {
      this.currentIndex = 0;
      this.slides[0].setAttribute("current", "");
      this.currentSlide.reset();
      return;
    }

    const hash = window.location.hash.slice(1);
    if (hash) {
      const slideIndex = this.findSlideIndexById(hash);
      if (slideIndex !== -1) {
        this.currentIndex = slideIndex;
        this.slides.forEach((slide) => slide.removeAttribute("current"));
        this.currentSlide.setAttribute("current", "");
        this.currentSlide.reset();
        return;
      }
    }

    this.currentIndex = 0;
    this.slides[0].setAttribute("current", "");
    this.currentSlide.reset();
    this.updateHash();
  }

  findSlideIndexById(id) {
    return this.slides.findIndex((slide) => slide.id === id);
  }

  handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const slideIndex = this.findSlideIndexById(hash);
      if (slideIndex !== -1 && slideIndex !== this.currentIndex) {
        this.goToSlideByIndex(slideIndex);
      }
    }
  }

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

  goToSlideByIndex(index) {
    if (index < 0 || index >= this.slides.length || index === this.currentIndex) return;

    const direction = index > this.currentIndex ? "next" : "prev";
    this.goToSlide(index, direction);
  }

  setupSlideTransitions() {
    this.slides.forEach((slide, index) => {
      const transition = slide.getAttribute("transition") || this.defaultTransition;
      slide.setAttribute("transition", transition);

      if (index === this.currentIndex) {
        slide.setAttribute("current", "");
      }
    });
  }

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

  async toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        LiveRegion.announce("Entered fullscreen mode");
      } else {
        await document.exitFullscreen();
        LiveRegion.announce("Exited fullscreen mode");
      }
    } catch (err) {
      console.log("Fullscreen not supported or denied");
    }
  }

  nextStep() {
    if (!this.currentSlide.next()) this.next();
  }

  previousStep() {
    if (!this.currentSlide.previous()) this.previous();
  }

  toggleZenMode() {
    if (this.deckRoot.hasAttribute("zen-mode")) this.deckRoot.removeAttribute("zen-mode");
    else this.deckRoot.setAttribute("zen-mode", "");
  }

  next() {
    if (this.isTransitioning || this.currentIndex >= this.slides.length - 1) return;
    this.goToSlide(this.currentIndex + 1, "next");
  }

  previous() {
    if (this.isTransitioning || this.currentIndex <= 0) return;
    this.goToSlide(this.currentIndex - 1, "prev");
  }

  goToSlide(index, direction = "next") {
    if (this.isTransitioning || index < 0 || index >= this.slides.length) return;

    const currentSlide = this.currentSlide;
    const nextSlide = this.slides[index];
    this.isTransitioning = true;

    currentSlide.setAttribute("data-direction", direction);
    nextSlide.setAttribute("data-direction", direction);

    const cleanupTransition = () => {
      currentSlide.removeAttribute("current");
      nextSlide.setAttribute("current", "");

      currentSlide.classList.remove("slide-exiting");
      nextSlide.classList.remove("slide-entering");
      currentSlide.removeAttribute("data-direction");
      nextSlide.removeAttribute("data-direction");

      currentSlide.removeEventListener("animationend", cleanupTransition);
      nextSlide.removeEventListener("animationend", cleanupTransition);

      this.isTransitioning = false;
      this.preloadAdjacentImages();
      this.updateUI();
    };

    requestAnimationFrame(() => {
      nextSlide.reset({ back: direction == "prev" });

      currentSlide.classList.add("slide-exiting");
      nextSlide.classList.add("slide-entering");

      this.currentIndex = index;
      this.updateHash();

      const slideTitle = nextSlide.querySelector("h1, h2, h3")?.textContent || `Slide ${index + 1}`;
      LiveRegion.announce(`Now on ${slideTitle}`);

      Promise.race([
        Promise.all([
          new Promise((res) => void currentSlide.addEventListener("animationend", res, { once: true })),
          new Promise((res) => void nextSlide.addEventListener("animationend", res, { once: true })),
        ]),
        new Promise((res) => void setTimeout(res, 1000)), // fallback cleanup
      ]).then(cleanupTransition);
    });
  }

  preloadAdjacentImages() {
    const indicesToLoad = [this.currentIndex - 1, this.currentIndex, this.currentIndex + 1].filter(
      (i) => i >= 0 && i < this.slides.length,
    );

    indicesToLoad.forEach((index) => {
      const slide = this.slides[index];
      const lazyImages = slide.querySelectorAll('img[loading="lazy"]');

      lazyImages.forEach((img) => {
        img.loading = "eager";
      });
    });
  }

  updateUI() {
    const progress = this.shadow.querySelector("slide-progress");
    if (progress) {
      const percentage = ((this.currentIndex + 1) / this.slides.length) * 100;
      progress.style.setProperty("--progress", `${percentage}%`);
    }

    const counter = this.shadow.querySelector("slide-counter");
    if (counter) {
      counter.textContent = `${this.currentIndex + 1} / ${this.slides.length}`;
    }

    const prevBtn = this.shadow.getElementById("prevBtn");
    const nextBtn = this.shadow.getElementById("nextBtn");
    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex === this.slides.length - 1;
  }

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

class LiveRegion extends HTMLElement {
  connectedCallback() {
    this.cb = (e) => this._announce(e.detail.message);
    document.addEventListener("announce", this.cb);
    this.setAttribute("aria-live", "polite");
    this.setAttribute("aria-atomic", "true");
  }

  disconnectedCallback() {
    document.removeEventListener("announce", this.cb);
  }

  _announce(message) {
    this.textContent = message;
    setTimeout(() => {
      this.textContent = "";
    }, 1000);
  }

  static announce(message) {
    document.dispatchEvent(new CustomEvent("announce", { detail: { message } }));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  customElements.define("slide-page", SlidePage);
  customElements.define("live-region", LiveRegion);
  customElements.define("slide-viewport", SlideViewport);
  customElements.define("slide-deck", SlideDeck);
  document.body.insertAdjacentElement("beforeend", document.createElement("live-region"));
});
