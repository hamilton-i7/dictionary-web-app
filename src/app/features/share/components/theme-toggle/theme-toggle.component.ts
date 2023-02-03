import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {
  darkThemeEnabled = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.theme.subscribe(
      (theme) => (this.darkThemeEnabled = theme === 'dark')
    );
  }

  changeTheme(): void {
    const theme = this.darkThemeEnabled ? 'light' : 'dark';
    this.themeService.changeTheme(theme);
  }
}
