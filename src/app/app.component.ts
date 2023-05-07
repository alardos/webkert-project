import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { Observable, from, startWith } from 'rxjs';
import { peek } from './shared/types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tattoo_appointment';
  user: firebase.default.User | null = null;

  constructor(private router: Router, private userService: UserService) { }

  isAdmin: boolean = false;

  ngOnInit(): void {
    this.userService.observeUser().subscribe(u => {
      this.user = u;
      localStorage.setItem("user", JSON.stringify(u));
    }, error => {
      localStorage.setItem("user", JSON.stringify('null'));
    });

    this.userService.isAdmin().subscribe(is => this.isAdmin=is)
  }
  signOut() {
    this.userService.logout();
    this.router.navigateByUrl('/login')
  }

  
}
