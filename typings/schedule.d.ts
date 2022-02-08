export declare type EventType = 'meeting' | 'travel' | 'normal' | '';

export declare interface Schedule {
  _id?: string;
  theme: string;
  start: string;
  end: string;
  event: string;
  type?: EventType;
  special?: boolean;
}

export declare interface AddScheduleOption {
  hour: number;
  start: string;
  end: string;
}
