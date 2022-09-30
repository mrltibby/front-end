import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bionic-web-app';
  constructor(public router: Router){
    // router.navigate(["/","user"]);
  }
}
