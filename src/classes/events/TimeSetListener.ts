import TimelineEventListener from "./TimelineEventListener";
import Timeline from "../Timeline";

export class TimeSetListener extends TimelineEventListener {
  public constructor(public timeline: Timeline) {
    super(timeline);
  }

  public listen() {
    this.on("click", e => {
      let x = e.offsetX;
      let offset = this.timeline.timeConverter.secondsToCoords(
        this.timeline.offset.value
      );
      this.timeline.time.value = this.timeline.timeConverter.coordsToSeconds(
        x - offset
      );
    });
  }
}
