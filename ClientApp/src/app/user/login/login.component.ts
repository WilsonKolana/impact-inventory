import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formModel = {
    Email: '',
    Password: ''
  }
  
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token') != null)
      this.router.navigateByUrl('/home/product-report');
  }

  onSubmit(form: NgForm) {
    //need find a way to use non-depracated subscribe variant
    this.service.login(form.value).subscribe(
      (res: any) => {
        sessionStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home/product-report');
      },
      (err: any) => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    );
  }


}
