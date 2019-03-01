export default class Time {
  public constructor(public value: number = 2.2) {}  // TODO разложить на составляющие

  public static format(value: number) {
    let mm = Math.abs(Math.floor(value / 60));
    let ss = Math.abs(Math.floor(value % 60));
    let ms: any = Math.round(Math.abs(value * 1000 % 1000));
    let str;

    if (ms < 10) {
      ms = `0${ms}`
    } else if (ms < 100) {
      ms = `00${ms}`
    }

    if (value < 0) {
      mm--;
      str = `-${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`; // .${ms}
    } else {
      str = `${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`; // .${ms}
    }

    return str;
  }

  public toString() {
    return Time.format(this.value);
  }
}
