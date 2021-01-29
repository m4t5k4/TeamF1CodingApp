import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public longText = "https://angulartestingproject40.azurewebsites.net/";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToReservate() : void
  {
    this.router.navigate(['/employee']);
  }

  routeToDashboard() : void
  {
    this.router.navigate(['/dashboard']);
  }
  myFunction() : void{
    /* Get the text field */
    var copyText = document.getElementById("myInput");
  
    /* Select the text field */
   // copyText.select();
    //copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    //alert("Copied the text: " + copyText.value);
  }
}
