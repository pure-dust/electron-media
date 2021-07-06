import nedb from 'nedb';
import { insert, find, update, remove, CbFunc } from './operation';
import { join } from 'path';
import { app } from 'electron';
import Nedb from 'nedb';
interface DBType extends Index<Nedb> {
  calendar: Nedb;
}

export type TableList = 'calendar' | 'account';

function getPath(path: string) {
  return app.isPackaged ? join(app.getPath('exe'), '..' + path) : join(__dirname, path);
}

interface DBInstance extends Index<any> {
  insert: (data: any, cb?: CbFunc | undefined) => void;
  find: (query: any, cb?: CbFunc | undefined) => void;
  update: (
    query: string,
    data: any,
    options?: nedb.UpdateOptions | undefined,
    cb?: CbFunc | undefined,
  ) => void;
  remove: (query: any, options: nedb.RemoveOptions | undefined, cb?: CbFunc | undefined) => void;
}

export default class LocalDB {
  private db: DBType;

  constructor() {
    this.db = {
      calendar: new nedb({
        filename: getPath('/data/calendar.db'),
        autoload: true,
      }),
      account: new nedb({
        filename: getPath('/data/account.db'),
        autoload: true,
      }),
    };
  }

  static getInstance() {
    if (!LocalDB.Instance) {
      LocalDB.Instance = new LocalDB();
      return LocalDB.Instance;
    } else {
      return LocalDB.Instance;
    }
  }

  static Instance: LocalDB | null = null;

  public getTable(table: TableList) {
    return {
      insert: insert(this.db[table]),
      find: find(this.db[table]),
      update: update(this.db[table]),
      remove: remove(this.db[table]),
    } as DBInstance;
  }
}
