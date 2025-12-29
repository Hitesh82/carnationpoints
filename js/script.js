const points = carnationPoints("#myBox", {
  breakpoints: [
    { name: "mobile", max: 767 },
    { name: "tablet", min: 768, max: 1023 },
    { name: "desktop", min: 1024 },
  ],
  onInit(point) {
    if (point.breakpoint) {
      document.querySelector(
        "#myBox"
      ).textContent = `Example: ${point.breakpoint}`;
    }
  },
  onChange(point) {
    document.querySelector(
      "#myBox"
    ).textContent = `Example: ${point.breakpoint}`;
  },
});
//console.log()