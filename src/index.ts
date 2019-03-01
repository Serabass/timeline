import Timeline from "./classes/Timeline";

document.onreadystatechange = function() {
  let timeline = new Timeline({});

  document.body.appendChild(timeline.canvas);

  timeline.draw();
};
