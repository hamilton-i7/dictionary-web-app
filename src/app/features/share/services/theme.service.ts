import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: BehaviorSubject<Theme>;

  constructor(public mediaMatcher: MediaMatcher) {
    const prefersDarkTheme = this.mediaMatcher.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    this.theme = new BehaviorSubject<Theme>(
      prefersDarkTheme.matches ? 'dark' : 'light'
    );
  }

  changeTheme(theme: Theme) {
    this.theme.next(theme);
  }
}

export type Theme = 'light' | 'dark';
