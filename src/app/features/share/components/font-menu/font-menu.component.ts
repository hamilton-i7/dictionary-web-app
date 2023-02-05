import { Component, OnInit } from '@angular/core';
import { Font, FontService } from '../../services/font.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-font-menu',
  templateUrl: './font-menu.component.html',
  styleUrls: ['./font-menu.component.scss'],
})
export class FontMenuComponent implements OnInit {
  font: typeof Font = Font;
  showMenu$ = new BehaviorSubject(false);
  selectedFont: Font = Font.SANS_SERIF;

  constructor(private fontService: FontService) {}

  ngOnInit(): void {
    this.fontService.font$.subscribe((font) => (this.selectedFont = font));
  }

  openMenu() {
    this.showMenu$.next(true);
  }

  hideMenu() {
    this.showMenu$.next(false);
  }

  changeFont(font: Font): void {
    this.fontService.changeFont(font);
  }
}
