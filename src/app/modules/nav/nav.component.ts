import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthGuard } from 'src/app/security/guard/auth.guard';
import { AuthService } from 'src/app/security/services/auth.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { UserService } from 'src/app/security/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  currentUser: "";
  token: any;

  constructor(private tokenStorage: TokenStorageService, public authService: AuthService, public authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
