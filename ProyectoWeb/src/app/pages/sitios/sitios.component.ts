import { Component } from '@angular/core';

@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.scss']
})
export class SitiosComponent {
  modalAbierto = false; // Controla la visibilidad del modal
  nuevoSitio = { nombre: '' }; // Almacena el nuevo sitio que se está creando

  // Método para abrir el modal
  abrirModal() {
    this.modalAbierto = true;
  }

  // Método para cerrar el modal
  cerrarModal() {
    this.modalAbierto = false;
  }

  // Método para guardar el sitio
  guardarSitio() {
    // Lógica para guardar el sitio en la base de datos o en la lista de sitios
    console.log('Sitio guardado:', this.nuevoSitio);
    this.cerrarModal(); // Cerrar el modal después de guardar
  }
}
