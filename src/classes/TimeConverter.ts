import Timeline from "./Timeline";

export default class TimeConverter {
  public constructor(public timeline: Timeline) {}

  public secondsToCoords(value: number) {
    return value * this.timeline.secondSize;
  }

  public coordsToSeconds(value: number) {
    return value / this.timeline.secondSize;
  }
}
