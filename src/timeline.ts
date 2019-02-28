import Drawer from "./draw";
import TimelineEvents from "./events";
import { Time } from "./time";
import TimeConverter from "./time-converter";

export interface CanvasDimensions {
  width?: number;
  height?: number;
  canvas?: HTMLCanvasElement;
}

export default class Timeline {

  public offset: Time = new Time(0);

  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  public width: number;
  public height: number;

  public drawer: Drawer;
  public events: TimelineEvents;
  public timeConverter: TimeConverter = new TimeConverter(this);

  public get secondSize() {
    return 60;
  }

  public time: Time = new Time();

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
}