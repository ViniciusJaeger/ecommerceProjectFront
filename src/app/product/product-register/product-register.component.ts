import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { __asyncValues, __values } from 'tslib';

@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.css',
})
export class ProductRegisterComponent implements OnInit {

  productId: string = '';
  productForm: FormGroup;
  isEditForm: boolean = false;

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private dialog: MatDialog) {

    this.productForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      price: [null, Validators.required]
    })
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.save(this.productForm.value).subscribe(result => this.OnSucess());
    }
  }

  onUpdate() {
    if (this.productForm.valid) {
      this.productService.update(this.productForm.value).subscribe(result => this.OnSucessUpdate());
    }
  }

  private OnSucess() {
    this._snackBar.open('Produto salvo com sucesso!', '', { duration: 5000 });
    this.dialog.closeAll();
  }

  private OnSucessUpdate() {
    this._snackBar.open('Produto alterado com sucesso!', '', { duration: 5000 });
    this.dialog.closeAll();
  }
}
