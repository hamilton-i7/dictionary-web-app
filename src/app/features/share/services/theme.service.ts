import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_THEME } from '../../../core/constants/cookies';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme$: BehaviorSubject<Theme>;

  constructor(
    private mediaMatcher: MediaMatcher,
    private cookieService: CookieService
  ) {
    const prefersDarkTheme = this.mediaMatcher.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    const themeCookie = this.cookieService.get(COOKIE_THEME);

    if (themeCookie) {
      this.theme$ = new BehaviorSubject<Theme>(themeCookie as Theme);
      return;
    }

    this.theme$ = new BehaviorSubject<Theme>(
      prefersDarkTheme.matches ? 'dark' : 'light'
    );
  }

  changeTheme(theme: Theme) {
    this.theme$.next(theme);
    this.setCookie(theme);
  }

  setCookie(theme: Theme) {
    this.cookieService.set(COOKIE_THEME, theme);
  }
}

export type Theme = 'light' | 'dark';
