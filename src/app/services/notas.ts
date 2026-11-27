import { Injectable, computed, signal } from '@angular/core';

export interface Nota {
  id: number;
  asignatura: string;
  valor: number;
}

@Injectable({ providedIn: 'root' })
export class Notas {
  private siguienteId = 1;
  private readonly _notas = signal<Nota[]>([]);

  readonly notas = this._notas.asReadonly();
  readonly media = computed(() => {
    const lista = this._notas();
    if (lista.length === 0) {
      return 0;
    }
    const suma = lista.reduce((acc, n) => acc + n.valor, 0);
    return Math.round((suma / lista.length) * 100) / 100;
  });
  readonly aprobadas = computed(() => this._notas().filter((n) => n.valor >= 5).length);

  agregar(asignatura: string, valor: number): Nota | null {
    const nombre = asignatura.trim();
    if (!nombre || Number.isNaN(valor) || valor < 0 || valor > 10) {
      return null;
    }
    const nota: Nota = { id: this.siguienteId++, asignatura: nombre, valor };
    this._notas.update((lista) => [...lista, nota]);
    return nota;
  }

  eliminar(id: number): void {
    this._notas.update((lista) => lista.filter((n) => n.id !== id));
  }

  // Métodos nuevos SIN tests: bajan la cobertura por debajo del umbral
  notaMasAlta(): Nota | null {
    const lista = this._notas();
    if (lista.length === 0) {
      return null;
    }
    return lista.reduce((max, n) => (n.valor > max.valor ? n : max));
  }

  buscar(texto: string): Nota[] {
    const q = texto.trim().toLowerCase();
    if (!q) {
      return this._notas();
    }
    return this._notas().filter((n) => n.asignatura.toLowerCase().includes(q));
  }

  suspensas(): number {
    return this._notas().length - this.aprobadas();
  }
}
