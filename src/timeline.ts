import Drawer from "./draw";
import Time from "./time";
import TimeConverter from "./time-converter";
import TimelineEvents from "./events/TimelineEvents";

export interface CanvasDimensions {
  width?: number;
  height?: number;
  canvas?: HTMLCanvasElement;
}

export default class Timeline {
  public offset: Time = new Time(0);

  public xScale = 1;

  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  public width: number;
  public height: number;

  public drawer: Drawer;
  public events: TimelineEvents;
  public timeConverter: TimeConverter = new TimeConverter(this);

  public get secondSize() {
    return 60 * this.xScale;
  }

  public time: Time = new Time(2);
  public hoveredTime: Time = new Time();

  public constructor({
    width = 900,
    height = 200,
    canvas = document.createElement("canvas")
  }: CanvasDimensions) {
    this.canvas = canvas;

    this.width = width;
    this.height = height;

    this.canvas.width = width;
    this.canvas.height = height;

    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.drawer = new Drawer(this);
    this.events = new TimelineEvents(this);
  }

  public draw() {
    this.drawer.draw();
    this.events.listen();
  }

  public on<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    this.canvas.addEventListener<K>(type, listener, options);
  }
}
