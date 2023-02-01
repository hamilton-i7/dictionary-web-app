import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontMenuComponent } from './components/font-menu/font-menu.component';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    FontMenuComponent,
    TextButtonComponent,
    ClickOutsideDirective,
    TopBarComponent,
    ThemeToggleComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
