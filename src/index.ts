import Timeline from "./classes/Timeline";

window.onload = function(e) {
  let timeline = new Timeline({});
  timeline.append();
  timeline.draw();
};
