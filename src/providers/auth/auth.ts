import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  public api: string;
  public user: any;

  constructor(public http: Http, public storage: Storage) {
    //this.api = 'http://localhost:1337/';
    this.api = 'http://test.epsidev.com/';
    this.user = {grupo: {}};
  }

  // Auth
  login(username: string, password: string) {
    return this.http.post(this.api + 'user/login', {username: username, password: password}).map(res => res.json());
  }

  logout(cb: Function) {
    this.storage.remove('user').then(() => cb());
  }

  setUser(user: any) {
    this.user = user;
  }

  saveUser(user: any, cb: Function) {
    this.user = user;
    this.storage.set('user', JSON.stringify(user)).then(() => cb(user)).catch(err => cb({err: err}));
  }

  getUser(cb: Function) {
    this.storage.get('user').then(user => {
      return cb(JSON.parse(user));
    });
  }

}
