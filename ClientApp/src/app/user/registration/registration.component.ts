import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.service.register().subscribe({
      complete: () => { 
        this.service.formModel.reset();
        alert("user created, check the database");
        // this.toastr.success('New user created!', 'Registration successful.');
       }, // completeHandler
      error: (error) => {
          alert(error)
          console.log(error); 
        },    // errorHandler 
      next: () => {  },     // nextHandler
      
  });
  
  }
 
  // onSubmit() {
  //   this.service.register().subscribe(
      
  //       (res: any) => {
  //         if (res.succeeded) {
           
  //         } else {
  //           res.errors.forEach((element: { code: any; }) => {
  //             switch (element.code) {
  //               case 'DuplicateUserName':
  //                 // this.toastr.error('Username is already taken','Registration failed.');
  //                 break;

  //               default:
  //               // this.toastr.error(element.description,'Registration failed.');
  //                 break;
  //             }
  //           });
  //         }
  //         error:(error: any) => {
           
  //           }
  //     }
      
  //   );
  // }


}
