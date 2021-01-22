import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './security/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TeamF1CodingAPP';

  private roles: string[];
  isLoggedIn = false;
  showOfficeManagerBoard = false;
  showAdminBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('Admin');
      this.showOfficeManagerBoard = this.roles.includes('OfficeManager');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
