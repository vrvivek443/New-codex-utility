import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private url = "https://demo.gov-codex.com:8001/api/";
  private _userProfile = new BehaviorSubject<any>([]);
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private _http: HttpClient) { 
    const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        this._userProfile.next(parsedUser.userProfiles);
        this.userSubject.next(parsedUser);
      }
  }

  getUserData(userid: any) {
    return this._http.get(this.url + 'user/get' + '?userid=' + userid);
  }

  updateUser(user: any) {
    this.userSubject.next(user);
  }
}
