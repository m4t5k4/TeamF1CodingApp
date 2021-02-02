import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioComponent } from './scenario/scenario.component';
import { ReactiveFormsModule} from '@angular/forms'



@NgModule({
  declarations: [ScenarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ScenarioModule { }
