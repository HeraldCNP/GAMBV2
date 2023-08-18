import { TestBed } from '@angular/core/testing';

import { ReportAlmService } from './report-alm.service';

describe('ReportAlmService', () => {
  let service: ReportAlmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportAlmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
