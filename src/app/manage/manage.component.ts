import { Component, OnInit, assertPlatform } from '@angular/core';
import { AppointmentService } from '../shared/services/appointment.service';
import { Appointment, Tatooist, assert } from '../shared/types/types';
import { FormControl, FormGroup } from '@angular/forms';
import { TattooistService } from '../shared/services/tattooist.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  removeAppointmet(appointment: Appointment) {
    console.log(appointment);
    
    this.appointmentService.delete(appointment.id)
  }
  delete(tattooist: Tatooist) {
    this.tattooistService.delete(tattooist.id!);
  }
  edit(tattooist: Tatooist) {
    this.isUpdateOpen = true
    this.currentlyEdited = tattooist;
    this.form.get('nickname')?.setValue(this.currentlyEdited.nickname)
    this.form.get('speciality')?.setValue(this.currentlyEdited.speciality)
  }

  appointments: Appointment[] = [];
  currentlyEdited?: Tatooist;
  tattooists: Tatooist[] = [];
  isModalOpen: boolean = false;
  isUpdateOpen: boolean = false;

  constructor(private tattooistService: TattooistService, private appointmentService: AppointmentService) { }

  form = new FormGroup({
    nickname: new FormControl(''),
    speciality: new FormControl('')
  });
  async ngOnInit(): Promise<void> {
    this.appointmentService.getAll().subscribe(arr => {
      arr.sort((a,b) => a.time.toDate().getTime() - b.time.toDate().getTime());
      this.appointments = arr;
    })
    this.tattooistService.getAll().subscribe(arr => {
      this.tattooists = arr
      assert(this.tattooists.length > 0, 'tattooists were found')
    });
  }

  create() {
    this.isModalOpen = false;
    this.tattooistService.create({
      nickname: this.form.get('nickname')!.value!,
      speciality: this.form.get('speciality')?.value!
    })

  }

  update() {
    this.tattooistService.update({
      id: this.currentlyEdited?.id,
      nickname: this.form.get('nickname')!.value!,
      speciality: this.form.get('speciality')?.value!
    })
  }

  createAppointment() {
    this.appointmentService.generate()
  }

  onCancel() {
    this.isModalOpen = false;
    this.isUpdateOpen = false;
    this.currentlyEdited = undefined;
  }


}
