import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarTemplate } from './toolbar-template';

describe('ToolbarTemplate', () => {
  let component: ToolbarTemplate;
  let fixture: ComponentFixture<ToolbarTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarTemplate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
