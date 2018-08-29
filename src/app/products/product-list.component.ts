import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  errorMessage: string;

  constructor(private route: ActivatedRoute,
            private router: Router,
            private productService: ProductService) { }


  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.productService.getProductsByID(id).subscribe(
      products => {
        this.products = products;
      },
      error => this.errorMessage = <any>error
    );
  }

}
