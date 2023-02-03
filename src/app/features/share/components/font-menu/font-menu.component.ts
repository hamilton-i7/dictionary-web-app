import { Component } from '@angular/core';
import { Font, FontService } from '../../services/font.service';

@Component({
  selector: 'app-font-menu',
  templateUrl: './font-menu.component.html',
  styleUrls: ['./font-menu.component.scss'],
})
export class FontMenuComponent {
  font: typeof Font = Font;
  showMenu = false;

  constructor(private fontService: FontService) {}

  openMenu() {
    this.showMenu = true;
  }

  hideMenu() {
    this.showMenu = false;
  }

  changeFont(font: Font): void {
    this.fontService.changeFont(font);
  }
}
