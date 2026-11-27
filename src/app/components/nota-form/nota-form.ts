import { Component, output, signal } from '@angular/core';

export interface NuevaNota {
  asignatura: string;
  valor: number;
}

@Component({
  selector: 'app-nota-form',
  templateUrl: './nota-form.html',
  styleUrl: './nota-form.css'
})
export class NotaForm {
  readonly asignatura = signal('');
  readonly valor = signal('');
  readonly aviso = signal('');
  readonly nuevaNota = output<NuevaNota>();

  guardar(): void {
    const asignatura = this.asignatura().trim();
    const valor = Number(this.valor().replace(',', '.'));
    if (!asignatura) {
      this.aviso.set('Indica la asignatura');
      return;
    }
    if (this.valor().trim() === '' || Number.isNaN(valor) || valor < 0 || valor > 10) {
      this.aviso.set('La nota tiene que estar entre 0 y 10');
      return;
    }
    this.nuevaNota.emit({ asignatura, valor });
    this.asignatura.set('');
    this.valor.set('');
    this.aviso.set('');
  }
}
