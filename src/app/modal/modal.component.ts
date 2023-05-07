import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Tatooist } from '../shared/types/types';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  selectedTime?: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  @Input() time?: Timestamp ;
  @Input() tattooists: Tatooist[] = [];
  @Input() isOpen: boolean = false
  @Output() confirm: EventEmitter<{time: Timestamp}> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter();

  

  closeModal() {
    this.isOpen = false;
    this.cancel.emit();
  }

  onConfirm() {
    this.isOpen = false;
    this.confirm.emit(); 
    
    
  }
}
