import { BehaviorSubject, Subject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: Subject<boolean> = new BehaviorSubject(false);
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn.next(this.authService.isLoggedIn());
  }

  logout(): void {
    this.isLoggedIn.next(false);
    this.authService.logout();
  }
}
