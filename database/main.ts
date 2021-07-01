import nedb from 'nedb';
import { insert, find, update, remove } from './operation';

interface DBType extends Index<Nedb> {
  calendar: Nedb;
}

export default class LocalDB {
  private db: DBType;
  constructor() {
    this.db = {
      calendar: new nedb({
        filename: '/data/calendar.db',
        autoload: true,
      }),
    };
  }

  public insert(database: string) {
    return insert(this.db[database]);
  }
  public find(database: string) {
    return insert(this.db[database]);
  }
  public update(database: string) {
    return insert(this.db[database]);
  }
  public remove(database: string) {
    return insert(this.db[database]);
  }
}
