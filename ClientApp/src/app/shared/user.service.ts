import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7040/api';
  
  formModel = this.fb.group({
    Name: ['', Validators.required],
    Surname: ['', Validators.required],
    Email: ['', Validators.required, Validators.email],
    Passwords: this.fb.group({
      Password: ['', Validators.required, Validators.minLength(4)],
      ConfirmPassword: ['', Validators.required]
    })
  });

  register() {
    var body = {
      Name: this.formModel.value.Name,
      Surname: this.formModel.value.Surname,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords?.Password
    };
    return this.http.post(this.BaseURI + '/Authentication/Register', body);
  }
}
