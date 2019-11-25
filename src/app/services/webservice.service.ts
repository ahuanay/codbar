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
    return this.http.get(this.API_Server + 'empleados/');
  }

  //UsuarioEmpleado
  postCreateUsuarioEmpleado(usuariosEmpleado): Observable<any> {
    return this.http.post(this.API_Server + 'usuarios-empleado/', usuariosEmpleado);
  }

  //Producto
  getListProducto(): Observable<any> {
    return this.http.get(this.API_Server + 'productos/');
  }

  getByIdProducto(id): Observable<any> {
    return this.http.get(this.API_Server + 'productos/' + id);
  }

  postCreateProducto(producto): Observable<any> {
    return this.http.post(this.API_Server + 'productos/', producto);
  }

  updateProducto(id, producto): Observable<any> {
    return this.http.put(this.API_Server + 'productos/' + id, producto)
  }

  deleteProducto(id): Observable<any> {
    return this.http.delete(this.API_Server + 'productos/' + id);
  }
}
