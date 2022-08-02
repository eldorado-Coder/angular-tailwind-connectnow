import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  control = new FormControl();

  constructor(private router: Router) {}

  public go2Home() {
    this.router.navigate(['/']);
  }

  public go2Contact() {
    this.router.navigate(['/contact']);
  }
}
