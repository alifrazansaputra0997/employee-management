import { TestBed } from '@angular/core/testing';

import { CommonNotificationService } from './common-notification';

describe('CommonNotification', () => {
  let service: CommonNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
