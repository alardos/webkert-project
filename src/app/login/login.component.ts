import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { authInstance$ } from '@angular/fire/auth';
import { FormControl } from '@angular/forms';
import { UserService } from '../shared/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	email = new FormControl('');
	password = new FormControl('');

	constructor(private router: Router, private userService: UserService) { }
	login() {
		console.log('login started', this.email, this.password);
		if (this.email.valid !== null && this.password.value !== null) {
			this.userService.login(this.email.value!, this.password.value).then(_ => {
				this.router.navigateByUrl('/appointments')
			}).catch(e => console.log(e));
		}
	}
}
 