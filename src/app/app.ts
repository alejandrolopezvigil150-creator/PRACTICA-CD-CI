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
  protected readonly titulo: string = 'Mis notas del curso 🎓';
  protected readonly notas = inject(Notas);

  guardar(n: NuevaNota): void {
    this.notas.agregar(n.asignatura, n.valor);
  }
}
