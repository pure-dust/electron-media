/// <reference types="@types/nedb" />
import { TableList } from '../database';
import { NotificationConstructorOptions } from 'electron/main';
import { RemoveOptions, UpdateOptions } from 'nedb';
import { ConfigItem, ConfigType } from '../typings/user-config';
import { Index } from '../typings/global';
import { FileInfo } from '../typings/novel';
export declare const getConfig: (message: string) => Promise<string | ConfigType>;
export declare const setConfig: (message: ConfigItem) => Promise<boolean>;
export declare const windowMove: (canMove: boolean) => void;
export declare const minScreen: () => void;
export declare const fixWindow: (fixed?: boolean) => Promise<unknown>;
export declare const closeWindow: () => void;
export declare type useDatabaseType = 'insert' | 'find' | 'update' | 'remove';
interface SortType extends Index<any> {
    createdAt?: number;
    updatedAt?: number;
}
export interface CondType extends Index<any> {
    sort?: SortType;
    limit?: number;
    skip?: number;
    projection?: Index<any>;
}
export interface useDatabaseOption extends Object {
    data?: any;
    query?: any;
    update?: UpdateOptions;
    remove?: RemoveOptions;
    cond?: CondType;
}
export declare const useDatabase: (table: TableList, type: useDatabaseType, params: useDatabaseOption) => Promise<unknown>;
export declare const notifyAction: (notice: NotificationConstructorOptions) => void;
export declare const selectFile: () => Promise<FileInfo[]>;
export {};
