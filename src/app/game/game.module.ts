import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscaminasComponent } from './buscaminas/buscaminas.component';



@NgModule({
  declarations: [
    BuscaminasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BuscaminasComponent
  ]
})
export class GameModule { }
