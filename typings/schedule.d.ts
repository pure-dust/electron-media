type EventType = 'meeting' | 'travel' | 'normal' | '';

interface ScheduleType {
  theme: string;
  start: string;
  end: string;
  event: string;
  type?: EventType;
  special?: boolean;
}

interface SchedulePosType {
  top: number;
  left: number;
  height: number;
  width: number;
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

interface ScheduleListType {
  positon: SchedulePosType;
  schedule: ScheduleType;
}
