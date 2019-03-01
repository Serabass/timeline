import { ITimelineEventListener } from "./ITimelineEventListener";
import Timeline from "../classes/Timeline";

export default abstract class TimelineEventListener
  implements ITimelineEventListener {
  public constructor(public timeline: Timeline) {}

  public on<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    this.timeline.on<K>(type, listener, options);
  }

  public abstract listen(): void;
}
