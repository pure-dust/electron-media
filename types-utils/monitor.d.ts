/// <reference types="node" />
import { Schedule } from '../typings/schedule';
export declare class ScheduleMonitor {
    _clock: NodeJS.Timeout;
    date: string;
    scheduleList: Schedule[];
    needFirstNotice: Schedule[];
    needCurNotice: Schedule[];
    hasFirstNotified: string[];
    hasCurNotified: string[];
    constructor(date: string);
    start(): void;
    update(): void;
    notify(): void;
    setFirstNotice(): void;
    setCurrentNotice(): void;
    isFisrtNofity(sc: Schedule): boolean;
    isCurNotify(sc: Schedule): boolean;
    destroy(): void;
}
