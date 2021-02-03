import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        BrowserModule,
        RxReactiveFormsModule,
        NgxMaterialTimepickerModule,
    ],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule,
        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        BrowserModule,
        RxReactiveFormsModule,
        NgxMaterialTimepickerModule,
    ]
})
export class SharedModule { }
