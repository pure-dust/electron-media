import Nedb, { RemoveOptions, UpdateOptions } from 'nedb';

export type CbFunc = (mas: any) => void;

export function insert(db: Nedb) {
  return function (data: any, cb?: CbFunc) {
    db.insert(data, (err: Error | null, message: any) => {
      cb && cb(err || message);
    });
  };
}

export function find(db: Nedb) {
  return function (query: any, cb?: CbFunc) {
    db.find(query, (err: Error | null, message: any) => {
      cb && cb(err || message);
    });
  };
}

export function update(db: Nedb) {
  return function (query: string, data: any, options?: UpdateOptions, cb?: CbFunc) {
    db.update(query, data, options, (err: Error | null, message: any) => {
      cb && cb(err || message);
    });
  };
}

export function remove(db: Nedb) {
  return function (query: any, options?: RemoveOptions, cb?: CbFunc) {
    db.remove(query, options as RemoveOptions, (err: Error | null, message: any) => {
      console.log(err, message);
      cb && cb(err || message);
    });
  };
}