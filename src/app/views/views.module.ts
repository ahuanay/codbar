import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewsRoutes } from './views.routing';
import { EmpleadoModule } from './empleado/empleado.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ViewsRoutes),
    EmpleadoModule
  ],
  exports: []
})
export class ViewsModule { }
