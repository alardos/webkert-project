import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore'
import { DocumentReference, Timestamp, collection, doc, where } from '@angular/fire/firestore';
import { ref } from '@angular/fire/storage';
import { Observable, filter, firstValueFrom, map } from 'rxjs';
import { Appointment, User, peek } from '../types/types';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AppComponent } from 'src/app/app.component';
import { query } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  delete(id: string) {
    return this.fireStore.collection<Appointment>('appointments').doc(id).delete().catch(_=> console.log('could not delete'));
  }

  constructor(private authService: AuthService, private userService: UserService, private fireStore: AngularFirestore) { }

  getAll(): Observable<Appointment[]> {
    return this.fireStore.collection<Appointment>('appointments').valueChanges()
  }

  getAllAvailable(): Observable<Appointment[]> {
    return this.fireStore.collection<Appointment>('appointments', ref => ref.where('available', '==', true)).valueChanges()
  }

  getByTime(time: number) {
    return this.fireStore.collection<Appointment>('apppointments', ref => ref.where('time', '==', time)).doc().valueChanges();
  }

  apply(appointment: Appointment) {
    // 1. make the appointment's available false
    // 2. remove the user's appointment
    this.userService.userData().subscribe(u => {
      if (u) {
        console.log(u?.selected_appointment);
        if (!(u.selected_appointment)) {
          this.lockDownAppointment(appointment);
          this.userService.update({ ...u, selected_appointment: appointment.id })
        } // todo: else what if the user already have an appointment
      }
    });

  }

  async unapply() {
    // 1. make the appointment's available true
    // 2. remove the user's appointment
    this.userService.userData().subscribe(u => {
      if (u) {
        if (u.selected_appointment) {
          this.freeUpAppointment(u.selected_appointment)
          this.userService.update({ ...u, selected_appointment: null })
        }
      }
    })
  }

  fetch(id: string): Observable<Appointment | undefined> {
    return (id)
      ? this.fireStore.collection<Appointment>('appointments').doc(id).valueChanges()
      : new Observable(undefined);
  }

  update(appointment: Appointment) {
    return this.fireStore.collection<Appointment>('appointments').doc(appointment.id).set(appointment);
  }

  lockDownAppointment(appointment: Appointment) {
    let sub = this.fetch(appointment.id).subscribe(a => {
      if (a) this.update({ ...a, available: false })
      sub.unsubscribe();
    })
  }

  freeUpAppointment(appointmentId: string) {
    console.log(appointmentId);

    let sub = this.fetch(appointmentId).subscribe(a => {
      console.log(a);
      if (a) this.update({ ...a, available: true })
      sub.unsubscribe();
    })
  }

  generate() {
    let timestamp = new Date();
    timestamp.setTime(Date.now())
    timestamp.setMinutes(0)
    for (let i = 0; i<100; i++) {
      timestamp.setHours(timestamp.getHours() + 1)
      const id = this.fireStore.createId()
      console.log(new Timestamp(timestamp.getTime()/1000,0));
      
      this.fireStore.collection<Appointment>('appointments').doc(id).set({
        id:id,
        available:true,
        time: new Timestamp(timestamp.getTime()/1000,0)
      })
    }
  }

}