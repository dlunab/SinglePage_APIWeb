import { Component, OnInit } from '@angular/core';
import { ListaComprasService } from '../../services/lista-compras.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  listaCompras: any[] = [];
  filteredListaCompras: any[] = [];
  searchTerm: string = '';
  primerProductoNombre: string = '';
  productoEditando: any = null;
  nuevoProducto: any = { nombre_producto: '', id_sitio: '' };
  modoCreacion: boolean = false;

  constructor(private listaComprasService: ListaComprasService, public auth: AuthService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.listaComprasService.obtenerProductos().subscribe((data) => {
      this.listaCompras = data;
      this.filteredListaCompras = data;
    });
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin  // Redirige a la página principal
      }
    });
  }
  
  habilitarEdicion(item: any) {
    this.productoEditando = { ...item };
  }

  cancelarEdicion() {
    this.productoEditando = null;
  }

  abrirModoCreacion() {
    this.modoCreacion = true;
    this.nuevoProducto = { nombre_producto: '', id_sitio: '' };
  }

  cancelarCreacion() {
    this.modoCreacion = false;
    this.nuevoProducto = { nombre_producto: '', id_sitio: '' };
  }

  guardarEdicion() {
    if (this.productoEditando) {
      this.listaComprasService.actualizarProducto(this.productoEditando).subscribe(() => {
        this.obtenerProductos();
        this.productoEditando = null;
      });
    } else if (this.modoCreacion) {
      this.listaComprasService.crearProducto(this.nuevoProducto).subscribe(() => {
        this.obtenerProductos();
        this.cancelarCreacion();
      });
    }
  }

  buscarProducto() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredListaCompras = this.listaCompras.filter((item) =>
      item.nombre_producto.toLowerCase().includes(searchTermLower) ||
      item.id_sitio.toString().toLowerCase().includes(searchTermLower)
    );
  }

  eliminarProducto(item: any) {
    const id = item.id_producto;
    this.listaComprasService.eliminarProducto(id).subscribe(() => {
      this.obtenerProductos();
      //console.log(Producto con id ${id} eliminado.);
    }, error => {
      console.error("Error al eliminar el producto:", error);
    });
  }
}