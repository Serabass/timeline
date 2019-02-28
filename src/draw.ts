import "reflect-metadata";
import Timeline from "./timeline";
import { Time } from "./time";

export interface TimelineOffset {
  x: number;
  y: number;
}

export default class Drawer {
  public constructor(public timeline: Timeline) {}

  public offset: TimelineOffset = { x: 0, y: 0 };

  private context(cb: (ctx: CanvasRenderingContext2D) => void) {
    this.timeline.context.save();
    cb(this.timeline.context);
    this.timeline.context.restore();
  }

  public async draw() {
    requestAnimationFrame(async () => {
      await this.drawBg();
      await this.draw();
      await this.drawTime();
      await this.drawCursor();
    });
  }

  public async drawBg() {
    this.context(ctx => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, this.timeline.width, this.timeline.height);
    });
  }

  public async drawHeader() {
    this.context(ctx => {
      ctx.fillStyle = "green";
      ctx.fillRect(0, 0, this.timeline.width, 25);
    });
  }

  public async drawTime() {
    await this.drawHeader();
    this.context(ctx => {
      ctx.strokeStyle = "rgba(255, 0, 0, 0.4)";
      ctx.lineWidth = .5;

      for (let x = 0; x < this.timeline.width; x += this.timeline.secondSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 20);
        ctx.moveTo(0, 0);

        ctx.save();
        {
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText(Time.format(x), x, 40);
        }
        ctx.restore();
      }

      ctx.stroke();
    });
  }

  public drawCursor() {
    this.context(ctx => {
      ctx.strokeStyle = "blue";
      ctx.lineWidth = .5;
      ctx.moveTo(this.timeline.secondSize * this.timeline.time.value, 0);
      ctx.lineTo(
        this.timeline.secondSize * this.timeline.time.value,
        this.timeline.height
      );
      ctx.moveTo(0, 0);
    });
  }
}
