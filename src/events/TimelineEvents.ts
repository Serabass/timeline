import TimelineEventListener from "./TimelineEventListener";
import Timeline from "../timeline";
import { DragListener } from "./DragListener";
import { MousemoveListener } from "./MousemoveListener";
import { TimeSetListener } from "./TimeSetListener";

export default class TimelineEvents extends TimelineEventListener {
  public dragListener: DragListener;
  public mousemoveListener: MousemoveListener;
  public timeSetListener: TimeSetListener;

  public constructor(public timeline: Timeline) {
    super(timeline);
    this.dragListener = new DragListener(timeline);
    this.mousemoveListener = new MousemoveListener(timeline);
    this.timeSetListener = new TimeSetListener(timeline);
  }

  public listen() {
    this.dragListener.listen();
    this.mousemoveListener.listen();
    this.timeSetListener.listen();
  }
}
