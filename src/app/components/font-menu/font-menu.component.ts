import { Component } from '@angular/core';

@Component({
  selector: 'app-font-menu',
  templateUrl: './font-menu.component.html',
  styleUrls: ['./font-menu.component.scss'],
})
export class FontMenuComponent {
  showMenu = false;

  openMenu() {
    this.showMenu = true;
  }

  hideMenu() {
    this.showMenu = false;
  }
}
