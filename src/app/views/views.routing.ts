import { Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';

export const ViewsRoutes: Routes = [
    {
        path: 'empleado',
        component: EmpleadoComponent
    }
]