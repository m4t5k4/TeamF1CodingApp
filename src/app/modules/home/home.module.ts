import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {HomeService} from './home.service';
import {ClipboardModule} from '@angular/cdk/clipboard';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    ClipboardModule
  ],
  exports:[
    HomeComponent
  ],
  providers:[
    HomeService
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
