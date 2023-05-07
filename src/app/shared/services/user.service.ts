import { Injectable } from '@angular/core';
import { AngularFirestore, } from '@angular/fire/compat/firestore'
import { User, peek } from '../types/types';
import { User as FireUser, useDeviceLanguage, user } from '@angular/fire/auth';
import { firstValueFrom, map, mergeMap } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  get(uid: string | undefined) {
    if (uid === undefined) return Promise.reject() 
    
    return firstValueFrom(this.fireStore.collection<User>('users').doc(uid).valueChanges());
  }

  userData() {
    return this.auth.user.pipe(mergeMap(async u => {
      if (!(u)) {
        console.error('no authenticated user')
        throw Error('Authenticated user');
      }
      else {
        const result = await this.get(u.uid)
        return result;
      }
    }));
  }

  isAdmin() {
    return this.userData().pipe(map(u => {
      console.log('from is admin', u);
      if (!(u?.admin)) return false;
      return u.admin;
    }))
  }

  constructor(private fireStore: AngularFirestore, private authService: AuthService, private auth: AngularFireAuth) { }

  create(uid: string) {
    if (uid) {
      let user: User = { id: uid, selected_appointment: null};
      this.fireStore.collection<User>('users').doc(uid).set(user);
    }
    return user;
  }

  update(user: User) {
    return this.fireStore.collection<User>('users').doc(user.id).set(user);
  }


  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email,password)
      .then(u => this.get(u.user?.uid))
      .then(user => localStorage.setItem('user_data', JSON.stringify(user)));
  }

  signup(email: string, password: string, firstname?: string, lastname?: string) {
    console.log("signup");
    return this.auth.createUserWithEmailAndPassword(email,password)
    .then(peek)
      .then(u => this.create(u.user!.uid!))
      .then(user => localStorage.setItem('user_data',JSON.stringify(user)))
  }

  user() { return this.auth.currentUser; }
  observeUser() { return this.auth.user; }

  logout() { return this.auth.signOut(); }
}
