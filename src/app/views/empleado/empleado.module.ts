import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpleadoComponent } from './empleado.component';
import { ListEmpleadoComponent } from './list-empleado/list-empleado.component';
import { CreateEmpleadoComponent } from './create-empleado/create-empleado.component';
import { DeleteEmpleadoComponent } from './delete-empleado/delete-empleado.component';


@NgModule({
  declarations: [
    EmpleadoComponent,
    ListEmpleadoComponent,
    CreateEmpleadoComponent,
    DeleteEmpleadoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    EmpleadoComponent,
    ListEmpleadoComponent,
    CreateEmpleadoComponent,
    DeleteEmpleadoComponent
  ]
})
export class EmpleadoModule { }
