import Timeline from "./timeline";

export default class TimelineEvents {
  public constructor(public timeline: Timeline) {}

  public listen() {
    this.timeline.canvas.addEventListener('click', () => {
      console.log(13);
    });
  }
}
