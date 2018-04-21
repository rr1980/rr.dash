import { Component } from '@angular/core';

@Component({
  selector: 'rr-app',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor() {
    console.log("I am Angular!");
  };
};