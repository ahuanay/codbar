import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './producto.component';
import { ListProductoComponent } from './list-producto/list-producto.component';
import { CreateProductoComponent } from './create-producto/create-producto.component';
import { DeleteProductoComponent } from './delete-producto/delete-producto.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    ProductoComponent,
    ListProductoComponent,
    CreateProductoComponent,
    DeleteProductoComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductoModule { }
