import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { GridDemoComponent } from '../grid-demo/grid-demo.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full'
    },
    {
        path: 'home-page',
        component: HomePageComponent
	},
	{
		path:'grid-demo',
		component:GridDemoComponent
	}
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
