import { Component, OnInit } from '@angular/core';
import { Auth, EmailAuthCredential } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Appointment } from '../shared/types/types';
import { Timestamp } from '@angular/fire/firestore';
import { AppointmentService } from '../shared/services/appointment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{
  ownAppSub?: Subscription;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.userService.user().then(u => this.userDataForm.get('email')?.setValue(u?.email ? u!.email: null))
    this.userService.userData().subscribe(async u => {
      const user = await u;
      this.ownAppSub = this.appointentService.fetch((user!.selected_appointment!)).subscribe(a => this.appointment = a)
      this.userService.isAdmin().subscribe(is => this.isAdmin=is)
    })
  }

  appointment: Appointment | undefined = undefined;
  userDataForm = new FormGroup({
    email: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private userService: UserService, private appointentService: AppointmentService) {}

  update() {
    this.userService.user().then(u => {
      let email: string | null | undefined = this.userDataForm.get('email')?.value
      if (email) {
        u?.updateEmail(email)
      }
    })
  }
  
  
  deleteAppointment() {
    this.appointentService.unapply();
    this.ownAppSub?.unsubscribe();
    this.appointment = undefined;
  }

  deleteProfile() {

  }
}
