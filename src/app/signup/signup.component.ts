import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common'
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });
  constructor(private router: Router, private location: Location, private userService: UserService) {}

  signup() {
    if (this.signUpForm.get('email')?.value && this.signUpForm.get('password')?.value)
      this.userService.signup(
        this.signUpForm.get('email')?.value!,
        this.signUpForm.get('password')?.value!,
        this.signUpForm.get('name')?.get('firstname')?.value!,
        this.signUpForm.get('name')?.get('lastname')?.value!,

      ).then(_ => this.router.navigateByUrl("/appointments"))
  }

  goBack() { this.location.back(); }
}
