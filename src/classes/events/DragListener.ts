import TimelineEventListener from "./TimelineEventListener";
import Timeline from "../Timeline";

export class DragListener extends TimelineEventListener {
  public startX: number | null = null;

  public constructor(public timeline: Timeline) {
    super(timeline);
  }

  public listen() {
    this.on("mousedown", e => {
      let startValue;
      switch (e.which) {
        case 1:
          startValue = this.timeline.timeConverter.secondsToCoords(
            this.timeline.offset.value
          );
          break;
        case 2:
          startValue = this.timeline.xScale;
          break;
        default:
          throw new Error();
      }
      this.startX = e.offsetX - startValue;
    });

    this.on("mousemove", e => {
      if (this.startX === null) {
        return;
      }

      switch (e.which) {
        case 1:
          this.timeline.offset.value = this.timeline.timeConverter.coordsToSeconds(
            e.offsetX - this.startX
          );
          break;
        case 2:
          const val = e.offsetX - this.startX;
          this.timeline.xScale = Math.max(val, 0.1);
          break;
      }
    });

    this.on("mouseup", e => {
      this.startX = null;
    });
  }
}
