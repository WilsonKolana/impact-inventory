import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductReportService } from 'src/app/services/product-report.service';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styles: [
  ]
})
export class ProductReportComponent implements OnInit {

  AllProducts: Product[] = [];

  constructor(public service: ProductReportService) { }

  ngOnInit(): void {
    this.get()
  }

  get(){
      this.service.getAllProducts().subscribe((data) => {
      this.AllProducts = data;
    });
  }
}
