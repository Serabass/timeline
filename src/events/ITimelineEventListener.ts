import Timeline from "../classes/Timeline";

export interface ITimelineEventListener {
  timeline: Timeline;
  listen(): void;
  on<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}
