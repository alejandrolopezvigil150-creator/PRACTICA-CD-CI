import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaForm, NuevaNota } from './nota-form';

describe('NotaForm (componente)', () => {
  let fixture: ComponentFixture<NotaForm>;
  let el: HTMLElement;
  let emitidas: NuevaNota[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NotaForm] }).compileComponents();
    fixture = TestBed.createComponent(NotaForm);
    el = fixture.nativeElement;
    emitidas = [];
    fixture.componentInstance.nuevaNota.subscribe((n) => emitidas.push(n));
    fixture.detectChanges();
  });

  function rellenar(selector: string, valor: string): void {
    const input = el.querySelector(selector) as HTMLInputElement;
    input.value = valor;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function guardar(): void {
    (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  }

  it('emite la nota (acepta coma decimal) y vacía los campos', () => {
    rellenar('.asignatura', 'Interfaces');
    rellenar('.valor', '7,25');
    guardar();
    expect(emitidas).toEqual([{ asignatura: 'Interfaces', valor: 7.25 }]);
    expect((el.querySelector('.asignatura') as HTMLInputElement).value).toBe('');
    expect(el.querySelector('.aviso')).toBeNull();
  });

  it('avisa si falta la asignatura', () => {
    rellenar('.valor', '6');
    guardar();
    expect(emitidas.length).toBe(0);
    expect(el.querySelector('.aviso')?.textContent).toContain('asignatura');
  });

  it('avisa si la nota está fuera de rango o vacía', () => {
    rellenar('.asignatura', 'Servidor');
    rellenar('.valor', '12');
    guardar();
    expect(el.querySelector('.aviso')?.textContent).toContain('entre 0 y 10');
    rellenar('.valor', '');
    guardar();
    expect(emitidas.length).toBe(0);
  });
});
