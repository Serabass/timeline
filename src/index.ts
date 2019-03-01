import Timeline from "./classes/Timeline";

window.onload = function(e) {
  let timeline = new Timeline({});

  document.body.appendChild(timeline.canvas);

  timeline.draw();
};
