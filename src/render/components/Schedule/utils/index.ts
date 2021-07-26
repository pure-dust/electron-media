import _ from 'lodash';

interface ScheduleOption {
  lineHeight: number;
  lineWidth: number;
}

export class ScheduleGenerator {
  config: ScheduleOption = {
    lineHeight: 40,
    lineWidth: 160,
  };
  private scheduleList: Schedule[] = [];
  private cardList: Card[] = [];

  constructor(options?: ScheduleOption) {
    this.config = Object.assign(this.config, options);
  }

  private craeteSchedule(): ScheduleCard[] {
    let { scheduleList: list } = this;
    this.cardList = [];
    for (let i = 0; i < list.length; i++) {
      let card = new Card(list[i]);
      this.cardList.push(card);
    }
    this.cardList.forEach((el) => {
      el.udpate(this.cardList);
    });
    return this.cardList.map((el) => el.getCard());
  }

  public setList(list: Schedule[]): ScheduleCard[] {
    this.scheduleList = list;
    return this.craeteSchedule();
  }

  public getList(): ScheduleCard[] {
    return this.cardList.map((el) => el.getCard());
  }

  public add(schedule: Schedule): ScheduleCard[] {
    this.scheduleList.push(schedule);
    return this.craeteSchedule();
  }

  public remove(id: string): ScheduleCard[] {
    _.remove(this.scheduleList, (el) => el._id === id);
    return this.craeteSchedule();
  }
}

class Card {
  public top: number = 0;
  public left: number = 0;
  public width: number = 0;
  public height: number = 0;
  public schedule: Schedule;
  public id: string | undefined;
  public length: number = 0;
  public _isFixed: boolean = false;
  private cardList: Card[] = [];
  private maxOverlap: Card[] = [];
  public config: ScheduleOption = {
    lineHeight: 40,
    lineWidth: 160,
  };

  constructor(schedule: Schedule) {
    this.schedule = schedule;
    this.id = schedule._id;
    this.length = this.getLength();
    this.top = this.getTop();
    this.height = this.getHeight();
  }

  private getTop(): number {
    const { lineHeight } = this.config;
    let time = this.schedule.start.split(':');
    return parseInt(time[0]) * lineHeight + (time[1] === '00' ? 0 : lineHeight / 2);
  }

  private getHeight(): number {
    const { lineHeight } = this.config;
    let startTime = this.schedule.start.split(':');
    let endTime = this.schedule.end.split(':');
    let hour = parseInt(this.schedule.end[0]) - parseInt(this.schedule.start[0]);
    let height = hour * lineHeight;
    if (startTime[1] == '30') height -= lineHeight / 2;
    if (endTime[1] == '30') height += lineHeight / 2;
    return height;
  }

  private getLength(): number {
    let start = this.schedule.start.split(':');
    let end = this.schedule.end.split(':');
    let hour = parseInt(end[0]) - parseInt(start[0]);
    let minutes = parseInt(end[1]) - parseInt(start[1]);
    return hour * 60 + minutes;
  }

  private getRight(): number {
    return this.left + this.width;
  }

  private updateLeft() {
    const { maxOverlap: list } = this;
    let index = _.findIndex(list, (el) => el.schedule._id === this.schedule._id);
    let len = 0;
    let i = 0;
    if (list[i].left !== 0) {
      this.left = 0;
      return;
    }
    while (i < index - 1) {
      if (list[i].getRight() < list[i + 1].left) {
        this.left = list[i].getRight();
        return;
      }
      i++;
    }
    for (i = 0; i < list.length; i++) {
      if (list[i].schedule._id !== this.schedule._id) {
        len += list[i].width;
      } else {
        break;
      }
    }
    this.left = len;
  }

  private updateWidth() {
    let { lineWidth } = this.config;
    const { maxOverlap: list } = this;
    let index = _.findIndex(list, (el) => el.schedule._id === this.schedule._id);
    let i = 0;
    if (list[i].left !== 0) {
      this.width = list[i].left;
      return;
    }
    while (i < index - 1) {
      if (list[i].getRight() < list[i + 1].left) {
        this.width = list[i + 1].left - list[i].getRight();
        return;
      }
      i++;
    }
    i = 0;
    const len = list.length;
    list.forEach((el) => {
      if (el._isFixed && el.schedule._id !== this.schedule._id) {
        lineWidth -= el.width;
        i++;
      }
    });
    this.width = lineWidth / (len - i);
  }

  private getMaxOverlap(): Card[] {
    let overlap: Card[] = [];
    let children: Card[][] = [];
    _.forEach(this.cardList, (el) => {
      isOverlap(this.schedule, el.schedule) && overlap.push(el);
    });
    if (overlap.length === 0) {
      children.push([]);
    }
    let i = 0;
    while (i < overlap.length) {
      let f = false;
      for (let j = 0; j < children.length; j++) {
        let sign = arrayOverlap(children[j], (card) => {
          return isOverlap(overlap[i].schedule, card.schedule);
        });
        sign && children[j].push(overlap[i]);
        f = f || sign;
      }
      !f && children.push([overlap[i]]);
      i++;
    }
    overlap.forEach((el) => {
      for (let i = 0; i < children.length; i++) {
        if (
          !children[i].includes(el) &&
          arrayOverlap(children[i], (card) => {
            return isOverlap(el.schedule, card.schedule);
          })
        ) {
          children[i].push(el);
        }
      }
    });

    if (children.length > 1) {
      this._isFixed = true;
    }
    i = 0;
    let count = 0;
    for (let j = 0; j < children.length; j++) {
      if (children[j].length > count) {
        count = children[j].length;
        i = j;
      }
    }
    children[i].push(this);
    return children[i];
  }

  public udpate(list: Card[]) {
    this.cardList = list;
    this.maxOverlap = this.getMaxOverlap();
    this.updateLeft();
    this.updateWidth();
  }

  public getCard(): ScheduleCard {
    return {
      position: {
        top: this.top,
        left: this.left,
        width: this.width,
        height: this.height,
      },
      schedule: this.schedule,
    };
  }
}

function isOverlap(t: Schedule, s: Schedule): boolean {
  let t_start = parseInt(t.start.replace(':', ''));
  let t_end = parseInt(t.end.replace(':', ''));
  let s_start = parseInt(s.start.replace(':', ''));
  let s_end = parseInt(s.end.replace(':', ''));
  return !(t_end <= s_start || t_start >= s_end) && t._id !== s._id;
}

function arrayOverlap<T>(arr: T[], func: (item: T) => boolean): boolean {
  let sign = true;
  for (let i = 0; i < arr.length; i++) {
    sign = sign && func(arr[i]);
  }
  return sign;
}
