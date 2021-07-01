import Nedb, { UpdateOptions } from 'nedb';

export function insert(db: Nedb) {
  return function (data: any, cb?: Function) {
    db.insert(data, (err: Error | null, message: any) => {
      cb && cb(err || message);
    });
  };
}

export function find(db: Nedb) {
  return function (query: any, cb?: Function) {
    db.find(query, (err: Error | null, message: any) => {
      cb && cb(err || message);
    });
  };
}

export function update(db: Nedb) {
  return function (query: string, data: any, options?: UpdateOptions, cb?: Function) {
    db.update(query, data, options, (err: Error | null, message: any) => {
      cb && cb(err || message);
    });
  };
}

export function remove(db: Nedb) {
  return function (query: any, cb?: Function) {
    db.remove(query, (err: Error | null, message: any) => {
      cb && cb(err || message);
    });
  };
}
