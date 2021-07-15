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
  private scheduleCardList: ScheduleCard[] = [];

  constructor(options?: ScheduleOption) {
    this.config = Object.assign(this.config, options);
  }

  private craeteSchedule(): ScheduleCard[] {
    this.scheduleCardList = [];
    let { scheduleList: list } = this;
    for (let i = 0; i < list.length; i++) {
      this.scheduleCardList.push({
        position: this.getPos(list[i]),
        schedule: list[i],
      });
      this.scheduleCardList.forEach((el) => {
        this.changeWidth(el);
      });
      this.scheduleCardList.forEach((el) => {
        this.changeLeft(el);
      });
    }

    return this.scheduleCardList;
  }

  private changeWidth(card: ScheduleCard) {
    const { lineWidth } = this.config;
    let overlap: ScheduleCard[] = [];
    _.forEach(this.scheduleCardList, (el) => {
      this.isOverlap(card.schedule, el.schedule) && overlap.push(el);
    });
    overlap = _.sortBy(overlap, (el) => el.position.left);
    let i = 0;
    const len = overlap.length;
    if (len > 0 && card.position.left >= this.getRight(overlap[len - 1])) {
      card.position.width = lineWidth - this.getRight(overlap[len - 1]);
      return;
    }
    while (i < len) {
      const t = overlap[i].position;
      const c = card.position;
      let index = _.findIndex(this.scheduleCardList, (el) => el.schedule._id === card.schedule._id);
      if (c.left < t.left && c.left + c.width > t.left) {
        if (index > -1) {
          this.scheduleCardList[index].position.width = t.left - c.left;
          return;
        }
      }
      i++;
    }
  }

  private changeLeft(card: ScheduleCard) {
    let overlap: ScheduleCard[] = [];
    _.forEach(this.scheduleCardList, (el) => {
      this.isOverlap(card.schedule, el.schedule) && overlap.push(el);
    });
    overlap = _.sortBy(overlap, (el) => el.position.left);
    let i = 0;
    while (i < overlap.length) {
      const t = overlap[i].position;
      const c = card.position;
      let index = _.findIndex(this.scheduleCardList, (el) => el.schedule._id === card.schedule._id);
      if (
        c.left > t.left + t.width &&
        ((overlap[i + 1] && this.getRight(overlap[i + 1]) > c.left + c.width) || !overlap[i + 1])
      ) {
        this.scheduleCardList[index].position.left = t.left + t.width;
      }
      i++;
    }
  }

  private getPos(t: Schedule): SchedulePos {
    const { lineWidth } = this.config;
    const { scheduleCardList: list } = this;
    let overlap: ScheduleCard[] = [];
    let left = 0;
    let width = 0;

    _.forEach(list, (el) => {
      this.isOverlap(t, el.schedule) && overlap.push(el);
    });
    overlap = _.sortBy(overlap, (el) => el.position.left);

    const len = overlap.length;

    if (len > 0) {
      if (overlap[0].position.left > 0) {
        left = 0;
        width = overlap[0].position.left;
      } else {
        let i = 0;
        let needChange: ScheduleCard[] = [];
        while (i < len - 1) {
          needChange.push(overlap[i]);
          let sign = this.getRight(overlap[i]);
          if (sign < overlap[i + 1].position.left) {
            left = sign;
            width = overlap[i + 1].position.left - sign;
            return {
              top: this.getTop(t),
              left: left,
              width: width,
              height: this.getHeight(t),
            };
          }
          i++;
        }
        needChange.push(overlap[i]);
        let last = needChange[needChange.length - 1];
        if (this.getRight(last) < lineWidth) {
          left = this.getRight(last);
          width = lineWidth - left;
        } else {
          width = lineWidth / (len + 1);
          left = width * len;
          needChange.forEach((el, i) => {
            let index = _.findIndex(
              this.scheduleCardList,
              (item) => item.schedule._id === el.schedule._id,
            );
            if (index > -1) {
              this.scheduleCardList[index].position.left = width * i;
            }
          });
        }
      }
    } else {
      left = 0;
      width = lineWidth;
    }

    return {
      top: this.getTop(t),
      left: left,
      width: width,
      height: this.getHeight(t),
    };
  }

  private isOverlap(t: Schedule, s: Schedule) {
    let t_start = parseInt(t.start.replace(':', ''));
    let t_end = parseInt(t.end.replace(':', ''));
    let s_start = parseInt(s.start.replace(':', ''));
    let s_end = parseInt(s.end.replace(':', ''));
    return !(t_end <= s_start || t_start >= s_end) && t._id !== s._id;
  }

  private getTop(t: Schedule): number {
    const { lineHeight } = this.config;
    let time = t.start.split(':');
    return parseInt(time[0]) * lineHeight + (time[1] === '00' ? 0 : lineHeight / 2);
  }

  private getRight(t: ScheduleCard): number {
    return t.position.left + t.position.width;
  }

  private getHeight(t: Schedule): number {
    const { lineHeight } = this.config;
    let startTime = t.start.split(':');
    let endTime = t.end.split(':');
    let hour = parseInt(t.end[0]) - parseInt(t.start[0]);
    let height = hour * lineHeight;
    if (startTime[1] == '30') height -= lineHeight / 2;
    if (endTime[1] == '30') height += lineHeight / 2;
    return height;
  }

  public setList(list: Schedule[]): ScheduleCard[] {
    this.scheduleList = list;
    return this.craeteSchedule();
  }

  public getList(): ScheduleCard[] {
    return this.scheduleCardList;
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
