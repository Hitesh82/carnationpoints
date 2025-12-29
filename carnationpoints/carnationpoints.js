(function (window, document) {
  "use strict";

  function carnationPoints(target, options = {}) {
    return new Point(target, options);
  }

  function Point(target, options) {
    this.el =
      typeof target === "string" ? document.querySelector(target) : target;

    if (!this.el) {
      console.warn("Breakpoints: element not found");
      return;
    }

    // ---- defaults (CONFIG ONLY)
    this.defaults = {
      debug: false,
      speed: 300,
      onInit: null,
      onChange: null,
      breakpoints: [],
    };

    // ---- merge options
    this.options = { ...this.defaults, ...options };

    // ---- runtime state
    this.state = {
      initialized: false,
      destroyed: false,
      breakpoint: null,
    };

    // bind once
    this._onResize = this._onResize.bind(this);

    this.init();
  }

  /* ---------------- INIT ---------------- */

  Point.prototype.init = function () {
    if (this.state.initialized || this.state.destroyed) return;

    this.state.initialized = true;

    const width = this._getWidth();
    this.state.breakpoint = this._getActiveBreakpoint(width);

    window.addEventListener("resize", this._onResize);

    this._emit("onInit", {
      width,
      breakpoint: this.state.breakpoint,
      element: this.el,
      instance: this,
    });

    this._log("initialized");
  };

  /* ---------------- RESIZE ---------------- */

  Point.prototype._onResize = function () {
    if (this.state.destroyed) return;

    const width = this._getWidth();
    const newBreakpoint = this._getActiveBreakpoint(width);

    if (newBreakpoint !== this.state.breakpoint) {
      const prev = this.state.breakpoint;
      this.state.breakpoint = newBreakpoint;

      const event = new CustomEvent("breakpoint:change", {
        detail: {
          breakpoint: newBreakpoint,
          previous: prev,
          width,
          element: this.el,
          instance: this,
        },
        bubbles: true,
      });

      this.el.dispatchEvent(event);

      this._emit("onChange", {
        width,
        breakpoint: newBreakpoint,
        previous: prev,
        element: this.el,
        instance: this,
      });
    }
  };

  /* ---------------- HELPERS ---------------- */

  Point.prototype._emit = function (callbackName, data) {
    if (typeof this.options[callbackName] === "function") {
      this.options[callbackName](data);
    }
  };

  Point.prototype._log = function (...args) {
    if (this.options.debug) {
      console.log("Breakpoints:", ...args);
    }
  };

  Point.prototype._getWidth = function () {
    return window.innerWidth;
  };

  Point.prototype._getActiveBreakpoint = function (width) {
    let active = null;

    this.options.breakpoints.forEach((bp) => {
      const min = bp.min ?? 0;
      const max = bp.max ?? Infinity;

      if (width >= min && width <= max) {
        active = bp.name ?? `${min}-${max}`;
      }
    });

    return active;
  };

  /* ---------------- PUBLIC API ---------------- */

  Point.prototype.addPoint = function (bps = []) {
    if (this.state.destroyed) return;
    if (!Array.isArray(bps)) return;

    this.options.breakpoints.push(...bps);

    const width = this._getWidth();
    const newBreakpoint = this._getActiveBreakpoint(width);

    if (newBreakpoint !== this.state.breakpoint) {
      const prev = this.state.breakpoint;
      this.state.breakpoint = newBreakpoint;

      this._emit("onChange", {
        width,
        breakpoint: newBreakpoint,
        previous: prev,
        element: this.el,
        instance: this,
      });
    }

    this._log("points added", bps);
  };

  Point.prototype.getBreakpoint = function () {
    return this.state.breakpoint;
  };

  /* ---------------- DESTROY ---------------- */

  Point.prototype.destroy = function () {
    if (this.state.destroyed) return;

    window.removeEventListener("resize", this._onResize);

    this.state.destroyed = true;
    this.state.initialized = false;
    this.state.breakpoint = null;

    this.options.breakpoints.length = 0;
    this.options.onChange = null;
    this.options.onInit = null;

    this._log("destroyed");
    console.warn("Breakpoints: destroyed");
  };

  /* ---------------- EXPORT ---------------- */

  window.carnationPoints = carnationPoints;
})(window, document);
