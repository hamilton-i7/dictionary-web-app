import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FontService {
  font: BehaviorSubject<Font>;

  constructor() {
    this.font = new BehaviorSubject<Font>(Font.SANS_SERIF);
  }

  changeFont(font: Font) {
    this.font.next(font);
  }
}

export enum Font {
  SANS_SERIF,
  SERIF,
  MONO,
}
