import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {HomeService} from './home.service';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    ClipboardModule,
    MatTooltipModule
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
