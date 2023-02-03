import { Component, HostBinding, OnInit } from '@angular/core';
import { Font, FontService } from './features/share/services/font.service';
import { Theme, ThemeService } from './features/share/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Dictionary Web App';
  font?: Font;
  theme?: Theme;

  @HostBinding('class') get classAttribute() {
    const font = this.getFontClass();
    return `${font} theme-${this.theme}`;
  }

  constructor(
    private fontService: FontService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.fontService.font.subscribe((font) => (this.font = font));
    this.themeService.theme.subscribe((theme) => (this.theme = theme));
  }

  private getFontClass(): string {
    switch (this.font) {
      case Font.SERIF:
        return 'serif';
      case Font.MONO:
        return 'mono';
      default:
        return 'sans-serif';
    }
  }
}
