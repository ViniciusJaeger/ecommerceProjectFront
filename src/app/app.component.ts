import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductRegisterComponent } from './product/product-register/product-register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductComponent,
    ProductRegisterComponent
  ],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'eccomerce-project';
}
