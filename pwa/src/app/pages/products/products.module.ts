import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ListComponent } from "./list/list.component";
import { MenuComponent } from "./menu/menu.component";

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MenuComponent
      }
    ])
  ],
})
export class ProductsModule { }
