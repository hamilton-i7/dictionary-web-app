import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs';
import { COOKIE_FONT } from '../../../core/constants/cookies';

import { Font, FontService } from './font.service';

describe('FontService', () => {
  let service: FontService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [FontService, { provide: CookieService, useValue: spy }],
    });

    service = TestBed.inject(FontService);
    cookieServiceSpy = TestBed.inject(
      CookieService
    ) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#changeFont should set selected font', () => {
    service.changeFont(Font.SANS_SERIF);
    service.font$.pipe(first()).subscribe((font) => {
      expect(font)
        .withContext('font should be SANS_SERIF after selecting that font')
        .toBe(Font.SANS_SERIF);
    });

    service.changeFont(Font.SERIF);
    service.font$.pipe(first()).subscribe((font) => {
      expect(font)
        .withContext('font should be SERIF after selecting that font')
        .toBe(Font.SERIF);
    });

    service.changeFont(Font.MONO);
    service.font$.pipe(first()).subscribe((font) => {
      expect(font)
        .withContext('font should be MONO after selecting that font')
        .toBe(Font.MONO);
    });
  });

  it('#changeFont should set COOKIE_FONT to be selected font', () => {
    cookieServiceSpy.get.and.returnValue('mono');
    service.changeFont(Font.MONO);
    service.font$.pipe(first()).subscribe(() => {
      expect(cookieServiceSpy.get(COOKIE_FONT))
        .withContext("cookie should be set to be 'mono'")
        .toBe(Font.MONO);
    });

    cookieServiceSpy.get.and.returnValue('serif');
    service.changeFont(Font.SERIF);
    service.font$.pipe(first()).subscribe(() => {
      expect(cookieServiceSpy.get(COOKIE_FONT))
        .withContext("cookie should be set to be 'serif'")
        .toBe(Font.SERIF);
    });
  });
});
