import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import '../../../node_modules/rxjs/add/observable/fromArray';
import '../../../node_modules/rxjs/add/observable/fromPromise';
import PouchDB from '../../../node_modules/pouchdb/dist/pouchdb';
import * as _ from 'lodash';

/*
  Generated class for the Aluno provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Grupo {
  constructor() {
    this._db = window.cordova ? new PouchDB('grupo', {adapter: 'websql'}) : new PouchDB('grupo');
    // this._db.destroy();
    this._results;

    this.whenUnblocked = this.getAll();
  }

  add(result) {
    return Observable.fromPromise(this._db.post(result));
  }

  update(result) {
    return Observable.fromPromise(this._db.put(result));
  }

  delete(result) {
    return Observable.fromPromise(this._db.remove(result));
  }

  getAll() {
    if (!this._results) {
      return Observable.fromPromise(this._db.allDocs({ include_docs: true })
        .then(docs => {
          // Each row has a .doc object and we just want to send an
          // array of birthday objects back to the calling controller,
          // so let's map the array to contain just the .doc objects.

          this._results = _.map(docs.rows,'doc');

          // Listen for changes on the database.
          this._db.changes({ live: true, since: 'now', include_docs: true })
              .on('change', (change) => {
                let index = this._findIndex(this._results, change.id);
                let result = this._results[index];

                if (change.deleted) {
                  if (result) {
                    this._results.splice(index, 1); // delete
                  }
                } else {
                  if (result && result._id === change.id) {
                    this._results[index] = change.doc; // update
                  } else {
                    this._results.splice(index, 0, change.doc) // insert
                  }
                }
              });

          return this._results;
        }));
    } else {
      // Return cached data as a promise
      return Observable.of(this._results);
    }
  }

  _findIndex (array, id) {
    let low = 0, high = array.length, mid;
    while (low < high) {
        mid = (low + high) >>> 1;
        array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  }


}
