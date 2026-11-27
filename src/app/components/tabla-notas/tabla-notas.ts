import { Component, input, output } from '@angular/core';

import { Nota } from '../../services/notas';

@Component({
  selector: 'app-tabla-notas',
  templateUrl: './tabla-notas.html',
  styleUrl: './tabla-notas.css'
})
export class TablaNotas {
  readonly notas = input<Nota[]>([]);
  readonly media = input(0);
  readonly borrar = output<number>();

  estado(valor: number): string {
    return valor >= 5 ? 'Aprobado' : 'Suspenso';
  }
}
