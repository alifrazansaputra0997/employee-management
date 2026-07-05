import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakebarNotification } from './snakebar-notification';

describe('SnakebarNotification', () => {
  let component: SnakebarNotification;
  let fixture: ComponentFixture<SnakebarNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakebarNotification],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakebarNotification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
