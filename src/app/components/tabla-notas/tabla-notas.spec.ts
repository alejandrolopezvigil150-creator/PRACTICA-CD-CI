import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaNotas } from './tabla-notas';
import { Nota } from '../../services/notas';

describe('TablaNotas (componente)', () => {
  let fixture: ComponentFixture<TablaNotas>;
  let el: HTMLElement;

  const datos: Nota[] = [
    { id: 1, asignatura: 'Despliegue', valor: 8 },
    { id: 2, asignatura: 'Empresa', valor: 4 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TablaNotas] }).compileComponents();
    fixture = TestBed.createComponent(TablaNotas);
    el = fixture.nativeElement;
  });

  it('muestra un mensaje cuando no hay notas', () => {
    fixture.detectChanges();
    expect(el.querySelector('.sin-notas')).not.toBeNull();
    expect(el.querySelectorAll('li').length).toBe(0);
  });

  it('pinta cada nota con su estado y marca los suspensos', () => {
    fixture.componentRef.setInput('notas', datos);
    fixture.componentRef.setInput('media', 6);
    fixture.detectChanges();
    const filas = el.querySelectorAll('li');
    expect(filas.length).toBe(2);
    expect(filas[0].textContent).toContain('Aprobado');
    expect(filas[1].textContent).toContain('Suspenso');
    expect(filas[1].classList).toContain('suspenso');
    expect(el.querySelector('.media')?.textContent).toContain('6');
  });

  it('emite el id al pulsar ✕', () => {
    const borradas: number[] = [];
    fixture.componentInstance.borrar.subscribe((id) => borradas.push(id));
    fixture.componentRef.setInput('notas', datos);
    fixture.detectChanges();
    (el.querySelectorAll('button.borrar')[0] as HTMLButtonElement).click();
    expect(borradas).toEqual([1]);
  });
});
