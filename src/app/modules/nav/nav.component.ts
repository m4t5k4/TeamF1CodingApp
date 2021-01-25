import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/services/auth.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  reloadPage(): void {
    window.location.reload();
  }
}
