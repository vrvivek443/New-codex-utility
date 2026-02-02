import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberlogout',
  templateUrl: './memberlogout.component.html',
  styleUrls: ['./memberlogout.component.css']
})
export class MemberlogoutComponent {

   _userEmail: string = '';

  constructor(private router: Router){}

  ngOnInit()
  {
    console.log(localStorage.getItem('NA_User'));
    if (localStorage.getItem('NA_User')) {
      this._userEmail = localStorage.getItem('NA_User') || '';
    }
  }

  login()
  {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
