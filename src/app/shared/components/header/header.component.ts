import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  onHome: boolean = true;

  constructor(private router: Router) {}

  public go2Home() {
    this.router.navigate(['/']);
    this.onHome = true;
  }

  public go2Contact() {
    this.onHome = false;
    this.router.navigate(['/contact']);
  }
}
