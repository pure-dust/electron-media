import { notifyAction } from './control';
import { useDatabase } from './control';

export class ScheduleMonitor {
  _clock: NodeJS.Timeout = null as unknown as NodeJS.Timeout;
  date: string = '';
  scheduleList: Schedule[] = [];
  needFirstNotice: Schedule[] = [];
  needCurNotice: Schedule[] = [];
  hasFirstNotified: string[] = [];
  hasCurNotified: string[] = [];
  constructor(date: string) {
    this.date = date;
    this.update();
    this.start();
  }

  start() {
    this._clock = setInterval(this.update, 5000);
  }

  update() {
    useDatabase('calendar', 'find', {
      query: {
        date: this.date,
      },
      cond: {
        sort: {
          updatedAt: 1,
        },
      },
    }).then((res) => {
      this.scheduleList = res as Schedule[];
      this.setFirstNotice();
      this.setCurrentNotice();
      this.notify();
    });
  }

  notify() {
    this.needFirstNotice.forEach((el) => {
      notifyAction({
        title: el.theme,
        body: el.event,
        silent: false,
      });
      this.hasFirstNotified.push(el._id as string);
    });
    this.needCurNotice.forEach((el) => {
      notifyAction({
        title: el.theme,
        body: el.event,
        silent: false,
      });
      this.hasCurNotified.push(el._id as string);
    });
  }

  setFirstNotice() {
    this.needFirstNotice = [];
    let time = new Date().getTime();
    let tar = null;
    this.scheduleList.forEach((el) => {
      tar = new Date(this.date);
      let t = el.start.split(':');
      tar.setHours(parseInt(t[0]), parseInt(t[1]));
      tar = tar.getTime();
      if (tar - time <= 0 && tar - time >= -5 * 60 * 1000 && !this.isFisrtNofity(el)) {
        this.needFirstNotice.push(el);
      }
    });
  }

  setCurrentNotice() {
    this.needCurNotice = [];
    let time = new Date().getTime();
    let tar = null;
    this.scheduleList.forEach((el) => {
      tar = new Date(this.date);
      let t = el.start.split(':');
      tar.setHours(parseInt(t[0]), parseInt(t[1]));
      tar = tar.getTime();
      if (time - tar <= 5 * 1000 && time - tar >= -5 * 1000 && !this.isCurNotify(el)) {
        this.needCurNotice.push(el);
      }
    });
  }

  isFisrtNofity(sc: Schedule): boolean {
    return this.hasFirstNotified.findIndex((el) => el === sc._id) > -1;
  }

  isCurNotify(sc: Schedule): boolean {
    return this.hasCurNotified.findIndex((el) => el === sc._id) > -1;
  }

  destroy() {
    clearInterval(this._clock);
  }
}
