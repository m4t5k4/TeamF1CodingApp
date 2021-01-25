import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/services/auth.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  currentUser: any;
  token: any;

  constructor(private tokenStorage: TokenStorageService, public authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
