import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_FONT } from '../../../core/constants/cookies';

@Injectable({
  providedIn: 'root',
})
export class FontService {
  font: BehaviorSubject<Font>;

  constructor(private cookieService: CookieService) {
    const fontCookie = this.cookieService.get(COOKIE_FONT);
    this.font = new BehaviorSubject<Font>(
      fontCookie ? (fontCookie as Font) : Font.SANS_SERIF
    );
  }

  changeFont(font: Font) {
    this.font.next(font);
    this.setCookie(font);
  }

  setCookie(font: Font) {
    this.cookieService.set(COOKIE_FONT, font);
  }
}

export enum Font {
  SANS_SERIF = 'sans-serif',
  SERIF = 'serif',
  MONO = 'mono',
}
