type EventType = 'meeting' | 'travel' | 'normal' | '';

interface Schedule {
  _id?: string;
  theme: string;
  start: string;
  end: string;
  event: string;
  type?: EventType;
  special?: boolean;
}

interface AddScheduleOption {
  hour: number;
  start: string;
  end: string;
}

interface SelectOption {
  name: string;
  value: string | number;
}
