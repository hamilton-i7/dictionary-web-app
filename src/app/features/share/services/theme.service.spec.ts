import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs';
import { COOKIE_THEME } from '../../../core/constants/cookies';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const cookieSpy = jasmine.createSpyObj('CookieService', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: CookieService, useValue: cookieSpy },
      ],
    });

    service = TestBed.inject(ThemeService);
    cookieServiceSpy = TestBed.inject(
      CookieService
    ) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#changeTheme should set selected theme', () => {
    service.changeTheme('dark');
    service.theme$.pipe(first()).subscribe((theme) => {
      expect(theme)
        .withContext("theme should be 'dark' after selecting that theme")
        .toBe('dark');
    });

    service.changeTheme('light');
    service.theme$.pipe(first()).subscribe((theme) => {
      expect(theme)
        .withContext("theme should be 'light' after selecting that theme")
        .toBe('light');
    });
  });

  it('#changeTheme should set COOKIE_THEME to be selected theme', () => {
    cookieServiceSpy.get.and.returnValue('light');
    service.changeTheme('light');
    service.theme$.pipe(first()).subscribe(() => {
      expect(cookieServiceSpy.get(COOKIE_THEME))
        .withContext("cookie should be set to be 'light'")
        .toBe('light');
    });
  });
});
