<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="keywords"
      content="responsive breakpoints, responsive design, viewport Breakpoints, Adaptive Breakpoints, breakpoints, media queries, window resize,custom breakpoint, layout breakpoints, dynamic breakpoints javascript,mobile first,Flex Breakpoints"
    />
  </head>
  <body>
    <h1>Carnation Breakpoints</h1>
    <h2>Notes</h2>
    <p>This is pure javascript plugin no require jquery dependency. </p>
    <p>Carnation Breakpoints is a lightweight JavaScript library that helps you manage responsive breakpoints in your web applications. It allows you to define custom breakpoints, listen for changes in viewport size, and execute callback functions when the viewport enters or exits specific breakpoints.</p>
    <h3>Define carnationPoints()</h3>
    
  ```js
  const points = carnationPoints('.myBox');
  ```

  <h3>Create Breakpoints</h3>
  
  ```js
  const points = carnationPoints(".myBox", {
    breakpoints: [
      { name: "mobile", max: 767 },
      { name: "tablet", min: 768, max: 1023 },
      { name: "desktop", min: 1024 },
    ],
  });
  ```
 <h3>Get Breakpoint on Init</h3>
 
 ```js
 const points = carnationPoints(".myBox", {
  breakpoints: [
    { name: "mobile", max: 767 },
    { name: "tablet", min: 768, max: 1023 },
    { name: "desktop", min: 1024 },
  ],
  onInit(point) {
    console.log("Init:", point.breakpoint);
  },
});
```

<h3>Get Breakpoint on Resize</h3>

```js
const points = carnationPoints(".myBox", {
  breakpoints: [
    { name: "mobile", max: 767 },
    { name: "tablet", min: 768, max: 1023 },
    { name: "desktop", min: 1024 },
  ],
  onChange(point) {
    console.log("Resize:", point.breakpoint);
  },
});
```

<h3>Add new breakpoints</h3>

```js
const points = carnationPoints(".myBox", {
  breakpoints: [
    { name: "mobile", max: 767 },
    { name: "tablet", min: 768, max: 1023 },
    { name: "desktop", min: 1024 },
  ],
});

points.addPoint([
  { name: "lg", min: 1200 },
  { name: "xl", min: 1600 },
]);
```


<h3>Destroy breakpoints</h3>

```js
const points = carnationPoints(".myBox", {
  breakpoints: [
    { name: "mobile", max: 767 },
    { name: "tablet", min: 768, max: 1023 },
    { name: "desktop", min: 1024 },
  ],
});

points.destroy();
```
  </body>
</html>
