import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthGuard } from 'src/app/security/guard/auth.guard';
import { AuthService } from 'src/app/security/services/auth.service';
import { UserService } from 'src/app/security/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService, public authGuard: AuthGuard) { }

  ngOnInit(): void {
  }

  reloadPage(): void {
    window.location.reload();
  }
}
