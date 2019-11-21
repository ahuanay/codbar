import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  // tslint:disable-next-line: variable-name
  public API_Server = 'https://codbar-api.herokuapp.com/api/';

  constructor(private http: HttpClient) { }

  // Empleado
  getListEmpleado(): Observable<any> {
    return this.http.get(this.API_Server + 'empleados');
  }

  postCreateEmpleado(empleado): Observable<any> {
    return this.http.post(this.API_Server + 'empleados', empleado);
  }
}
