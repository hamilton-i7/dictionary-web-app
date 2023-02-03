import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: BehaviorSubject<Theme>;

  constructor() {
    this.theme = new BehaviorSubject<Theme>('dark');
  }

  changeTheme(theme: Theme) {
    this.theme.next(theme);
  }
}

export type Theme = 'light' | 'dark';
