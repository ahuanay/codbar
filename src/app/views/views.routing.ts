import { Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ProductoComponent } from './producto/producto.component';

export const ViewsRoutes: Routes = [
    {
        path: 'empleado',
        component: EmpleadoComponent
    },
    {
        path: 'producto',
        component: ProductoComponent
    }
]