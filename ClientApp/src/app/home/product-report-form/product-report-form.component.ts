import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { ProductReportService } from 'src/app/services/product-report.service';

@Component({
  selector: 'app-product-report-form',
  templateUrl: './product-report-form.component.html',
  styles: [
  ]
})
export class ProductReportFormComponent implements OnInit {

  constructor(public service: ProductReportService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  resertForm(form: NgForm){
    form.form.reset();
    this.service.productFormData = new Product();
  }

  onSubmit(form: NgForm){
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.createProduct().subscribe({
      next:(data) => {
        this.toastr.success("Product successfully added", "New Product Added!")
        this.resertForm(form)
        this.router.navigate(["/home/product-report"]);
      },
      error:(err) => {
        console.log(err);
      }})
  }
}
