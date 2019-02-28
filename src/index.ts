import Timeline from "./timeline";

document.onreadystatechange = function() {
  let timeline = new Timeline({});

  document.body.appendChild(timeline.canvas);

  timeline.draw();
};
