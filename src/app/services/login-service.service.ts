import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CaseSearchResponse } from '../interfaces/model';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  private url = 'https://demo.gov-codex.com:8001/api/';
  private _userProfile = new BehaviorSubject<any>([]);
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();


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

  getCaseSearch(caseNumbers: string[]) {
    const payload = { caseNumber: caseNumbers };

    return this._http.post<CaseSearchResponse>(
      this.url + 'casemaster/search',
      payload,
    );
  }

  updateUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
