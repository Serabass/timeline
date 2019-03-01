import "reflect-metadata";
import Timeline from "./Timeline";
import Time from "./Time";

export interface TimelineOffset {
  x: number;
  y: number;
}

export default class Drawer {
  public constructor(public timeline: Timeline) {}

  public offset: TimelineOffset = { x: 0, y: 0 };

  private saveContext(cb: (ctx: CanvasRenderingContext2D) => void) {
    this.timeline.context.save();
    cb(this.timeline.context);
    this.timeline.context.restore();
  }

  private path(cb: (ctx: CanvasRenderingContext2D) => void) {
    this.timeline.context.beginPath();
    cb(this.timeline.context);
    this.timeline.context.closePath();
  }

  public draw() {
    this.drawBg();
    this.drawHeader();
    this.drawTime();
    this.drawCursor();
    // this.drawHoveredTime();
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  public drawBg() {
    this.saveContext(ctx => {
      ctx.clearRect(0, 0, this.timeline.width, this.timeline.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, this.timeline.width, this.timeline.height);
    });
  }

  public drawHeader() {
    this.saveContext(ctx => {
      ctx.fillStyle = "green";
      ctx.fillRect(0, 0, this.timeline.width, 25);
    });
  }

  public getTimeFromX(x: number) {
    return x / this.timeline.secondSize;
  }

  public getXAtTime(time: number) {
    return this.timeline.secondSize * time;
  }

  public drawTime() {
    this.saveContext(ctx => {
      // this.path(ctx => {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;

      let startX = this.timeline.timeConverter.secondsToCoords(
        this.timeline.offset.value
      );

      // ctx.translate(startX, 0);
      for (let x = -200; x < this.timeline.width + 200; x++) {
        if (x % this.timeline.secondSize !== 0) {
          continue;
        }

        ctx.moveTo((startX % this.timeline.secondSize) + x, 0);
        ctx.lineTo((startX % this.timeline.secondSize) + x, 20);
        ctx.moveTo(0, 0);

        this.saveContext(ctx => {
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          let xx = this.timeline.timeConverter.secondsToCoords(
            this.timeline.offset.value
          );
          ctx.fillText(
            Time.format(this.getTimeFromX(x - startX)),
            (startX % this.timeline.secondSize) + x,
            40
          );
        });
      }

      ctx.stroke();
      // });
    });
  }

  public drawCursor() {
    this.saveContext(ctx => {
      this.path(ctx => {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        let startX = this.timeline.timeConverter.secondsToCoords(
          this.timeline.offset.value
        );

        ctx.moveTo(
          startX + this.timeline.secondSize * this.timeline.time.value,
          0
        );
        ctx.lineTo(
          startX + this.timeline.secondSize * this.timeline.time.value,
          this.timeline.height
        );
        ctx.moveTo(0, 0);
      });
    });
  }

  public drawHoveredTime() {
    this.saveContext(ctx => {
      // this.path(ctx => {
      ctx.strokeStyle = "green";
      ctx.lineWidth = 0.5;
      let startX = this.timeline.timeConverter.secondsToCoords(
        this.timeline.offset.value
      );

      ctx.moveTo(
        startX + this.timeline.secondSize * this.timeline.hoveredTime.value,
        0
      );
      ctx.lineTo(
        startX + this.timeline.secondSize * this.timeline.hoveredTime.value,
        this.timeline.height
      );
      ctx.moveTo(0, 0);
      // });
    });
  }
}
