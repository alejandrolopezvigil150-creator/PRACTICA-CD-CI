import { Component, inject } from '@angular/core';

import { NotaForm, NuevaNota } from './components/nota-form/nota-form';
import { TablaNotas } from './components/tabla-notas/tabla-notas';
import { Notas } from './services/notas';

@Component({
  selector: 'app-root',
  imports: [NotaForm, TablaNotas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Error a propósito: se asigna un texto a una propiedad de tipo number
  protected readonly titulo: number = 'Mis notas';
  protected readonly notas = inject(Notas);

  guardar(n: NuevaNota): void {
    this.notas.agregar(n.asignatura, n.valor);
  }
}
