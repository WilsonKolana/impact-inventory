import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductReportService } from 'src/app/services/product-report.service';

@Component({
  selector: 'app-product-report-form',
  templateUrl: './product-report-form.component.html',
  styles: [
  ]
})
export class ProductReportFormComponent implements OnInit {

  constructor(public service: ProductReportService) { }

  ngOnInit(): void {
  }

  resertForm(form: NgForm){
    form.form.reset();
  }

}
