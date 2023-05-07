import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { Auth } from '@angular/fire/auth';
import { ManageComponent } from './manage/manage.component';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, },
	{ path: 'signup', component: SignupComponent, },
	{ path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard]},
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
	{ path: 'admin', component: ManageComponent, canActivate: [AdminGuard]},
	{ path: '', redirectTo: '/appointments', pathMatch: 'full'},
	{ path: '**', redirectTo: '/appointments'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
