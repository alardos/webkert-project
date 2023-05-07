import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppointmentsComponent } from './appointments/appointments.component';
import { SignupComponent } from './signup/signup.component';
import { TimestampToTimePipe } from './timestamp-to-time.pipe';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { ProfileComponent } from './profile/profile.component';
import { ManageComponent } from './manage/manage.component'
import { MatCardModule } from '@angular/material/card';
import { ModalComponent } from './modal/modal.component'
import { MatSelectModule } from '@angular/material/select'
import { MatTabsModule } from '@angular/material/tabs'
import { MatChipsModule } from '@angular/material/chips'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppointmentsComponent,
    SignupComponent,
    TimestampToTimePipe,
    ProfileComponent,
    ManageComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    ReactiveFormsModule,
    RouterModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [
    AppComponent, 
  ]
})
export class AppModule { }
