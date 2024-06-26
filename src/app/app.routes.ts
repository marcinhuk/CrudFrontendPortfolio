import { Routes } from '@angular/router'

import { authGuard } from './auth.guard'

import { LoginComponent } from './views/login/login.component'
import { MainComponent } from './views/main/main.component'
import { NotFoundComponent } from './views/not-found/not-found.component'
import { UsersComponent } from './components/screens/users/users.component'
import { OrdersComponent } from './components/screens/orders/orders.component'
import { ProductsComponent } from './components/screens/products/products.component'
import { OrderProductsComponent } from './components/screens/order-products/order-products.component'

export const routes: Routes = [
	{
		path: "",
		component: LoginComponent
	},
	{
		path: "main",
		component: MainComponent,
		children: [
			{
				path: "orders",
				component: OrdersComponent
			},
			{
				path: "products",
				component: ProductsComponent
			},
			{
				path: "order-products/:id",
				component: OrderProductsComponent
			},
			{
				path: "users",
				component: UsersComponent,
				canActivate: [authGuard]
			},
		]
	},
	{
		path: "**" ,
		component: NotFoundComponent
	},
]