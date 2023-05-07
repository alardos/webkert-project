import { Timestamp } from "@angular/fire/firestore";

export interface Appointment {
  id: string,
  available: boolean,
  time: Timestamp,
}

export interface Tatooist {
  id?: string,
  nickname: string,
  speciality: string,
}

export interface User {
  id: string,
  selected_appointment?: string | null,
  admin?: boolean,
}

export function peek<T>(arg: T):T {
  console.log(arg);
  return arg;
}

export function assert(value: boolean, message?: string) {
  if (value === false) throw Error('Assertation failed: ' + message);
}