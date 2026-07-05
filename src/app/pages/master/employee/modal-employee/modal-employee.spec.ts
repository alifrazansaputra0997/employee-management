import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployee } from './modal-employee';

describe('ModalEmployee', () => {
  let component: ModalEmployee;
  let fixture: ComponentFixture<ModalEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEmployee],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEmployee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
