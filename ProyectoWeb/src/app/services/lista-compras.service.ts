import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaComprasService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los productos
  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  // Método para actualizar un producto existente
  actualizarProducto(producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/productos/${producto.id_producto}`, producto);
  }

  // Método para eliminar un producto por su ID
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/productos/${id}`);
  }

  // Método para crear un nuevo producto
  crearProducto(producto: { nombre_producto: string; id_sitio: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/productos`, producto);
  }
}
