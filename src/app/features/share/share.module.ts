import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontMenuComponent } from './components/font-menu/font-menu.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    FontMenuComponent,
    SearchInputComponent,
    TextButtonComponent,
    ThemeToggleComponent,
    TopBarComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  exports: [
    FontMenuComponent,
    SearchInputComponent,
    TextButtonComponent,
    ThemeToggleComponent,
    TopBarComponent,
    ClickOutsideDirective,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [CookieService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShareModule {}
