import { Component, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Products, ProductsTypes } from 'src/app/shared/definitions/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
        <form>
            <h2> Login </h2>
            <div class="fields"> 
                <input type="text">
                <input type="password">
            </div>

            <a routerLink="/admin/menu">
                <button type="submit"> Login </button>
            </a>
        </form>
    </div>
  `,
  styles: [`
    .container
        display: flex
        justify-content: center
        align-content: center
        min-height: 100vh
        width: 100%
    
    form 
        min-width: 400px
        background: whitesmoke
        display: flex
        flex-flow: column
        justify-content: space-around
        align-items: center
        padding: 20px 10px
        max-height: 300px

    .fields 
        display: flex
        flex-flow: column
  `]
})
export class LoginComponent {

  constructor(
    private productService: ProductService,
  ) { }

  async ngOnInit() {
  }

}
