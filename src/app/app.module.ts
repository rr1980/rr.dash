import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';


import { SharedModule } from './shared/shared.module';

import { AppRoutingModule, routedComponents } from './app-routing.module';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        BrowserModule,
        SharedModule.forRoot(),
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        routedComponents
    ],
    providers: [
    ]
})

export class AppModule {
};

