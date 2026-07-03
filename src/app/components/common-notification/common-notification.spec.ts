import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonNotification } from './common-notification';

describe('CommonNotification', () => {
  let component: CommonNotification;
  let fixture: ComponentFixture<CommonNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonNotification],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonNotification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
