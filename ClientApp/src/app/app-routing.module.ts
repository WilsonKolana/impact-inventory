import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductReportComponent } from './home/product-report/product-report.component';
import { ProductReportFormComponent } from './home/product-report-form/product-report-form.component';

const routes: Routes = [
  {path:'', redirectTo:'user/registration', pathMatch:'full'},
  {
    path:'user', component: UserComponent,
    children: [
      {path: 'registration', component: RegistrationComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
  {path:'home',component:HomeComponent,
   children: [
    {path: 'product-report', component:ProductReportComponent},
    {path:'product-report-form', component: ProductReportFormComponent}
   ]

  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
