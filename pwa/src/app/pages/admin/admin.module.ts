import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { AdminMenuComponent } from "./menu/menu.component";


@NgModule({
	declarations: [
		LoginComponent,
		AdminMenuComponent
	],
	imports: [
		CommonModule,
		SharedModule,
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
