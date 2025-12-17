(function (window, document) {
  "use strict";

  function carnationPoints(target, options = {}) {
    return new point(target, options);
  }

  function point(target, options) {
    this.el =
      typeof target === "string" ? document.querySelector(target) : target;

    if (!this.el) {
      console.warn("Breakpoints: element not found");
      return;
    }

    this.defaults = {
      debug: false,
      speed: 300,
      onInit: null,
      onChange: null,
      breakpoints: [],
      destroyed: false,
    };

    this.options = { ...this.defaults, ...options };

    this.state = {
      initialized: false,
    };

    this._onResize = this._onResize.bind(this);

    this.init();
  }

  point.prototype.init = function () {
    if (this.state.initialized || this.options.destroyed) return;

    this.state.initialized = true;

    const width = this._getWidth();
    this.state.breakpoint = this._getActiveBreakpoint(width);

    window.addEventListener("resize", this._onResize);

    this._emit("onInit", {
      width,
      breakpoint: this.state.breakpoint,
      element: this.el,
      destroyed: this.options.destroyed,
    });

    this._log("initialized");
  };

  point.prototype._onResize = function () {
    if (this.options.destroyed === true) return;

    const width = this._getWidth();
    const newBreakpoint = this._getActiveBreakpoint(width);

    // Only react if breakpoint changed
    if (newBreakpoint !== this.state.breakpoint) {
      const prev = this.state.breakpoint;
      this.state.breakpoint = newBreakpoint;

      this._emit("onChange", {
        width,
        breakpoint: newBreakpoint,
        //previous: prev,
        element: this.el,
        destroyed: this.options.destroyed,
      });
    }
  };

  point.prototype._emit = function (callbackName, data) {
    if (typeof this.options[callbackName] === "function") {
      this.options[callbackName](data);
    }
  };

  point.prototype._log = function (...args) {
    if (this.options.debug) {
      console.log("Breakpoints:", ...args);
    }
  };

  point.prototype._getWidth = function () {
    return window.innerWidth;
  };

  point.prototype._getActiveBreakpoint = function (width) {
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

  point.prototype.addPoint = function (bps = []) {
    //if (!bp || typeof bp !== "object") return;
    if (!Array.isArray(bps)) return;

    this.options.breakpoints.push(...bps);

    // Recalculate breakpoint
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
        destroyed: this.options.destroyed,
      });
    }

    this._log("point added", bps);
  };

  point.prototype.destroy = function () {
    window.removeEventListener("resize", this._onResize);

    this.options.breakpoints = [];

    this.options.destroyed = true;

    this.state.breakpoint = null;
    this.state.initialized = false;

    this.options.onChange = null;
    this.options.onInit = null;

    this._log("destroyed and breakpoints cleared");
    console.warn("Breakpoints: destroyed & cleared");
  };

  point.prototype.getBreakpoint = function () {
    return this.state.breakpoint;
  };

  window.carnationPoints = carnationPoints;
})(window, document);
