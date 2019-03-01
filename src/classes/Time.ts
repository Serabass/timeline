export default class Time {
  public constructor(public value: number = 2.2) {}  // TODO разложить на составляющие

  public static format(value: number) {
    let mm = Math.floor(value / 60);
    let ss = Math.floor(value % 60);
    return `${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`;
  }

  public toString() {
    return Time.format(this.value);
  }
}
