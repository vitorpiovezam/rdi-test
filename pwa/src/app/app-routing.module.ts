import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { MenuComponent } from './pages/products/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    loadChildren:  () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'admin',
    loadChildren:  () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
