import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { GridDemoComponent } from './grid-demo/grid-demo.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        GridDemoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
