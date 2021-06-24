export interface CalenarType {
  [key: string]: any;
  year: string | number;
  month: string | number;
  date: string | number;
  week: string;
  day: number;
  current: boolean;
}
export class Calenar {
  private current: Date;
  private preview: Date;

  constructor() {
    this.current = new Date();
    this.preview = new Date();
  }

  public setDate(date: Date) {
    this.preview = date;
  }

  public getCalendar(): Array<CalenarType> {
    let dateMap: Index = {
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六',
      0: '星期天',
    };
    let currentDate = new Array<CalenarType>();
    let month = this.preview.getMonth();
    let year = this.preview.getFullYear();
    let curNum = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= curNum; i++) {
      let week = new Date(year, month, i).getDay();
      currentDate.push({
        year: year,
        month: month + 1,
        date: i,
        day: week,
        week: dateMap[week],
        current: true,
      });
    }
    for (let i = currentDate[0].day == 0 ? 7 : currentDate[0].day; i > 1; i--) {
      let preNum = new Date(year, month, 0).getDate();
      let preDate = new Date(year, month - 1, preNum + i - currentDate[0].day);
      currentDate.unshift({
        year: preDate.getFullYear(),
        month: preDate.getMonth() + 1,
        date: preNum + i - currentDate[0].day,
        week: dateMap[preDate.getDay()],
        day: preDate.getDay(),
        current: false,
      });
    }
    let len = currentDate.length;
    for (let i = currentDate[len - 1].day == 0 ? 7 : currentDate[len - 1].day; i < 7; i++) {
      let nextDate = new Date(year, month + 1, i - currentDate[len - 1].day + 1);
      currentDate.push({
        year: nextDate.getFullYear(),
        month: nextDate.getMonth() + 1,
        date: i - currentDate[len - 1].day + 1,
        week: dateMap[nextDate.getDay()],
        day: nextDate.getDay(),
        current: false,
      });
    }
    return currentDate;
  }

  public getNext() {
    let date = this.preview.getDate();
    let month = this.preview.getMonth();
    let year = this.preview.getFullYear();
    this.preview = new Date(year, month + 1, date);
  }

  public getPreious() {
    let date = this.preview.getDate();
    let month = this.preview.getMonth();
    let year = this.preview.getFullYear();
    this.preview = new Date(year, month - 1, date);
  }

  public getYear() {}

  public getMonth() {}

  public getDate() {}
}
