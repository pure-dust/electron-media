import { Index } from '../typings/global';
interface CalenlarOptions {
    cycle?: string;
    lunar?: boolean;
    holiday?: boolean;
}
export interface CalendarType extends Index<any> {
    year: string | number;
    month: string | number;
    date: string | number;
    week: string;
    day: number;
    current: boolean;
    lunarYear: string;
    lunarMonth: string;
    lunarDate: string;
    starSign: string;
    festivals: Array<string>;
    otherFestivals: Array<string>;
    now: boolean;
    yi: Array<string>;
    ji: Array<string>;
    rest: boolean;
    dateTime: string;
}
export declare class Calenar {
    private current;
    private preview;
    constructor(options?: CalenlarOptions);
    private isSameDate;
    private isSameMonth;
    private createDateItem;
    setDate(date: Date): void;
    getCalendar(): Array<CalendarType>;
    getNext(): void;
    getPreious(): void;
    getCurrent(): Date;
    getYear(): number;
    getMonth(): number;
    getDate(): number;
    getLunarYear(date: Date): string;
    getLunarMonth(date: Date): string;
    getLunarDate(date: Date): string;
    getStarSign(date: Date): string;
    getFestivals(date: Date): Array<string>;
    getOtherFestivals(date: Date): Array<string>;
    getDateYi(date: Date): Array<string>;
    getDateJi(date: Date): Array<string>;
}
export {};
