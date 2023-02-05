import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });

    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#changeTheme should set dark theme', () => {
    service.changeTheme('dark');
    service.theme$.subscribe((theme) => {
      expect(theme).withContext('dark theme').toBe('dark');
    });
  });

  it('#changeTheme should set light theme', () => {
    service.changeTheme('light');
    service.theme$.subscribe((theme) => {
      expect(theme).withContext('light theme').toBe('light');
    });
  });
});
