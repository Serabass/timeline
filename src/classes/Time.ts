export default class Time {
  public constructor(public value: number = 2.2) {}  // TODO разложить на составляющие

  public static format(value: number) {
    let mm = Math.abs(Math.floor(value / 60));
    let ss = Math.abs(Math.floor(value % 60));
    let str;

    if (value < 0) {
      mm--;
      str = `-${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`;
    } else {
      str = `${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`;
    }

    return str;
  }

  public toString() {
    return Time.format(this.value);
  }
}
