import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'user/registration', pathMatch:'full'},
  {
    path:'user', component: UserComponent,
    children: [
      {path: 'registration', component: RegistrationComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
