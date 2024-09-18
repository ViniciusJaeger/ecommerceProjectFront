import { Component, Input, OnInit } from '@angular/core';
import { ProductRegisterComponent } from './product-register/product-register.component';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ProductRegisterComponent,
    SearchComponent,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  productId: string = '';
  isEditForm: boolean = false;
  searchText: string = '';
  products: Product[] = [];
  product: Product = {
    id: '',
    name: '',
    price: 0,
    quantity: 0
  }
  displayedColumns: string[] = ['position', 'name', 'price', 'quantity', 'category', 'actions'];

  constructor(private productService: ProductService, private dialog: MatDialog, private formBuilder: FormBuilder) {
    this.productService.list().subscribe(products => this.products = products);
  }

  ngOnInit(): void { 
    this.productService.list().subscribe((products) => this.products = products);


    this.productService.listProductObservable().subscribe(() => {
      this.productService.list().subscribe((products) => this.products = products);
    }
    )
  }

  save(): void {
    const dialogRef = this.dialog.open(ProductRegisterComponent)

    dialogRef.afterOpened().subscribe(() => {
      const componentInstance = dialogRef.componentInstance;
      componentInstance.isEditForm = this.isEditForm;
      
      componentInstance.productForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: [0, Validators.required]
      })
    });

    dialogRef.afterClosed().subscribe(() => {
      this.productService.listProductAction();
    })
  }

  updateProduct(id: any) {
    this.isEditForm = true;
    this.productId = id;
    const dialogRef = this.dialog.open(ProductRegisterComponent)


    this.productService.getById(this.productId).subscribe(product => this.product = product);
    dialogRef.afterOpened().subscribe(() => {
      const componentInstance = dialogRef.componentInstance;
      componentInstance.isEditForm = this.isEditForm;
      componentInstance.productForm = this.formBuilder.group({
        id: [this.product.id],
        name: [this.product.name, Validators.required],
        price: [this.product.price, Validators.required]
      })
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isEditForm = false;
      this.productService.listProductAction();
    })
  }

  private normalizeText(word: string){
    return word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
    const searchTextNormalized = this.normalizeText(this.searchText)

    this.productService.list().subscribe(products => {
      this.products = products.filter(p => this.normalizeText(p.name).includes(searchTextNormalized));
    });
  }
}
