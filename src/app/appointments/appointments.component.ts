import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentService } from '../shared/services/appointment.service';
import { CollectionReference, DocumentReference, collection } from '@angular/fire/firestore';
import { Appointment } from '../shared/types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  appointments: Appointment[] = [];
  sub: Subscription | undefined;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() { this.appointmentService.getAllAvailable().subscribe(ava => this.appointments = ava); }
  ngOnDestroy() { this.sub?.unsubscribe(); }

  apply = (selected: Appointment) => this.appointmentService.apply(selected)

}
