import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore'
import { Tatooist as Tattooist, peek } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class TattooistService {
  delete(id: string ) {
    this.fireStore.collection<Tattooist>('tattooists').doc(id).delete();
  }
  update(tattooist: Tattooist) {
    this.fireStore.collection<Tattooist>('tattooists').doc(tattooist.id).set(tattooist)
  }

  create(tattooist: Tattooist) {
    const id = this.fireStore.createId()
    tattooist = {...tattooist, id: id}
    this.fireStore.collection<Tattooist>('tattooists').doc(id).set(tattooist)
  }


  constructor(private fireStore: AngularFirestore) { }

  getAll() {
    return this.fireStore.collection<Tattooist>('tattooists').valueChanges().pipe(peek);
  }
}
