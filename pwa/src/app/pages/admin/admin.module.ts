import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { EditProductDialogComponent } from "./menu/edit/edit-dialog.component";
import { AdminMenuComponent } from "./menu/menu.component";
import { NewProductDialogComponent } from "./menu/new/new-dialog.component";


@NgModule({
	declarations: [
		LoginComponent,
		AdminMenuComponent,
		EditProductDialogComponent,
		NewProductDialogComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild([
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'prefix'
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'menu',
				component: AdminMenuComponent
			}
		])
	],
})
export class AdminModule { }
