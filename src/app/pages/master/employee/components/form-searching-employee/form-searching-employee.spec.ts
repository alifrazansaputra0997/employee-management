import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchingEmployee } from './form-searching-employee';

describe('FormSearchingEmployee', () => {
  let component: FormSearchingEmployee;
  let fixture: ComponentFixture<FormSearchingEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSearchingEmployee],
    }).compileComponents();

    fixture = TestBed.createComponent(FormSearchingEmployee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
