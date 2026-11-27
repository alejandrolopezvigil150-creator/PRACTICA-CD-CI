import { TestBed } from '@angular/core/testing';

import { Notas } from './notas';

describe('Notas (servicio)', () => {
  let service: Notas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notas);
  });

  it('empieza vacío con media 0 y ninguna aprobada', () => {
    expect(service.notas()).toEqual([]);
    expect(service.media()).toBe(0);
    expect(service.aprobadas()).toBe(0);
  });

  it('agrega una nota válida recortando el nombre de la asignatura', () => {
    const n = service.agregar('  Despliegue ', 8.5);
    expect(n).toEqual({ id: 1, asignatura: 'Despliegue', valor: 8.5 });
    expect(service.notas().length).toBe(1);
  });

  it('rechaza asignaturas vacías y notas fuera de 0-10', () => {
    expect(service.agregar('  ', 7)).toBeNull();
    expect(service.agregar('Cliente', -1)).toBeNull();
    expect(service.agregar('Cliente', 10.5)).toBeNull();
    expect(service.agregar('Cliente', NaN)).toBeNull();
    expect(service.notas().length).toBe(0);
  });

  it('calcula la media con dos decimales y cuenta las aprobadas', () => {
    service.agregar('Servidor', 7);
    service.agregar('Cliente', 4);
    service.agregar('Diseño', 6);
    expect(service.media()).toBe(5.67);
    expect(service.aprobadas()).toBe(2);
  });

  it('elimina una nota por id y recalcula la media', () => {
    const a = service.agregar('Empresa', 3)!;
    service.agregar('Despliegue', 9);
    service.eliminar(a.id);
    expect(service.notas().map((n) => n.asignatura)).toEqual(['Despliegue']);
    expect(service.media()).toBe(9);
  });
});
