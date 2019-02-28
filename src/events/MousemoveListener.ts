import TimelineEventListener from "./TimelineEventListener";
import Timeline from "../timeline";

export class MousemoveListener extends TimelineEventListener {
  public constructor(public timeline: Timeline) {
    super(timeline);
  }

  public listen() {
    this.on("mousemove", e => {
      let x =
        e.offsetX -
        this.timeline.timeConverter.secondsToCoords(this.timeline.offset.value);
      let time = this.timeline.timeConverter.coordsToSeconds(x);
      this.timeline.hoveredTime.value = time;
    });
  }
}
